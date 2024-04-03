import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import {getToken} from '../../Utils/Streamapi';
import socket from '../../Socket/Socket';
import Sound from 'react-native-sound';
import {colors} from '../../Styles/ColorData';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const CallHandler = ({children}) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [callData, setCallData] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [rejectTimeoutId, setRejectTimeoutId] = useState(null);
  const ringtone = useRef(null);

  useEffect(() => {
    ringtone.current = new Sound('incoming.mp3', Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
    });

    const handleCall = data => {
      console.log('Received call in call handler :', data);
      if (data.callaction === 'incoming') {
        console.log('incoming :', data);
        setCallData(data);
        setModalVisible(true);
        setIsMuted(false);
        ringtone.current.setVolume(1);
        ringtone.current.play();
        const timeoutId = setTimeout(handleReject, 15000);
        setRejectTimeoutId(timeoutId);
      } else if (data.callaction === 'incoming-rejected') {
        console.log('incoming-rejected :', data);
        setModalVisible(false);
        ringtone.current.stop();
      }
    };

    socket.on('call', handleCall);

    return () => {
      socket.off('call', handleCall);
      ringtone.current.release();
    };
  }, []);

  const handleAccept = async data => {
    clearTimeout(rejectTimeoutId);
    setModalVisible(false);
    ringtone.current.stop();
    socket.emit('call', {...data, callaction: 'accepted'});
    const token = await getToken();
    navigation.navigate('Call', {
      name: data?.reciever?.name.trim(),
      token: token,
      meetingId: data.meetingId,
      micEnabled: true,
      webcamEnabled: data.type === 'video' ? true : false,
      isCreator: false,
      mode: 'CONFERENCE',
      finaldata: data,
    });
  };

  const handleReject = data => {
    console.log(data);
    ringtone.current.stop();
    socket.emit('call', {...data, callaction: 'rejected'});
    setModalVisible(false);
    console.log('Call rejected');
    // setCallData(null);
  };

  const handleMuteUnmute = () => {
    if (isMuted) {
      ringtone.current.setVolume(1);
      setIsMuted(false);
    }
    if (!isMuted) {
      ringtone.current.setVolume(0);
      setIsMuted(true);
    }
  };

  return (
    <>
      {children}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.topView}>
          <View style={styles.modalView}>
            <View
              style={{
                flexDirection: 'row',
                gap: 20,
                alignItems: 'center',
              }}>
              <Image
                style={styles.callerImage}
                source={{uri: callData?.caller?.imageUrl}}
              />
              <View>
                <Text style={styles.modalText}>{callData?.caller?.name}</Text>
                <Text style={styles.modalText}>
                  {callData?.type == 'audio' ? 'Audio' : 'Video'} Call
                </Text>
              </View>
              <View>
                <TouchableOpacity
                  onPress={handleMuteUnmute}
                  style={styles.mutebutton}>
                  <MaterialIcons
                    name={isMuted ? 'volume-off' : 'volume-up'}
                    size={28}
                    color={colors.profile.edit}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => handleReject(callData)}>
                <Text style={styles.textStyle}>Decline</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonAccept]}
                onPress={() => handleAccept(callData)}>
                <Text style={styles.textStyle}>Answer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  topView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    paddingHorizontal: 20,
    elevation: 2,
    margin: 10,
  },
  buttonClose: {
    backgroundColor: '#8D49EE',
  },
  buttonAccept: {
    backgroundColor: '#00B528',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    color: '#33196B',
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  callerImage: {
    width: 75,
    height: 75,
    borderRadius: 25,
    marginBottom: 15,
  },
  mutebutton: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 5,
    position: 'absolute',
    bottom: 10,
    left: 10,
  },
});

export default CallHandler;
