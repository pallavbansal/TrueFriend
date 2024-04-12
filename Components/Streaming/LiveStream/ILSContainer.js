import {
  useMeeting,
  ReactNativeForegroundService,
} from '@videosdk.live/react-native-sdk';
import {useEffect, useRef, useState} from 'react';
import WaitingToJoinView from '../common/WaitingToJoinView';
import React from 'react';
import MeetingViewer from './MeetingViewer';
import {useSelector} from 'react-redux';

export default function ILSContainer({webcamEnabled}) {
  const mydata = useSelector(state => state.Auth.userinitaldata);
  // console.log('Mydata', mydata);
  const [isJoined, setJoined] = useState(false);
  const mMeeting = useMeeting({});
  const mMeetingRef = useRef();
  useEffect(() => {
    mMeetingRef.current = mMeeting;
  }, [mMeeting]);

  const {join, changeWebcam, leave} = useMeeting({
    onMeetingJoined: () => {
      setTimeout(() => {
        setJoined(true);
      }, 500);
    },
  });

  useEffect(() => {
    setTimeout(() => {
      if (!isJoined) {
        join();
        if (webcamEnabled) changeWebcam();
      }
    }, 1000);

    return () => {
      leave();
      ReactNativeForegroundService.stopAll();
    };
  }, []);

  return isJoined ? <MeetingViewer /> : <WaitingToJoinView userdata={mydata} />;
}
