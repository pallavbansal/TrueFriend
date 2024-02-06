import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Platform} from 'react-native';
import Slider from '@react-native-community/slider';
import {useNavigation} from '@react-navigation/native';
import {useMeeting} from '@videosdk.live/react-native-sdk';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function ControlsOverlay({
  playableDuration,
  setPause,
  progress,
  pause,
  seekTo,
  setisChatVisible,
  isChatVisible,
}) {
  const navigation = useNavigation();
  const {leave} = useMeeting({});
  const {participants} = useMeeting({});
  const [hideOverlay, setHideOverlay] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const toHHMMSS = secs => {
    var sec_num = parseInt(secs, 10);
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor(sec_num / 60) % 60;
    var seconds = sec_num % 60;

    return [hours, minutes, seconds]
      .map(v => (v < 10 ? '0' + v : v))
      .filter((v, i) => v !== '00' || i > 0)
      .join(':');
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        setHideOverlay(d => !d);
      }}
      style={{
        flex: 1,
        position: 'absolute',
        justifyContent: 'space-between',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
      }}>
      {!hideOverlay ? (
        <>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 6,
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              {/* <TouchableOpacity
                onPress={() => {
                  leave();
                  navigation.navigate('Discover');
                }}
                style={{
                  height: 30,
                  aspectRatio: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: 4,
                }}>
                <MaterialIcons name="cancel" size={24} color="black" />
              </TouchableOpacity> */}
              {/* <View
                style={{
                  height: 26,
                  width: 46,
                  backgroundColor: '#FF5D5D',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 4,
                  marginLeft: 14,
                }}>
                <Text style={{color: '#ffffff', fontWeight: 'bold'}}>Live</Text>
              </View> */}
              {/* <View
                style={{
                  height: 26,
                  width: 46,
                  backgroundColor: 'rgba(0,0,0,0.3)',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 4,
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  marginLeft: 10,
                }}>
                <MaterialIcons name="remove-red-eye" size={24} color="black" />
                <Text
                  style={{
                    color: '#ffffff',
                    fontWeight: 'bold',
                    fontSize: 14,
                  }}>
                  {participants ? [...participants.keys()].length : 1}
                </Text>
              </View> */}
            </View>

            {/* <View
              style={{
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                onPress={() => {
                  // publish();
                  publish('SAMPLE_MESG');
                }}
                style={{
                  height: 40,
                  aspectRatio: 1,
                  marginRight: 8,
                  borderRadius: 4,
                  backgroundColor: 'rgba(0,0,0,0.3)',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <MaterialIcons name="add-chart" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setisChatVisible(val => !val);
                }}
                style={{
                  height: 40,
                  borderRadius: 6,
                  aspectRatio: 1,
                  marginHorizontal: 8,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: isChatVisible ? '#FFF' : 'rgba(0,0,0,0.3)',
                }}>
                <MaterialIcons
                  name="chat"
                  size={24}
                  color={isChatVisible ? 'black' : '#FFF'}
                />
              </TouchableOpacity>
            </View> */}
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginBottom: 8,
              marginHorizontal: 8,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                setPause(d => !d);
              }}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 4,
              }}>
              {pause ? (
                <MaterialIcons name="play-arrow" size={24} color="#FFF" />
              ) : (
                <MaterialIcons name="pause" size={24} color="#FFF" />
              )}
            </TouchableOpacity>

            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: 8,
              }}>
              <Text
                style={{
                  color: '#ffffff',
                  fontSize: 12,
                }}>
                {toHHMMSS(progress)}
              </Text>
              <View
                style={{
                  flex: 1,
                }}>
                <Slider
                  maximumValue={playableDuration}
                  minimumValue={0}
                  onValueChange={value => {
                    seekTo(value);
                  }}
                  value={progress}
                  maximumTrackTintColor={Platform.select({
                    android: '#ffffff',
                    ios: '#ffffff',
                  })}
                  minimumTrackTintColor={'#FF5D5D'}
                  thumbTintColor={'#FF5D5D'}
                />
              </View>
              <Text style={{color: '#ffffff', fontSize: 12}}>
                {toHHMMSS(playableDuration)}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => {
                setIsFullScreen(!isFullScreen);
              }}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 4,
                backgroundColor: 'rgba(0,0,0,0.3)',
              }}>
              {isFullScreen ? (
                <MaterialIcons name="fullscreen-exit" size={24} color="#FFF" />
              ) : (
                <MaterialIcons name="fullscreen" size={24} color="#FFF" />
              )}
            </TouchableOpacity>
          </View>
        </>
      ) : null}
    </TouchableOpacity>
  );
}
