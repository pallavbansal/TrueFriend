import React, {useEffect, useRef, useState, useMemo} from 'react';
import {View, Platform, Dimensions, Text, TouchableOpacity} from 'react-native';
import {useMeeting, usePubSub} from '@videosdk.live/react-native-sdk';
import Toast from 'react-native-toast-message';
import SpeakerFooter from './SpeakerFooter';
import {useOrientation} from './useOrientation';
import ParticipantView from './ParticipantView';
import AntDesign from 'react-native-vector-icons/AntDesign';
import BottomSheet from '../common/BottomSheet';
import ChatViewer from '../common/ChatViewer';
import {useCreateStream} from '../../../Hooks/Query/StreamQuery';

export default function MeetingViewer({setlocalParticipantMode}) {
  const {isPending, error, mutate, reset} = useCreateStream();
  const {
    localParticipant,
    participants,
    localWebcamOn,
    localMicOn,
    end,
    leave,
    toggleWebcam,
    toggleMic,
    changeWebcam,
    meetingId,
    hlsState,
    startHls,
    stopHls,
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

  const bottomSheetRef = useRef();
  const orientation = useOrientation();
  const [bottomSheetView, setBottomSheetView] = useState('');

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
      startRecording({
        quality: 'low',
      });
      if (meetingId) {
        const formdata = {
          meeting_id: meetingId,
          type: 'STREAM',
        };
        console.log(meetingId, formdata);
        mutate(
          {
            data: formdata,
          },
          {
            onSuccess: data => {
              console.log('start stream meetingid push success', data);
            },
          },
        );
      }
    } else if (hlsState === 'HLS_PLAYABLE') {
      stopRecording();
      stopHls();
      end();
    }
  };

  return (
    <View
      style={{
        flex: 1,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          position: 'absolute',
          bottom: 150,
          right: 10,
          zIndex: 100,
          backgroundColor: 'rgba(0,0,0,0.5)',
          padding: 5,
          borderRadius: 8,
        }}>
        <View style={{flexDirection: 'row'}}>
          {hlsState === 'HLS_STARTED' ||
          hlsState === 'HLS_STOPPING' ||
          hlsState === 'HLS_PLAYABLE' ||
          hlsState === 'HLS_STARTING' ? (
            <TouchableOpacity
              onPress={() => {
                _handleHLS();
              }}
              activeOpacity={1}
              style={{
                padding: 4,
              }}>
              <Text
                style={{
                  fontSize: 12,
                  color: '#FF5D5D',
                  fontWeight: 'bold',
                }}>
                {hlsState === 'HLS_STARTED'
                  ? `Live Started`
                  : hlsState === 'HLS_STOPPING'
                  ? `Live Stopping`
                  : hlsState === 'HLS_STARTING'
                  ? `Live Starting`
                  : hlsState === 'HLS_PLAYABLE'
                  ? 'Stop Live'
                  : null}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                _handleHLS();
              }}
              activeOpacity={1}
              style={{
                padding: 4,
              }}>
              <Text
                style={{
                  fontSize: 12,
                  color: '#FF5D5D',
                  fontWeight: 'bold',
                }}>
                Go Live
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          position: 'absolute',
          bottom: 200,
          right: 10,
          zIndex: 100,
          backgroundColor: 'rgba(0,0,0,0.5)',
          padding: 5,
          borderRadius: 8,
        }}>
        <AntDesign name="eyeo" size={24} color="white" />
        <Text
          style={{
            fontSize: 12,
            color: 'white',
            marginLeft: 4,
            marginRight: 4,
            fontWeight: 'bold',
          }}>
          {participants ? [...participants.keys()].length : 1}
        </Text>
      </View>

      {/* center */}
      <View
        style={{
          flex: 1,
          flexDirection: orientation == 'PORTRAIT' ? 'column' : 'row',
          overflow: 'hidden',
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
        }}>
        {localParticipant && (
          <ParticipantView
            participantId={localParticipant.id}
            quality={'low'}
          />
        )}
      </View>
      <SpeakerFooter
        localMicOn={localMicOn}
        toggleMic={toggleMic}
        localWebcamOn={localWebcamOn}
        toggleWebcam={toggleWebcam}
        changeWebcam={changeWebcam}
        end={end}
        leave={leave}
        setBottomSheetView={setBottomSheetView}
        bottomSheetRef={bottomSheetRef}
      />
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
    </View>
  );
}
