import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useMeeting} from '@videosdk.live/react-native-sdk';

const HeaderView = () => {
  const {meetingId, leave} = useMeeting();
  return (
    <View
      style={{
        flexDirection: 'row',
        padding: 16,
        justifyContent: 'space-evenly',
        alignItems: 'center',
      }}>
      <Text style={{fontSize: 24, color: 'white'}}>{meetingId}</Text>
      <TouchableOpacity
        onPress={() => {
          leave();
        }}>
        <Text style={{fontSize: 24, color: 'white'}}>Leave</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HeaderView;
