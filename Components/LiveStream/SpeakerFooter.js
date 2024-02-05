import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../../Styles/ColorData';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
  leaveMenu,
  localMicOn,
  toggleMic,
  localWebcamOn,
  toggleWebcam,
  setBottomSheetView,
  bottomSheetRef,
  end,
}) => {
  return (
    <View style={styles.bottomcontainer}>
      <IconContainer
        backgroundColor="transparent"
        onPress={() => {
          setBottomSheetView('CHAT');
          bottomSheetRef.current.show();
        }}
        iconName="chat"
        iconColor="#FFF"
      />
      <IconContainer
        backgroundColor="transparent"
        onPress={() => {}}
        iconName="change-circle"
        iconColor="#FFF"
      />
      <TouchableOpacity onPress={end}>
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
            <Ionicons name="call" size={28} color="white" />
          </LinearGradient>
        </LinearGradient>
      </TouchableOpacity>
      <IconContainer
        backgroundColor={!localMicOn ? 'primary' : 'transparent'}
        onPress={() => {
          toggleMic();
        }}
        iconName={localMicOn ? 'mic' : 'mic-off'}
        iconColor="#FFF"
      />

      <IconContainer
        backgroundColor={!localWebcamOn ? 'primary' : 'transparent'}
        onPress={() => {
          toggleWebcam();
        }}
        iconName={localWebcamOn ? 'videocam' : 'videocam-off'}
        iconColor="#FFF"
      />
    </View>
  );
};

export default SpeakerFooter;

const styles = StyleSheet.create({
  bottomcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 10,
    marginBottom: 5,
    borderRadius: 50,
    marginHorizontal: 5,
  },
  gradienticon: {
    height: 85,
    width: 85,
    borderRadius: 42.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calliconcontainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 75,
    width: 75,
    borderRadius: 40,
  },
});

{
  /* <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}>
        <IconContainer
          backgroundColor={'red'}
          Icon={() => {
            return <CallEnd height={26} width={26} fill="#FFF" />;
          }}
          onPress={() => {
            leaveMenu.current.show();
          }}
        />
        <IconContainer
          style={{
            borderWidth: 1.5,
            borderColor: '#2B3034',
          }}
          backgroundColor={!localMicOn ? colors.primary[100] : 'transparent'}
          onPress={() => {
            toggleMic();
          }}
          Icon={() => {
            return localMicOn ? (
              <MicOn height={24} width={24} fill="#FFF" />
            ) : (
              <MicOff height={28} width={28} fill="#1D2939" />
            );
          }}
        />
        <IconContainer
          style={{
            borderWidth: 1.5,
            borderColor: '#2B3034',
          }}
          backgroundColor={!localWebcamOn ? colors.primary[100] : 'transparent'}
          onPress={() => {
            toggleWebcam();
          }}
          Icon={() => {
            return localWebcamOn ? (
              <VideoOn height={24} width={24} fill="#FFF" />
            ) : (
              <VideoOff height={36} width={36} fill="#1D2939" />
            );
          }}
        />
        <IconContainer
          onPress={() => {
            setBottomSheetView('CHAT');
            bottomSheetRef.current.show();
          }}
          style={{
            borderWidth: 1.5,
            borderColor: '#2B3034',
          }}
          Icon={() => {
            return <Chat height={22} width={22} fill="#FFF" />;
          }}
        />
        <IconContainer
          style={{
            borderWidth: 1.5,
            borderColor: '#2B3034',
          }}
          onPress={() => {
            if (presenterId == null || localScreenShareOn) {
              Platform.OS === 'android'
                ? toggleScreenShare()
                : VideosdkRPK.startBroadcast();
            }
          }}
          Icon={() => {
            return <ScreenShare height={22} width={22} fill="#FFF" />;
          }}
        />
      </View> */
}

{
  /* <IconContainer
        onPress={() => {
          setBottomSheetView('CHAT');
          bottomSheetRef.current.show();
        }}
        iconName="chat"
        iconColor="#FFF"
      /> */
}
{
  /* <IconContainer
        onPress={() => {
          if (presenterId == null || localScreenShareOn) {
            Platform.OS === 'android'
              ? toggleScreenShare()
              : VideosdkRPK.startBroadcast();
          }
        }}
        iconName="screen-share"
        iconColor="#FFF"
      /> */
}
