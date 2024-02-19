import React, {useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  TouchableOpacity,
} from 'react-native';
import Sound from 'react-native-sound';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../../../Styles/ColorData';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const WaitingResponse = () => {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
  const moveAnim = useRef(new Animated.Value(0)).current; // Initial value for movement: 0

  useEffect(() => {
    const sound = new Sound('outgoing.mp3', Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('Failed to load the sound', error);
        return;
      }
      sound.play(success => {
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    });

    return () => {
      sound.release();
    };
  }, []);

  // Fade in animation for text
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  // Slight movement for loaderContainer
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(moveAnim, {
          toValue: -5,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(moveAnim, {
          toValue: 5,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [moveAnim]);

  const handleendcall = () => {
    navigation.navigate('FriendsList');
  };

  return (
    <LinearGradient
      colors={colors.gradients.buttongradient}
      style={styles.container}>
      <Animated.View
        style={[styles.loaderContainer, {transform: [{translateY: moveAnim}]}]}>
        <Animated.Text style={[styles.text, {opacity: fadeAnim}]}>
          <MaterialIcons
            name="wifi-calling-3"
            size={150}
            color={colors.profile.edit}
          />
        </Animated.Text>

        <Animated.Text style={[styles.text, {opacity: fadeAnim}]}>
          Call in progress...
        </Animated.Text>

        <TouchableOpacity
          onPress={handleendcall}
          style={{
            backgroundColor: 'white',
            borderRadius: 50,
            padding: 15,
            marginTop: 100,
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
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  loaderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '100%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 30,
  },
  text: {
    color: colors.text.secondary,
    fontSize: 20,
    marginTop: 20,
  },
  gradienticon: {
    height: 95,
    width: 95,
    borderRadius: 47.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calliconcontainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 65,
    width: 65,
    borderRadius: 40,
  },
});

export default WaitingResponse;
