import {View, Text} from 'react-native';
import {colors} from '../../Styles/ColorData';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React from 'react';

const Rates = ({call_amount}) => {
  return (
    <View
      style={{
        backgroundColor: colors.profile.edit,
        padding: 3,
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: 10,
            marginRight: 3,
          }}>
          {call_amount}
        </Text>

        <MaterialIcons name="diamond" size={10} color="white" />
        <Text
          style={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: 10,
          }}>
          /min
        </Text>
      </View>
    </View>
  );
};

export default Rates;
