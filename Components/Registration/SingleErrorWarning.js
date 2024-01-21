import {View, Text, ScrollView} from 'react-native';
import GradientText from '../Common/GradientText';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../../Styles/ColorData';

const warnings = {
  registrationname: 'Name must be at least 3 characters long.',
  registrationemail: 'Please enter a valid email address.',
  registrationpassword: 'Password must contain at least 7 characters.',
  registrationconfirmpassword: 'Passwords do not match.',
  registrationphone: 'Please enter a valid phone number (10 digits).',
  registrationdob: 'Please enter a valid date of birth.',
  registrationaddress: 'Please enter a valid address.',
  registrationprofilepicture: 'Please upload a profile picture.',
};

const SingleErrorWarning = ({type, valid}) => {
  return (
    <View style={{width: '100%', flexDirection: 'row'}}>
      <AntDesign
        name={valid ? 'checkcircle' : 'closecircle'}
        size={20}
        color={valid ? colors.dotcolors.online : colors.recharge.primary}
        style={{marginRight: 5}}
      />
      <ScrollView horizontal>
        <GradientText>{warnings[type]}</GradientText>
      </ScrollView>
    </View>
  );
};

export default SingleErrorWarning;
