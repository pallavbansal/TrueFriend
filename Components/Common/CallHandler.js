import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {getToken} from '../../Utils/Streamapi';
import socket from '../../Socket/Socket';
import {useSelector} from 'react-redux';

// {"caller": {"imageUrl": "https://wooing.boxinallsoftech.com/public/uploads/profile/82578_1706872877_stable-diffusion-xl.jpg",
// "name": "Jhon", "userid": 56}, "meetingId": "1tal-vvii-s8x7", "room": "45_56", "type": "audio"}

const CallHandler = ({children}) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [callData, setCallData] = useState(null);
  const isloggedin = useSelector(state => state.Auth.token);
  const myid = useSelector(state => state.Auth.userid);

  const handleAccept = async () => {
    setModalVisible(false);
    socket.emit('call', {
      ...callData,
      callaction: 'accepted',
    });
    const token = await getToken();
    navigation.navigate('Call', {
      name: callData?.reciever?.name.trim(),
      token: token,
      meetingId: callData.meetingId,
      micEnabled: true,
      webcamEnabled: callData.type == 'video' ? true : false,
      isCreator: false,
      mode: 'CONFERENCE',
    });
  };

  const handleReject = () => {
    socket.emit('call', {
      ...callData,
      callaction: 'rejected',
    });
    setModalVisible(false);
    console.log('Call rejected');
    setCallData(null);
  };

  useEffect(() => {
    const handleCall = data => {
      console.log('Received call in call handler :', data);
      if (data.callaction == 'incoming') {
        console.log('incomming :', data);
        setCallData(data);
        setModalVisible(true);
        const timeoutId = setTimeout(handleReject, 15000);
        return () => clearTimeout(timeoutId);
      }
    };
    socket.on('call', handleCall);
    return () => {
      socket.off('call', handleCall);
    };
  }, []);

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
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={handleReject}>
                <Text style={styles.textStyle}>Decline</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonAccept]}
                onPress={handleAccept}>
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
});

export default CallHandler;
