import React, {useEffect, useRef} from 'react';
import {View, Text, StyleSheet, Animated, Easing} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const AnimatedText = Animated.createAnimatedComponent(Text);

const WaitingText = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [fadeAnim]);

  return (
    <AnimatedText style={{...styles.waitingText, opacity: fadeAnim}}>
      <FontAwesome
        name="hourglass-1"
        size={50}
        color="black"
        style={styles.icon}
      />
      <Text>Wait...</Text>
    </AnimatedText>
  );
};

const WaitingToJoinView = () => (
  <View style={styles.container}>
    <WaitingText />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  waitingText: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  icon: {
    marginRight: 8,
  },
});

export default WaitingToJoinView;
