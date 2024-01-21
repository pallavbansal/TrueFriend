import React from 'react';
import {Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-community/masked-view';
import {colors} from '../../Styles/ColorData';

const GradientText = props => {
  return (
    <MaskedView maskElement={<Text {...props} />}>
      <LinearGradient
        colors={colors.gradients.textgradient}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        <Text {...props} style={[props.style, {opacity: 0}]} />
      </LinearGradient>
    </MaskedView>
  );
};

export default GradientText;
