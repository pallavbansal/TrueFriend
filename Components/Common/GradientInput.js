import React from 'react';
import {colors} from '../../Styles/ColorData';
import LinearGradient from 'react-native-linear-gradient';

const GradientInput = ({style, children}) => {
  return (
    <LinearGradient colors={colors.gradients.buttongradient} style={style}>
      {children}
    </LinearGradient>
  );
};

export default GradientInput;
