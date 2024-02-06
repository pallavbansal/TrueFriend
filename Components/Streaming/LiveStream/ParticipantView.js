import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {
  useParticipant,
  RTCView,
  MediaStream,
} from '@videosdk.live/react-native-sdk';

export default function ParticipantView({participantId, quality}) {
  const {
    displayName,
    webcamStream,
    webcamOn,
    micOn,
    isLocal,
    setQuality,
    isActiveSpeaker,
  } = useParticipant(participantId, {});

  useEffect(() => {
    if (quality) {
      setQuality(quality);
    }
  }, [quality]);

  const DisplayNameComponent = () => {
    return (
      <View
        style={{
          alignItems: 'center',
          position: 'absolute',
          bottom: 8,
          padding: 8,
          left: 15,
          backgroundColor: 'rgba(0,0,0,0.3)',
          flexDirection: 'row',
          borderRadius: 5,
        }}>
        <Text
          numberOfLines={1}
          style={{
            color: '#fff',
            fontSize: 12,
          }}>
          {isLocal ? 'You' : displayName || ''}
        </Text>
      </View>
    );
  };

  return (
    <View
      key={participantId}
      style={{
        flex: 1,
      }}>
      {webcamOn && webcamStream ? (
        <>
          <RTCView
            streamURL={new MediaStream([webcamStream.track]).toURL()}
            objectFit={'cover'}
            mirror={isLocal ? true : false}
            style={{
              flex: 1,
              backgroundColor: 'black',
            }}
          />
          <DisplayNameComponent />
        </>
      ) : (
        <>
          <View
            style={{
              flex: 1,
              backgroundColor: 'white',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                backgroundColor: 'rgba(0,0,0,0.3)',
                borderRadius: 50,
                width: 75,
                height: 75,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>
                {displayName.slice(0, 1)}
              </Text>
            </View>
          </View>
          <DisplayNameComponent />
        </>
      )}
    </View>
  );
}
