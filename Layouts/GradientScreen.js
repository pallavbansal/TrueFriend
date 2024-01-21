import {StyleSheet} from 'react-native';
import React from 'react';
import {colors} from '../Styles/ColorData';
import LinearGradient from 'react-native-linear-gradient';

const GradientScreen = ({children}) => {
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0.5}}
      colors={colors.gradients.topgradient}
      style={styles.screen}>
      <LinearGradient
        start={{x: 0.9, y: 0.9}}
        end={{x: 0, y: 0}}
        colors={colors.gradients.bottomgradient}
        style={styles.screen}>
        {children}
      </LinearGradient>
    </LinearGradient>
  );
};

export default GradientScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
