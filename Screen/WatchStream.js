import {View, Animated, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import {colors} from '../Styles/ColorData';
import LinearGradient from 'react-native-linear-gradient';
import {
  MeetingProvider,
  MeetingConsumer,
} from '@videosdk.live/react-native-sdk';
import WatchContainer from '../Components/Streaming/WatchStream/WatchContainer';
import {useNavigation} from '@react-navigation/native';
import Loading from './Loading';
import {PanGestureHandler, State} from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import NextPreviousJoin from '../Components/Streaming/WatchStream/NextPreviousJoin';
import {useFetchAdjacentStream} from '../Hooks/Query/StreamQuery';
import {useSelector} from 'react-redux';
import OfflineViewerContainer from '../Components/Streaming/WatchStream/OfflineViewerContainer';

const WatchStream = ({route}) => {
  const navigation = useNavigation();
  const mydata = useSelector(state => state.Auth.userinitaldata);
  const [nextStreamdata, setNextStreamData] = useState({});
  const [previousStreamdata, setPreviousStreamData] = useState({});
  const id = route.params.id;
  const token = route.params.token;
  const micEnabled = false;
  const webcamEnabled = false;
  const mode = 'VIEWER';
  const name = route.params.name;
  const type = route.params.type;
  const meetingid = route.params.meeting_id;
  const otherdata = route.params.otherdata; // {meeting_id,stream_id,stream_status,user}
  const recordedurl = route.params.recordedurl;

  const {
    data: streamData,
    error: streamError,
    isPending: streamPending,
  } = useFetchAdjacentStream(otherdata?.stream_id);

  const translateX = new Animated.Value(0);

  useEffect(() => {
    if (streamData) {
      if (streamData.data.next_stream != null) {
        const nextparams = {
          id: streamData.data.next_stream.user.id,
          token: token,
          name: mydata.name,
          mode: 'VIEWER',
          isswiped: true,
          meeting_id: streamData.data.next_stream.meeting_id,
          otherdata: {
            meeting_id: streamData.data.next_stream.meeting_id,
            stream_id: streamData.data.next_stream.id,
            stream_status: streamData.data.next_stream.status, // "ACTIVE","ENDED"
            user: streamData.data.next_stream.user,
          },
          type:
            streamData.data.next_stream.status === 'ACTIVE'
              ? 'ONLINE'
              : 'OFFLINE',
          recordedurl:
            streamData.data.next_stream.status === 'ENDED'
              ? streamData.data.next_stream.recorded_url
              : null,
        };
        setNextStreamData(nextparams);
      }

      if (streamData.data.previous_stream != null) {
        const previousparams = {
          id: streamData.data.previous_stream.user.id,
          token: token,
          name: mydata.name,
          mode: 'VIEWER',
          isswiped: true,
          meeting_id: streamData.data.previous_stream.meeting_id,
          otherdata: {
            meeting_id: streamData.data.previous_stream.meeting_id,
            stream_id: streamData.data.previous_stream.id,
            stream_status: streamData.data.previous_stream.status, // "ACTIVE","ENDED"
            user: streamData.data.previous_stream.user,
          },
          type:
            streamData.data.previous_stream.status === 'ACTIVE'
              ? 'ONLINE'
              : 'OFFLINE',
          recordedurl:
            streamData.data.previous_stream.status === 'ENDED'
              ? streamData.data.previous_stream.recorded_url
              : null,
        };
        setPreviousStreamData(previousparams);
      }
    }
  }, [streamData]);

  const onGestureEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationX: translateX,
        },
      },
    ],
    {useNativeDriver: true},
  );

  const rotate = translateX.interpolate({
    inputRange: [-300, 0, 300],
    outputRange: ['-10deg', '0deg', '10deg'],
  });

  const scale = translateX.interpolate({
    inputRange: [-300, 0, 300],
    outputRange: [0.7, 1, 0.7],
  });

  const onHandlerStateChange = ({nativeEvent}) => {
    if (nativeEvent.oldState === State.ACTIVE) {
      Animated.spring(translateX, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
      if (nativeEvent.translationX < -100) {
        handleLeftSwipe();
      } else if (nativeEvent.translationX > 100) {
        handleRightSwipe();
      }
    }
  };

  const handleLeftSwipe = async () => {
    if (streamPending) {
      return;
    }

    if (!nextStreamdata) {
      Toast.show({
        type: 'info',
        text1: 'No More Streams Available',
        text2: 'Come back later!',
        visibilityTime: 1000,
      });
      return;
    }

    navigation.reset({
      index: 1,
      routes: [
        {
          name: 'Discover',
        },
        {
          name: 'WatchStream',
          params: nextStreamdata,
        },
      ],
    });
  };

  const handleRightSwipe = async () => {
    if (streamPending) {
      return;
    }
    if (!previousStreamdata) {
      Toast.show({
        type: 'info',
        text1: 'No More Streams Available',
        text2: 'Come back later!',
        visibilityTime: 1000,
      });
      return;
    }
    navigation.reset({
      index: 1,
      routes: [
        {
          name: 'Discover',
        },
        {
          name: 'WatchStream',
          params: previousStreamdata,
        },
      ],
    });
  };

  if (meetingid === null || streamPending || !otherdata) {
    return <Loading />;
  }

  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      colors={colors.gradients.buttongradient}
      style={{flex: 1}}>
      <PanGestureHandler
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}>
        <Animated.View
          style={{
            transform: [{translateX}, {scale}],
            flex: 1,
            flexDirection: 'row',
          }}>
          <View
            style={{
              flex: 1,
            }}>
            {type === 'ONLINE' ? (
              <MeetingProvider
                config={{
                  meetingId: meetingid,
                  micEnabled: micEnabled,
                  webcamEnabled: webcamEnabled,
                  name,
                  mode,
                  // notification: {
                  //   title: 'Video SDK Meeting',
                  //   message: 'Meeting is running.',
                  // },
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
            ) : (
              <OfflineViewerContainer
                streamotherdata={otherdata}
                downstreamUrl={recordedurl}
              />
            )}

            <View
              style={{
                position: 'absolute',
                bottom: 0,
                height: '100%',
                width: '100%',
                right: '-110%',
                borderRadius: 30,
                overflow: 'hidden',
              }}>
              <NextPreviousJoin
                userdata={nextStreamdata?.otherdata?.user}
                next={true}
                isPending={streamPending}
              />
            </View>
            <View
              style={{
                position: 'absolute',
                bottom: 0,
                height: '100%',
                width: '100%',
                left: '-110%',
                borderRadius: 30,
                overflow: 'hidden',
              }}>
              <NextPreviousJoin
                userdata={previousStreamdata?.otherdata?.user}
                next={false}
                isPending={streamPending}
              />
            </View>
          </View>
        </Animated.View>
      </PanGestureHandler>
    </LinearGradient>
  );
};

export default WatchStream;
