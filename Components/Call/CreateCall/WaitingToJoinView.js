import {View, Text} from 'react-native';
import React from 'react';

const WaitingToJoinView = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
      }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: 'black',
        }}>
        Wait...
      </Text>
    </View>
  );
};

export default WaitingToJoinView;
