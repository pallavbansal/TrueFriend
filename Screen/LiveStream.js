import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {colors} from '../Styles/ColorData';
import LinearGradient from 'react-native-linear-gradient';
import {
  MeetingProvider,
  MeetingConsumer,
} from '@videosdk.live/react-native-sdk';
import ILSContainer from '../Components/Streaming/LiveStream/ILSContainer';
import {useNavigation} from '@react-navigation/native';

const LiveStream = ({route}) => {
  const navigation = useNavigation();
  const token = route.params.token;
  const meetingId = route.params.meetingId;
  const micEnabled = route.params.micEnabled
    ? route.params.webcamEnabled
    : false;
  const webcamEnabled = route.params.webcamEnabled
    ? route.params.webcamEnabled
    : false;
  const name = route.params.name ? route.params.name : 'Test User';
  const mode = route.params.mode ? route.params.mode : 'CONFERENCE';

  console.log(
    'LiveStream----------------------------------------------',
    token,
    meetingId,
    micEnabled,
    webcamEnabled,
    name,
    mode,
  );

  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      colors={colors.gradients.buttongradient}
      style={{flex: 1}}>
      <View
        style={{
          flex: 1,
        }}>
        <MeetingProvider
          config={{
            meetingId,
            micEnabled: micEnabled,
            webcamEnabled: webcamEnabled,
            name,
            mode, // "CONFERENCE" || "VIEWER"
            notification: {
              title: 'Video SDK Meeting',
              message: 'Meeting is running.',
            },
          }}
          token={token}>
          <MeetingConsumer
            {...{
              onMeetingLeft: () => {
                console.log(
                  '-------------------------------------Meeting Left-------------------------------------',
                );
                navigation.navigate('Discover');
              },
            }}>
            {() => {
              return <ILSContainer webcamEnabled={webcamEnabled} />;
            }}
          </MeetingConsumer>
        </MeetingProvider>
      </View>
    </LinearGradient>
  );
};

export default LiveStream;
