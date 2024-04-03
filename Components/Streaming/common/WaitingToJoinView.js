import React, {useEffect, useRef} from 'react';
import {StyleSheet, Animated, Easing} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../../../Styles/ColorData';

const WaitingToJoinView = ({userdata}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
  const moveAnim = useRef(new Animated.Value(0)).current; // Initial value for movement: 0

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

  return (
    <LinearGradient
      colors={colors.gradients.buttongradient}
      style={styles.container}>
      <Animated.View
        style={[styles.loaderContainer, {transform: [{translateY: moveAnim}]}]}>
        <Animated.Image
          source={{uri: userdata.profile_picture}}
          style={{height: '100%', width: '100%', borderRadius: 20}}
        />
      </Animated.View>
      <Animated.View
        style={[
          styles.ConnectContainer,
          {transform: [{translateY: moveAnim}]},
        ]}>
        {/* <Animated.Text style={[styles.text, {opacity: fadeAnim}]}>
          <MaterialIcons name="live-tv" size={50} color={colors.profile.edit} />
        </Animated.Text> */}

        <Animated.Text style={[styles.text, {opacity: fadeAnim}]}>
          Connecting...
        </Animated.Text>
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
    height: '100%',
  },
  loaderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: '100%',
    width: '100%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 30,
  },
  ConnectContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 30,
  },
  text: {
    color: colors.text.secondary,
    fontSize: 20,
    padding: 10,
    // marginTop: 20,
  },
});

export default WaitingToJoinView;
