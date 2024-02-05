import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useMeeting} from '@videosdk.live/react-native-sdk';

function Controls() {
  const {toggleWebcam, toggleMic, startHls, stopHls, hlsState} = useMeeting({});

  const _handleHLS = async () => {
    if (!hlsState || hlsState === 'HLS_STOPPED') {
      startHls({
        layout: {
          type: 'SPOTLIGHT',
          priority: 'PIN',
          gridSize: 4,
        },
        theme: 'DARK',
        orientation: 'portrait',
      });
    } else if (hlsState === 'HLS_STARTED' || hlsState === 'HLS_PLAYABLE') {
      stopHls();
    }
  };

  return (
    <View
      style={{
        padding: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <TouchableOpacity
        onPress={() => {
          toggleWebcam();
        }}>
        <View>
          <Text style={{color: 'white'}}>Toggle Webcam</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          toggleMic();
        }}>
        <View>
          <Text style={{color: 'white'}}>Toggle Mic</Text>
        </View>
      </TouchableOpacity>

      {hlsState === 'HLS_STARTED' ||
      hlsState === 'HLS_STOPPING' ||
      hlsState === 'HLS_STARTING' ||
      hlsState === 'HLS_PLAYABLE' ? (
        <TouchableOpacity
          onPress={() => {
            _handleHLS();
          }}>
          <View>
            <Text style={{color: 'white'}}>
              {hlsState === 'HLS_STARTED'
                ? `Live Starting`
                : hlsState === 'HLS_STOPPING'
                ? `Live Stopping`
                : hlsState === 'HLS_PLAYABLE'
                ? `Stop Live`
                : `Loading...`}
            </Text>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => {
            _handleHLS();
          }}>
          <View>
            <Text style={{color: 'white'}}>Go Live</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default Controls;
