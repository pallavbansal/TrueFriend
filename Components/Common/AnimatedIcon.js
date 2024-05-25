import {StyleSheet, Text, View} from 'react-native';
import LottieView from 'lottie-react-native';
import React from 'react';

const AnimatedIcon = ({width = 150, height = 150, source, ...props}) => {
  return (
    <View>
      <LottieView source={source} style={{width, height}} {...props} />
    </View>
  );
};

export default AnimatedIcon;
