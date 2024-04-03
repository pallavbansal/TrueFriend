import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
  Image,
} from 'react-native';
import Video from 'react-native-video';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import {useMeeting} from '@videosdk.live/react-native-sdk';
import BottomSheet from '../common/BottomSheet';
import ChatViewer from '../common/ChatViewer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {colors} from '../../../Styles/ColorData';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSendRequest} from '../../../Hooks/Query/RequestQuery';
import StreamLoading from './StreamLoading';
import {useNavigation} from '@react-navigation/native';
import {getToken} from '../../../Utils/Streamapi';
import {PanGestureHandler, State} from 'react-native-gesture-handler';
import {useFetchAdjacentStream} from '../../../Hooks/Query/StreamQuery';
import {useRequestCurrentStatus} from '../../../Hooks/Query/RequestQuery';
import Toast from 'react-native-toast-message';
import ProfileNavigator from '../../Common/ProfileNavigator';
import {useSelector} from 'react-redux';
import NextPreviousJoin from './NextPreviousJoin';

const ViewerContainer = ({userid, streamotherdata}) => {
  const navigation = useNavigation();
  const mydata = useSelector(state => state.Auth.userinitaldata);
  const {changeMode, leave, hlsState, hlsUrls, participants} = useMeeting();
  const [nextStreamdata, setNextStreamData] = useState({});
  const [previousStreamdata, setPreviousStreamData] = useState({});

  const videoPlayer = useRef(null);
  const bottomSheetRef = useRef();
  const [bottomSheetView, setBottomSheetView] = useState('CHAT');
  const [friendrequest, setFriendRequest] = useState('');
  const {isPending, error, mutate, reset} = useSendRequest();
  const {
    data: streamData,
    error: streamError,
    isPending: streamPending,
  } = useFetchAdjacentStream(streamotherdata.stream_id);
  const {
    data: requestStatus,
    error: requestError,
    isPending: requestPending,
  } = useRequestCurrentStatus(streamotherdata.user.id);

  const translateX = new Animated.Value(0);

  useEffect(() => {
    if (streamData) {
      setNextStreamData(streamData?.data?.next_stream?.user);
      setPreviousStreamData(streamData?.data?.previous_stream?.user);
    }
  }, [streamData]);

  useEffect(() => {
    if (requestStatus) {
      if (requestStatus.data.friend_request_status === 'FRIENDS') {
        setFriendRequest('Friends');
      } else if (requestStatus.data.friend_request_status === 'REQUEST SENT') {
        setFriendRequest('Sent');
      } else if (
        requestStatus.data.friend_request_status === 'REQUEST RECEIVED'
      ) {
        setFriendRequest('Received');
      } else {
        setFriendRequest('Noaction');
      }
    }
  }, [requestStatus]);

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

  const handlefollow = () => {
    console.log('follow');

    const formdata = {
      receiver_id: streamotherdata.user.id,
    };
    mutate(
      {data: formdata},
      {
        onSuccess: data => {
          console.log('follow success', data);
          if (data.status_code == 1) {
            setFriendRequest('Sent');
            Toast.show({
              type: 'success',
              text1: 'Request Sent',
              visibilityTime: 1000,
            });
          }
        },
      },
    );
  };

  const handleLeftSwipe = async () => {
    if (streamPending) {
      // console.log('streamPending', streamPending);
      return;
    }

    if (streamData.data.next_stream == null) {
      Toast.show({
        type: 'info',
        text1: 'No More Streams Available',
        text2: 'Come back later!',
        visibilityTime: 1000,
      });
      return;
    }

    const token = await getToken();
    leave();
    navigation.reset({
      index: 1,
      routes: [
        {
          name: 'Discover',
        },
        {
          name: 'WatchStream',
          params: {
            token: token,
            name: mydata.name,
            mode: 'VIEWER',
            isswiped: true,
            swipedmeetingid: streamData.data.next_stream.meeting_id,
            swipedmeetingotherdata: {
              meeting_id: streamData.data.next_stream.meeting_id,
              stream_id: streamData.data.next_stream.id,
              stream_status: streamData.data.next_stream.status, // "ACTIVE","ENDED"
              user: streamData.data.next_stream.user,
            },
          },
        },
      ],
    });
  };

  const handleRightSwipe = async () => {
    if (streamPending) {
      return;
    }

    if (streamData.data.previous_stream == null) {
      Toast.show({
        type: 'info',
        text1: 'No More Streams Available',
        text2: 'Come back later!',
        visibilityTime: 1000,
      });
      return;
    }

    const token = await getToken();
    leave();
    navigation.reset({
      index: 1,
      routes: [
        {
          name: 'Discover',
        },
        {
          name: 'WatchStream',
          params: {
            token: token,
            name: mydata.name,
            mode: 'VIEWER',
            isswiped: true,
            swipedmeetingid: streamData.data.previous_stream.meeting_id,
            swipedmeetingotherdata: {
              meeting_id: streamData.data.previous_stream.meeting_id,
              stream_id: streamData.data.previous_stream.id,
              stream_status: streamData.data.previous_stream.status, // "ACTIVE","ENDED"
              user: streamData.data.previous_stream.user,
            },
          },
        },
      ],
    });
  };

  return (
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
          {hlsState == 'HLS_PLAYABLE' ? (
            <View
              style={{
                flex: 1,
              }}>
              <Video
                ref={videoPlayer}
                source={{
                  uri: hlsUrls.downstreamUrl,
                }}
                fullscreen={true}
                resizeMode="cover"
                style={{
                  flex: 1,
                  borderBottomLeftRadius: 30,
                  borderBottomRightRadius: 30,
                }}
                onError={e => console.log('error', e)}
              />
              {friendrequest === 'Noaction' && (
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    bottom: 15,
                    right: 15,
                    height: 50,
                    width: 50,
                    backgroundColor: 'rgba(0,0,0,0.3)',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 15,
                    elevation: 5,
                    zIndex: 100,
                  }}
                  onPress={handlefollow}>
                  <SimpleLineIcons name="user-follow" size={24} color="white" />
                </TouchableOpacity>
              )}
              {friendrequest === 'Friends' && (
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    bottom: 15,
                    right: 15,
                    height: 50,
                    width: 50,
                    backgroundColor: 'rgba(0,0,0,0.3)',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 15,
                    elevation: 5,
                    zIndex: 100,
                  }}>
                  <SimpleLineIcons
                    name="user-following"
                    size={24}
                    color="green"
                  />
                </TouchableOpacity>
              )}
            </View>
          ) : (
            <View style={styles.waitcontainer}>
              <StreamLoading />
            </View>
          )}

          <View style={styles.bottomcontainer}>
            <TouchableOpacity
              style={{
                width: 50,
                backgroundColor: 'rgba(0,0,0,0.1)',
                padding: 5,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 8,
              }}>
              <MaterialIcons
                name="chat"
                size={24}
                color="black"
                onPress={() => {
                  setBottomSheetView('CHAT');
                  bottomSheetRef.current.show();
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={leave}
              style={{
                backgroundColor: 'white',
                borderRadius: 50,
                padding: 15,
              }}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                colors={colors.gradients.calloutergradient}
                style={styles.gradienticon}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 1}}
                  colors={colors.gradients.callinnergradient}
                  style={styles.calliconcontainer}>
                  <Ionicons name="call" size={28} color="white" />
                </LinearGradient>
              </LinearGradient>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: 'rgba(0,0,0,0.1)',
                padding: 5,
                gap: 5,
                borderRadius: 8,
                width: 50,
              }}>
              <AntDesign name="eye" size={24} color="black" />
              <Text
                style={{
                  fontSize: 12,
                  color: 'black',
                  fontWeight: 'bold',
                }}>
                {participants ? [...participants.keys()].length : 1}
              </Text>
            </View>
            <View
              style={{
                position: 'absolute',
                top: -90,
                left: 5,
              }}>
              <ProfileNavigator id={streamotherdata.user.id}>
                <Image
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 25,
                    borderWidth: 3,
                    borderColor: 'white',
                  }}
                  source={{
                    uri: streamotherdata.user.profile_picture,
                  }}
                />
              </ProfileNavigator>
            </View>
          </View>

          <BottomSheet
            sheetBackgroundColor={'#2B3034'}
            draggable={false}
            radius={12}
            hasDraggableIcon
            closeFunction={() => {
              setBottomSheetView('');
            }}
            ref={bottomSheetRef}
            height={Dimensions.get('window').height * 0.5}>
            {bottomSheetView === 'CHAT' ? (
              <ChatViewer raiseHandVisible={false} />
            ) : null}
          </BottomSheet>

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
              userdata={nextStreamdata}
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
              userdata={previousStreamdata}
              next={false}
              isPending={streamPending}
            />
          </View>
        </View>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default ViewerContainer;
const styles = StyleSheet.create({
  waitcontainer: {
    flex: 1,
  },

  bottomcontainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    alignItems: 'center',
    padding: 5,
    marginBottom: 15,
    borderRadius: 50,
    marginHorizontal: 5,
    backgroundColor: 'white',
    marginVertical: 15,
    height: 75,
  },
  gradienticon: {
    height: 60,
    width: 60,
    borderRadius: 42.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calliconcontainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 50,
    borderRadius: 40,
  },
});
