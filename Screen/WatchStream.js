import {View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {colors} from '../Styles/ColorData';
import LinearGradient from 'react-native-linear-gradient';
import {
  MeetingProvider,
  MeetingConsumer,
} from '@videosdk.live/react-native-sdk';
import WatchContainer from '../Components/Streaming/WatchStream/WatchContainer';
import {useNavigation} from '@react-navigation/native';
import {useGetMeetingId} from '../Hooks/Query/StreamQuery';
import Loading from './Loading';
import Toast from 'react-native-toast-message';

const WatchStream = ({route}) => {
  const navigation = useNavigation();
  const [meetingid, setmeetingid] = useState(null);
  const id = route.params.id;
  const token = route.params.token;
  // const meetingId = route.params.meetingId;
  const micEnabled = false;
  const webcamEnabled = false;
  const name = route.params.name ? route.params.name : 'Test User';
  const mode = 'VIEWER';
  const {isPending, error, mutate, reset} = useGetMeetingId();

  useEffect(() => {
    console.log('-----------------------------');
    const formdata = {
      user_id: id,
    };
    mutate(
      {data: formdata},
      {
        onSuccess: data => {
          if (data.status_code == 1) {
            console.log('meetind id success data', data);
            console.log(data.data.stream);
            if (data.data.stream == null) {
              Toast.show({
                type: 'info',
                text1: 'Stream Ended',
                visibilityTime: 1000,
              });
              navigation.navigate('Discover');
            }
            if (data.data.stream?.meeting_id) {
              setmeetingid(data.data.stream.meeting_id);
            }
          }
        },
      },
    );
  }, []);

  if (meetingid === null || isPending) {
    return <Loading />;
  }

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
            meetingId: meetingid,
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
              return (
                <WatchContainer webcamEnabled={webcamEnabled} userid={id} />
              );
            }}
          </MeetingConsumer>
        </MeetingProvider>
      </View>
    </LinearGradient>
  );
};

export default WatchStream;
