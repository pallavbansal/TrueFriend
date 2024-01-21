import LinearGradient from 'react-native-linear-gradient';
import React from 'react';
import {colors} from '../../Styles/ColorData';

const GradientButton = ({children, style}) => {
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      colors={colors.gradients.buttongradient}
      style={style}>
      {children}
    </LinearGradient>
  );
};

export default GradientButton;
