import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

const SpeakerHeader = ({hlsState, _handleHLS, participants}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        position: 'absolute',
        top: 0,
        zIndex: 100,
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
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 8,
              padding: 10,
              borderRadius: 8,
              borderWidth: 1.5,
              backgroundColor: '#FF5D5D',
            }}>
            <Text
              style={{
                fontSize: 12,
                color: 'white',
              }}>
              {hlsState === 'HLS_STARTED'
                ? `Live Starting`
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
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 8,
              padding: 8,
              borderRadius: 8,
              borderWidth: 1.5,
              borderColor: '#2B3034',
            }}>
            <Text
              style={{
                fontSize: 12,
                color: 'white',
              }}>
              Go Live
            </Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          onPress={() => {
            console.log('Hello');
          }}
          activeOpacity={1}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: 8,
            width: 60,
            borderRadius: 8,
            borderWidth: 1.5,
            borderColor: '#2B3034',
          }}>
          <Text
            style={{
              fontSize: 12,
              color: 'white',
              marginLeft: 4,
            }}>
            {participants ? [...participants.keys()].length : 1}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SpeakerHeader;
