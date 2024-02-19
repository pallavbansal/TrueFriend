import {View, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import {colors} from '../Styles/ColorData';
import LinearGradient from 'react-native-linear-gradient';
import {
  MeetingProvider,
  MeetingConsumer,
} from '@videosdk.live/react-native-sdk';
import ILSContainer from '../Components/Call/CreateCall/ILSContainer';
import {useNavigation} from '@react-navigation/native';
import socket from '../Socket/Socket';
import WaitingResponse from '../Components/Call/CreateCall/WaitingResponse';

const Call = ({route}) => {
  const navigation = useNavigation();
  const [response, setResponse] = useState('');
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

  useEffect(() => {
    const handleresponse = data => {
      console.log('Received call response in calls :', data);
      if (data.callaction == 'rejected') {
        setResponse('rejected');
      }
      if (data.callaction == 'accepted') {
        setResponse('accepted');
      }
    };
    socket.on('call', handleresponse);

    // Set response to 'rejected' after 15 seconds if it hasn't been set yet
    const timeoutId = setTimeout(() => {
      if (!response) {
        setResponse('rejected');
      }
    }, 15000); // 15 seconds

    return () => {
      socket.off('call', handleresponse);
      clearTimeout(timeoutId); // Clear the timeout if the component is unmounted
    };
  }, [response]);

  useEffect(() => {
    if (response == 'rejected') {
      navigation.navigate('FriendsList');
    }
  }, [response]);

  if (response == 'accepted') {
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
  } else {
    return <WaitingResponse />;
  }
};

export default Call;
