import React, {useRef, useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Video from 'react-native-video';
import LinearGradient from 'react-native-linear-gradient';
import {useMeeting} from '@videosdk.live/react-native-sdk';
import ChatViewer from '../common/ChatViewer';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {colors} from '../../../Styles/ColorData';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSendRequest} from '../../../Hooks/Query/RequestQuery';
import StreamLoading from './StreamLoading';
import {useRequestCurrentStatus} from '../../../Hooks/Query/RequestQuery';
import Toast from 'react-native-toast-message';
import ProfileNavigator from '../../Common/ProfileNavigator';
import {getToken, createMeeting} from '../../../Utils/Streamapi';
import socket from '../../../Socket/Socket';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import WatchSpeakerFooter from './WatchSpeakerFooter';

const ViewerContainer = ({userid, streamotherdata}) => {
  const {changeMode, leave, hlsState, hlsUrls, participants} = useMeeting();
  const mydata = useSelector(state => state.Auth.userinitaldata);
  const [showinputouter, setshowinputouter] = useState(false);
  const [message, setMessage] = useState('');
  const navigation = useNavigation();
  const isCreator = true;
  const videoPlayer = useRef(null);
  const bottomSheetRef = useRef();
  const [bottomSheetView, setBottomSheetView] = useState('');
  const [friendrequest, setFriendRequest] = useState('');
  const {isPending, error, mutate, reset} = useSendRequest();
  const {
    data: requestStatus,
    error: requestError,
    isPending: requestPending,
  } = useRequestCurrentStatus(streamotherdata.user.id);

  console.log('requestStatus', streamotherdata);

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

  const handleCall = async () => {
    if (hlsState == 'HLS_PLAYABLE') {
      const token = await getToken();
      let meetingId = '';
      if (isCreator) {
        meetingId = await createMeeting({token});
      }

      const finaldata = {
        caller: {
          userid: mydata.id,
          name: mydata.name,
          imageUrl: mydata.profile_picture,
        },
        reciever: {
          name: streamotherdata.user.name,
          id: streamotherdata.user.id,
        },
        meetingId: meetingId,
        callaction: 'outgoing',
        type: 'audio',
      };
      leave();
      navigation.navigate('Call', {
        name: mydata.name.trim(),
        token: token,
        meetingId: meetingId,
        micEnabled: true,
        webcamEnabled: false,
        isCreator: isCreator,
        mode: 'CONFERENCE',
        finaldata: finaldata,
      });
      socket.emit('call', finaldata);
    } else {
      Toast.show({
        type: 'info',
        text1: 'The stream has not started yet.',
        text2: 'Please wait or try another stream.',
        visibilityTime: 2000,
      });
    }
  };

  const handleChat = () => {
    if (hlsState == 'HLS_PLAYABLE') {
      setBottomSheetView(prev => (prev === 'CHAT' ? '' : 'CHAT'));
    } else {
      setBottomSheetView('');
      Toast.show({
        type: 'info',
        text1: 'The stream has not started yet.',
        text2: 'Please wait or try another stream.',
        visibilityTime: 2000,
      });
    }

    // bottomSheetRef.current.show();
  };

  return (
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
          {(friendrequest === 'Noaction' || friendrequest === 'Friends') && (
            <TouchableOpacity
              style={{
                position: 'absolute',
                bottom: 110,
                right: 10,
                height: 50,
                width: 50,
                backgroundColor: 'rgba(0,0,0,0.3)',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 15,
                zIndex: 100,
              }}
              onPress={
                friendrequest === 'Noaction' ? () => handlefollow() : () => {}
              }>
              <SimpleLineIcons
                name={
                  friendrequest === 'Noaction'
                    ? 'user-follow'
                    : 'user-following'
                }
                size={24}
                color="white"
              />
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <View style={styles.waitcontainer}>
          <StreamLoading />
        </View>
      )}

      <WatchSpeakerFooter
        bottomSheetView={bottomSheetView}
        handleChat={handleChat}
        leave={leave}
        participants={participants}
        showinputouter={showinputouter}
        message={message}
        setMessage={setMessage}
        setshowinputouter={setshowinputouter}
      />

      <View>
        <View
          style={{
            position: 'absolute',
            bottom: 110,
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
        <TouchableOpacity
          style={{
            position: 'absolute',
            bottom: 110,
            right: 5,
          }}
          onPress={handleCall}>
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
      </View>

      {bottomSheetView === 'CHAT' ? (
        <View
          style={{
            position: 'absolute',
            width: '48%',
            height: 300,
            bottom: 190,
            left: 5,
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.05)',
            borderRadius: 15,
          }}>
          <ChatViewer
            setshowinputouter={setshowinputouter}
            showinputouter={showinputouter}
          />
        </View>
      ) : null}
    </View>
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
