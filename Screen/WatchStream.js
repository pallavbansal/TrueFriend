import {View} from 'react-native';
import React from 'react';
import {colors} from '../Styles/ColorData';
import LinearGradient from 'react-native-linear-gradient';
import {
  MeetingProvider,
  MeetingConsumer,
} from '@videosdk.live/react-native-sdk';
import WatchContainer from '../Components/Streaming/WatchStream/WatchContainer';
import {useNavigation} from '@react-navigation/native';

const WatchStream = ({route}) => {
  const navigation = useNavigation();
  const token = route.params.token;
  const meetingId = route.params.meetingId;
  const micEnabled = false;
  const webcamEnabled = false;
  const name = route.params.name ? route.params.name : 'Test User';
  const mode = 'VIEWER';

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
            mode,
            notification: {
              title: 'Video SDK Meeting',
              message: 'Meeting is running.',
            },
          }}
          token={token}>
          <MeetingConsumer
            {...{
              onMeetingLeft: () => {
                navigation.navigate('Discover');
              },
            }}>
            {() => {
              return <WatchContainer webcamEnabled={webcamEnabled} />;
            }}
          </MeetingConsumer>
        </MeetingProvider>
      </View>
    </LinearGradient>
  );
};

export default WatchStream;
