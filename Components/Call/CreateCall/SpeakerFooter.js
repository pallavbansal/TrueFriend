import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../../../Styles/ColorData';
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
  changeWebcam,
  end,
  switchIds,
  makenull,
}) => {
  const handleendcall = () => {
    makenull();
    end();
  };

  return (
    <View style={styles.bottomcontainer}>
      <IconContainer
        backgroundColor="transparent"
        onPress={() => {
          switchIds();
        }}
        iconName="exposure"
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
        onPress={handleendcall}
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
            <Ionicons name="call" size={24} color="white" />
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
