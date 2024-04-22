import {View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../../Styles/ColorData';
import Entypo from 'react-native-vector-icons/Entypo';
import React from 'react';

const StartStream = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        position: 'absolute',
        bottom: 75,
        right: 20,
        padding: 6,
        borderRadius: 48,
        backgroundColor: colors.text.primarylight,
        elevation: 50,
      }}>
      <TouchableOpacity
        style={{
          backgroundColor: colors.text.primary,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 40,
          width: 74,
          height: 74,
          elevation: 50,
        }}
        onPress={() =>
          navigation.navigate('StartStream', {
            isCreator: true,
          })
        }>
        <Entypo name="video-camera" size={40} color={colors.arrow.secondary} />
      </TouchableOpacity>
    </View>
  );
};

export default StartStream;
