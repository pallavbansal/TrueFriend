import {View, Text, Pressable} from 'react-native';
import React from 'react';

const OutsidePress = ({children, close}) => {
  return (
    <Pressable
      onPress={() => close(true)}
      style={{
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.5)',
        flex: 1,
      }}>
      {children}
    </Pressable>
  );
};

export default OutsidePress;
