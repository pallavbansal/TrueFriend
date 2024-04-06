import React, {useEffect, useRef, useState, useMemo} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useMeeting} from '@videosdk.live/react-native-sdk';
import Toast from 'react-native-toast-message';
import SpeakerFooter from './SpeakerFooter';
import {useOrientation} from './useOrientation';
import ParticipantView from './ParticipantView';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ChatViewer from '../common/ChatViewer';
import {useCreateStream} from '../../../Hooks/Query/StreamQuery';

export default function MeetingViewer({}) {
  const {isPending, error, mutate, reset} = useCreateStream();
  const [showinputouter, setshowinputouter] = useState(false);
  const [message, setMessage] = useState('');

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
      // Toast.show({
      //   type: 'error',
      //   text1: `Error: ${code}`,
      //   text2: message,
      // });
    },
  });

  const bottomSheetRef = useRef();
  const orientation = useOrientation();
  const [bottomSheetView, setBottomSheetView] = useState('');

  useEffect(() => {
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
      }
    };
    _handleHLS();
  }, [hlsState]);

  const _handleEnd = () => {
    if (hlsState === 'HLS_PLAYABLE') {
      stopRecording();
      stopHls();
      end();
    }
  };

  const handleChat = () => {
    if (hlsState === 'HLS_PLAYABLE') {
      setBottomSheetView(prev => (prev === 'CHAT' ? '' : 'CHAT'));
    } else {
      setBottomSheetView('');
      Toast.show({
        type: 'info',
        text2: 'Stream is not started yet.',
      });
    }
    // bottomSheetRef.current.show();
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
          bottom: 165,
          right: 10,
          zIndex: 100,
          backgroundColor: 'rgba(0,0,0,0.5)',
          // padding: 5,
          borderRadius: 8,
        }}>
        <View style={{flexDirection: 'row'}}>
          {/* hlsState === 'HLS_PLAYABLE' */}
          {(hlsState === 'HLS_STARTED' ||
            hlsState === 'HLS_STOPPING' ||
            hlsState === 'HLS_STARTING') && (
            <TouchableOpacity
              onPress={() => {
                _handleEnd();
              }}
              activeOpacity={1}
              style={{
                padding: 9,
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
          )}

          {/* </View></View> : null
            <TouchableOpacity
              onPress={() => {
                // _handleHLS();
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
            </TouchableOpacity> */}
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          position: 'absolute',
          bottom: 115,
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
        _handleEnd={_handleEnd}
        leave={leave}
        setBottomSheetView={setBottomSheetView}
        bottomSheetView={bottomSheetView}
        bottomSheetRef={bottomSheetRef}
        handleChat={handleChat}
        showinputouter={showinputouter}
        message={message}
        setMessage={setMessage}
        setshowinputouter={setshowinputouter}
      />

      {bottomSheetView === 'CHAT' ? (
        <View
          style={{
            position: 'absolute',
            width: '48%',
            height: 300,
            bottom: 160,
            left: 5,
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.1)',
            borderRadius: 15,
            overflow: 'hidden',
          }}>
          <ChatViewer
            setshowinputouter={setshowinputouter}
            showinputouter={showinputouter}
          />
        </View>
      ) : null}
    </View>
  );
}
