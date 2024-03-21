import React, {useEffect, useRef, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useMeeting} from '@videosdk.live/react-native-sdk';
import Toast from 'react-native-toast-message';
import SpeakerFooter from './SpeakerFooter';
import {useOrientation} from './useOrientation';
import ParticipantView from './ParticipantView';
import AntDesign from 'react-native-vector-icons/AntDesign';
import WaitingToJoinView from './WaitingToJoinView';

export default function MeetingViewer({}) {
  const [localId, setLocalId] = useState(null);
  const [otherId, setOtherId] = useState(null);
  const [waiting, setWaiting] = useState(true);
  const [switchcam, setSwitchcam] = useState(false);
  const {
    localParticipant,
    participants,
    localWebcamOn,
    localMicOn,
    end,
    toggleWebcam,
    toggleMic,
    changeWebcam,
    hlsState,
    startRecording,
    stopRecording,
  } = useMeeting({
    onError: data => {
      const {code, message} = data;
      Toast.show({
        type: 'error',
        text1: `Error: ${code}`,
        text2: message,
      });
    },
  });

  const hlsRef = useRef();
  const orientation = useOrientation();

  useEffect(() => {
    if (hlsRef.current) {
      if (hlsState === 'HLS_STARTING' || hlsState === 'HLS_STOPPING') {
        hlsRef.current.start();
      } else {
        hlsRef.current.stop();
      }
    }
  }, [hlsState]);

  useEffect(() => {
    if (localParticipant && participants) {
      setLocalId(localParticipant.id);
      const nonLocalParticipantIds = Array.from(participants.values())
        .filter(participant => participant.id !== localParticipant.id)
        .map(participant => participant.id);
      if (nonLocalParticipantIds.length > 0) {
        setOtherId(nonLocalParticipantIds[0]);
        setWaiting(false);
        startRecording({
          layout: {
            type: 'GRID',
            gridSize: 2,
          },
          quality: 'low',
        });
      }
    }
  }, [localParticipant, participants]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (waiting) {
        end();
      }
    }, 10000);
    return () => clearTimeout(timer);
  }, [waiting, end]);

  const switchIds = () => {
    const temp = localId;
    setLocalId(otherId);
    setOtherId(temp);
  };

  // const switchIds = () => {
  //   setSwitchcam(prev => !prev);
  // };

  const makenull = () => {
    stopRecording();
    setLocalId(null);
    setOtherId(null);
  };

  if (waiting) {
    return <WaitingToJoinView />;
  }

  return (
    <View
      style={{
        flex: 1,
      }}>
      {/* center */}
      <View style={styles.callcontainer}>
        {localId && <ParticipantView participantId={localId} quality={'low'} />}
      </View>

      <View style={styles.callcontainer}>
        {otherId && <ParticipantView participantId={otherId} quality={'low'} />}
      </View>

      <SpeakerFooter
        localMicOn={localMicOn}
        toggleMic={toggleMic}
        localWebcamOn={localWebcamOn}
        toggleWebcam={toggleWebcam}
        changeWebcam={changeWebcam}
        end={end}
        makenull={makenull}
        switchIds={switchIds}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  // bigger: {
  //   flex: 1,
  //   overflow: 'hidden',
  //   borderBottomLeftRadius: 30,
  //   borderBottomRightRadius: 30,
  // },
  // smaller: {
  //   position: 'absolute',
  //   top: 10,
  //   right: 10,
  //   height: 125,
  //   width: 125,
  //   overflow: 'hidden',
  //   borderWidth: 1,
  //   backgroundColor: 'rgba(0,0,0,0.3)',
  //   zIndex: 100,
  // },

  callcontainer: {
    flex: 1,
    overflow: 'hidden',
    borderRadius: 30,
    margin: 5,
  },
});
