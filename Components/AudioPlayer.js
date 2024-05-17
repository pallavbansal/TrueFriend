import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import {PlayerProgressBar} from './PlayerProgressBar';
import TrackPlayer, {
  State,
  useProgress,
  useActiveTrack,
  useIsPlaying,
} from 'react-native-track-player';
import {colorData} from '../utils/colorData';

const AudioPlayer = () => {
  const activeTrack = useActiveTrack();
  const isPlaying = useIsPlaying();
  const progress = useProgress();

  // console.log('Active Track:', activeTrack);
  // console.log('Is Playing:', isPlaying);
  if (!activeTrack) return null;

  const togglePlayback = async () => {
    if (isPlaying.playing) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
  };

  const handleNext = async () => {
    console.log('Next');
  };

  const handlePrevious = async () => {
    console.log('Previous');
  };

  const closePlayer = async () => {
    await TrackPlayer.reset();
  };

  return (
    <View style={styles.playerContainer}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          // justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          onPress={togglePlayback}
          style={styles.buttonContainer}>
          <Ionicons
            name={isPlaying.playing ? 'pause' : 'play'}
            size={26}
            color={colorData.white}
          />
        </TouchableOpacity>
        <Text style={styles.fileName}>{activeTrack.title}</Text>
        <View
          style={{
            marginLeft: 'auto',
          }}>
          <TouchableOpacity
            onPress={closePlayer}
            style={styles.buttonContainer}>
            <Ionicons
              name="close-circle-outline"
              size={26}
              color={colorData.white}
            />
          </TouchableOpacity>
        </View>
        {/* <View
          style={{
            flexDirection: 'row',
          }}>
          <Text>{progress.position}</Text>
          <Text>/</Text>
          <Text>{progress.duration}</Text>
        </View> */}
      </View>
      {/* <View
        style={{
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          onPress={togglePlayback}
          style={styles.buttonContainer}>
          <Ionicons
            name={isPlaying.playing ? 'pause' : 'play'}
            size={20}
            color={colorData.white}
          />
        </TouchableOpacity>
      </View> */}
      {/* <PlayerProgressBar /> */}
      {/* <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
        }}>
        <Text>{progress.position}</Text>
        <Text>{progress.duration}</Text>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  playerContainer: {
    flexDirection: 'column',
    // alignItems: 'center',
    backgroundColor: colorData.back2,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
    marginBottom: 10,
    gap: 10,
  },
  buttonContainer: {
    marginHorizontal: 10,
  },
  fileName: {
    color: colorData.white,
  },
});

export default AudioPlayer;
