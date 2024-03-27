import {View, Animated} from 'react-native';
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
import {PanGestureHandler, State} from 'react-native-gesture-handler';

const WatchStream = ({route}) => {
  const navigation = useNavigation();
  const [meetingid, setmeetingid] = useState(null);
  const [otherdata, setotherdata] = useState({});
  const id = route.params.id;
  const token = route.params.token;
  const micEnabled = false;
  const webcamEnabled = false;
  const name = route.params.name ? route.params.name : 'Test User';
  const isswiped = route.params.isswiped ? route.params.isswiped : false;
  const mode = 'VIEWER';
  const {isPending, error, mutate, reset} = useGetMeetingId();
  useEffect(() => {
    if (!isswiped) {
      const formdata = {
        user_id: id,
      };
      console.log('Form Data', formdata);
      mutate(
        {data: formdata},
        {
          onSuccess: data => {
            if (data.status_code == 1) {
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
                setotherdata({
                  meeting_id: data.data.stream.meeting_id,
                  stream_id: data.data.stream.id,
                  stream_status: data.data.stream.status, // "ACTIVE","ENDED"
                  user: data.data.stream.user,
                });
              }
            }
            if (data.status_code == 0) {
              Toast.show({
                type: 'error',
                text1: 'Stream Ended',
                visibilityTime: 1000,
              });
              navigation.navigate('Discover');
            }
          },
        },
      );
    } else {
      setmeetingid(route.params.swipedmeetingid);
      setotherdata(route.params.swipedmeetingotherdata);
    }
  }, []);

  if (meetingid === null || isPending) {
    return <Loading />;
  }
  const translateY = new Animated.Value(0);

  const onGestureEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationY: translateY,
        },
      },
    ],
    {useNativeDriver: true},
  );

  const onHandlerStateChange = ({nativeEvent}) => {
    if (nativeEvent.oldState === State.ACTIVE) {
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
      if (nativeEvent.translationY < -100) {
        // handleUpSwipe();
        setmeetingid('uzyx-pmh4-ulsp');
      } else if (nativeEvent.translationY > 100) {
        // handleDownSwipe();
        setmeetingid('uzyx-pmh4-ulsp');
      }
    }
  };

  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      colors={colors.gradients.buttongradient}
      style={{flex: 1}}>
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}>
        <Animated.View style={{transform: [{translateY}], flex: 1}}>
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
                  onMeetingLeft: data => {
                    console.log('onMeetingLeft', data);
                    navigation.navigate('Discover');
                  },
                }}>
                {() => {
                  return (
                    <WatchContainer
                      webcamEnabled={webcamEnabled}
                      userid={id}
                      streamdata={otherdata}
                    />
                  );
                }}
              </MeetingConsumer>
            </MeetingProvider>
          </View>
        </Animated.View>
      </PanGestureHandler>
    </LinearGradient>
  );
};

export default WatchStream;
