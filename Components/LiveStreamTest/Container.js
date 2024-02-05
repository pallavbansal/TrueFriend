import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useMeeting} from '@videosdk.live/react-native-sdk';
import SpeakerView from './SpeakerView';

const Container = () => {
  const {join, changeWebcam, localParticipant} = useMeeting({
    onError: error => {
      console.log(error.message);
    },
  });
  console.log(localParticipant);

  return (
    <View
      style={{
        flex: 1,
      }}>
      {localParticipant ? (
        <SpeakerView
          localParticipant={localParticipant}
          join={join}
          changeWebcam={changeWebcam}
        />
      ) : (
        <View>
          <TouchableOpacity onPress={join}>
            <Text>Join</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Container;
