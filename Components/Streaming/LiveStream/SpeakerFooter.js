import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import React, {useRef, useEffect} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../../../Styles/ColorData';
import {usePubSub} from '@videosdk.live/react-native-sdk';
import {useMeeting} from '@videosdk.live/react-native-sdk';

const IconContainer = ({backgroundColor, onPress, iconName, iconColor}) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: backgroundColor,
        borderRadius: 50,
        padding: 10,
        // borderWidth: 1.5,
        // borderColor: '#2B3034',
      }}
      onPress={onPress}>
      <MaterialIcons name={iconName} size={24} color={iconColor} />
    </TouchableOpacity>
  );
};

const SpeakerFooter = ({
  localMicOn,
  toggleMic,
  localWebcamOn,
  toggleWebcam,
  changeWebcam,
  setBottomSheetView,
  bottomSheetView,
  bottomSheetRef,
  end,
  leave,
  _handleEnd,
  handleChat,
  showinputouter,
  message,
  setMessage,
  setshowinputouter,
}) => {
  const {participants} = useMeeting({
    onParticipantJoined: participant => {
      console.log('participant joined', participant);
    },
    onParticipantLeft: participant => {
      console.log('participant left', participant);
    },
  });
  const mpubsubRef = useRef();

  const mpubsub = usePubSub('CHAT', {});

  const sendMessage = () => {
    if (message === '') return;
    mpubsub.publish(message, {persist: true});
    setMessage('');

    // setTimeout(() => {
    //   scrollToBottom();
    // }, 100);
  };

  useEffect(() => {
    mpubsubRef.current = mpubsub;
  }, [mpubsub]);

  // console.log('showinputouter', participants);

  if (showinputouter) {
    return (
      <View style={styles.bottomchatcontainer}>
        <TextInput
          style={{
            backgroundColor: 'white',
            borderRadius: 50,
            padding: 15,
            paddingHorizontal: 30,
            flex: 1,
          }}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message"
          placeholderTextColor="black"
          cursorColor={'black'}
          color={'black'}
          onSubmitEditing={sendMessage}
          blurOnSubmit={false}
          returnKeyType="send"
        />
        <TouchableOpacity
          onPress={sendMessage}
          style={{
            backgroundColor: 'white',
            borderRadius: 50,
            padding: 12,
          }}>
          <MaterialIcons name="send" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setshowinputouter(false);
          }}
          style={{
            backgroundColor: 'white',
            borderRadius: 50,
            padding: 12,
          }}>
          <MaterialIcons name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View style={styles.bottomcontainer}>
        <IconContainer
          backgroundColor="transparent"
          onPress={handleChat}
          // iconName={bottomSheetView === 'CHAT' ? 'cancel-presentation' : 'chat'}
          iconName="send"
          iconColor="black"
        />
        <IconContainer
          backgroundColor="transparent"
          onPress={() => {
            changeWebcam();
          }}
          iconName="change-circle"
          iconColor="black"
        />
        <TouchableOpacity
          onPress={_handleEnd}
          style={{
            backgroundColor: 'white',
            borderRadius: 50,
            padding: 15,
          }}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            colors={colors.gradients.calloutergradient}
            style={styles.gradienticon}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              colors={colors.gradients.callinnergradient}
              style={styles.calliconcontainer}>
              {/* <MaterialIcons name="tv-off" size={28} color="white" /> */}
              <AntDesign name="home" size={28} color="white" />
            </LinearGradient>
          </LinearGradient>
        </TouchableOpacity>
        <IconContainer
          backgroundColor={!localMicOn ? 'primary' : 'transparent'}
          onPress={() => {
            toggleMic();
          }}
          iconName={localMicOn ? 'mic' : 'mic-off'}
          iconColor="black"
        />

        <IconContainer
          backgroundColor={!localWebcamOn ? 'primary' : 'transparent'}
          onPress={() => {
            toggleWebcam();
          }}
          iconName={localWebcamOn ? 'videocam' : 'videocam-off'}
          iconColor="black"
        />
      </View>
    );
  }
};

export default SpeakerFooter;

const styles = StyleSheet.create({
  bottomcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 10,
    marginVertical: 15,
    borderRadius: 50,
    marginHorizontal: 10,
    backgroundColor: 'white',
    height: 75,
  },
  bottomchatcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    gap: 5,
    marginVertical: 5,
    marginHorizontal: 5,
  },
  gradienticon: {
    height: 60,
    width: 60,
    borderRadius: 42.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calliconcontainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 50,
    borderRadius: 40,
  },
});
