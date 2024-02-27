import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const ProfileNavigator = ({children, id}) => {
  const navigation = useNavigation();
  const myid = useSelector(state => state.Auth.userid);

  const handlenavigate = () => {
    if (id == myid) {
      return navigation.navigate('Profile');
    } else {
      return navigation.navigate('ProfileById', {userid: id});
    }
  };

  return (
    <TouchableOpacity onPress={handlenavigate}>{children}</TouchableOpacity>
  );
};

export default ProfileNavigator;
