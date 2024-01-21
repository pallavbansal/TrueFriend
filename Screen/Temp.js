import {View, Text, TouchableOpacity} from 'react-native';
import GradientScreen from '../Layouts/GradientScreen';
import React from 'react';
import {useDispatch} from 'react-redux';
import {LogoutRed} from '../Store/Auth';
import {colors} from '../Styles/ColorData';
import {useNavigation} from '@react-navigation/native';

const Temp = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const handleLogout = () => {
    dispatch(LogoutRed());
    return navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
  };

  return (
    <GradientScreen>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={handleLogout}>
          <Text
            style={{
              color: 'black',
              fontSize: 20,
            }}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </GradientScreen>
  );
};

export default Temp;
