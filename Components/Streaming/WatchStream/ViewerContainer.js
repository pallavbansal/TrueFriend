import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  Platform,
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
import {useRequestCurrentStatus} from '../../../Hooks/Query/RequestQuery';
import Toast from 'react-native-toast-message';
import ProfileNavigator from '../../Common/ProfileNavigator';
import {getToken, createMeeting} from '../../../Utils/Streamapi';
import socket from '../../../Socket/Socket';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const ViewerContainer = ({userid, streamotherdata}) => {
  const {changeMode, leave, hlsState, hlsUrls, participants} = useMeeting();
  const mydata = useSelector(state => state.Auth.userinitaldata);
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
          {friendrequest === 'Noaction' && (
            <TouchableOpacity
              style={{
                position: 'absolute',
                bottom: 90,
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
              <SimpleLineIcons name="user-following" size={24} color="green" />
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
            name={bottomSheetView === 'CHAT' ? 'cancel-presentation' : 'chat'}
            size={24}
            color="black"
            onPress={handleChat}
          />
        </TouchableOpacity>
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 50,
            padding: 15,
          }}>
          <TouchableOpacity
            onPress={leave}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: 60,
              width: 60,
              borderRadius: 40,
            }}>
            <AntDesign name="home" size={34} color="blue" />
          </TouchableOpacity>
        </View>
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
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: -90,
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
            height: '60%',
            bottom: 190,
            left: 5,
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.05)',
            borderRadius: 15,
          }}>
          <ChatViewer />
        </View>
      ) : null}

      {/* <BottomSheet
        sheetBackgroundColor={'#2B3034'}
        // sheetBackgroundColor={'transparent'}
        draggable={false}
        radius={12}
        hasDraggableIcon
        closeFunction={() => {
          setBottomSheetView('');
        }}
        ref={bottomSheetRef}
        height={Dimensions.get('window').height * 0.5}>
        {bottomSheetView === 'CHAT' ? <ChatViewer /> : null}
      </BottomSheet> */}
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
