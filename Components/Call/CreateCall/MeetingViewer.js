import React, {useEffect, useRef, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useMeeting} from '@videosdk.live/react-native-sdk';
import Toast from 'react-native-toast-message';
import SpeakerFooter from './SpeakerFooter';
import {useOrientation} from './useOrientation';
import ParticipantView from './ParticipantView';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function MeetingViewer({}) {
  const [localId, setLocalId] = useState(null);
  const [otherId, setOtherId] = useState(null);
  const {
    localParticipant,
    participants,
    pinnedParticipants,
    localWebcamOn,
    localMicOn,
    end,
    toggleWebcam,
    toggleMic,
    changeWebcam,
    meetingId,
    activeSpeakerId,
    changeMode,
    hlsState,
    startHls,
    stopHls,
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

  const _handleHLS = () => {
    if (!hlsState || hlsState === 'HLS_STOPPED') {
      startHls({
        layout: {
          type: 'SPOTLIGHT',
          priority: 'PIN',
        },
        theme: 'DARK',
        orientation: 'landscape',
      });
    } else if (hlsState === 'HLS_PLAYABLE') {
      stopHls();
    }
  };

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
      }
    }
  }, [localParticipant, participants]);

  // let nonLocalParticipantIds = [];
  // if (localParticipant && participants) {
  //   nonLocalParticipantIds = Array.from(participants.values())
  //     .filter(participant => participant.id !== localParticipant.id)
  //     .map(participant => participant.id);
  // }

  const switchIds = () => {
    const temp = localId;
    setLocalId(otherId);
    setOtherId(temp);
  };

  const makenull = () => {
    setLocalId(null);
    setOtherId(null);
  };

  return (
    <View
      style={{
        flex: 1,
      }}>
      {/* center */}
      <View
        style={{
          flex: 1,
          flexDirection: orientation == 'PORTRAIT' ? 'column' : 'row',
          overflow: 'hidden',
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
        }}>
        {localId && <ParticipantView participantId={localId} quality={'low'} />}
      </View>
      {otherId && (
        <View
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            height: 125,
            width: 125,
            overflow: 'hidden',
            borderWidth: 1,
            zIndex: 1,
            backgroundColor: 'rgba(0,0,0,0.3)',
          }}>
          <View
            style={{
              flex: 1,
            }}>
            <ParticipantView participantId={otherId} quality={'low'} />
          </View>
        </View>
      )}

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
