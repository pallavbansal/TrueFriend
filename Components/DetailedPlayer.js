import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import TrackPlayer, {
  useProgress,
  useActiveTrack,
  useIsPlaying,
} from 'react-native-track-player';
import {colorData} from '../utils/colorData';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Slider from '@react-native-community/slider';
import AnimatedIcon from './Common/AnimatedIcon';

const screenWidth = Dimensions.get('screen').width;

const formatTime = seconds => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};

const DetailedPlayer = () => {
  const activeTrack = useActiveTrack();
  const isPlaying = useIsPlaying();
  const progress = useProgress();

  if (!activeTrack) return null;

  const togglePlayback = async () => {
    if (isPlaying.playing) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
  };

  const handleSliderValueChange = async value => {
    await TrackPlayer.seekTo(value);
  };

  const handleVolumeChange = async value => {
    await TrackPlayer.setVolume(value);
  };

  const skipForward = async () => {
    const currentPosition = progress.position;
    await TrackPlayer.seekTo(currentPosition + 10);
  };

  const skipBackward = async () => {
    const currentPosition = progress.position;
    await TrackPlayer.seekTo(currentPosition - 10);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.trackTitle}>{activeTrack.title}</Text>
      <Text style={styles.trackArtist}>{activeTrack.artist}</Text>

      <AnimatedIcon
        source={require('../assets/icons/add-song.json')}
        width={200}
        height={200}
        autoPlay={isPlaying.playing ? true : false}
        loop={isPlaying.playing ? true : false}
      />
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          {formatTime(progress.position)} / {formatTime(progress.duration)}
        </Text>
        <Slider
          style={{width: '100%', height: 40}}
          minimumValue={0}
          maximumValue={progress.duration}
          value={progress.position}
          minimumTrackTintColor={colorData.success}
          maximumTrackTintColor={colorData.danger}
          thumbTintColor={colorData.primary}
          onValueChange={handleSliderValueChange}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={skipBackward}>
          <MaterialIcons name="replay-10" size={34} color={colorData.primary} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={togglePlayback}
          style={styles.buttonContainer}>
          <Ionicons
            name={isPlaying.playing ? 'pause' : 'play'}
            size={34}
            color={isPlaying.playing ? colorData.danger : colorData.success}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={skipForward}>
          <MaterialIcons
            name="forward-10"
            size={34}
            color={colorData.primary}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.playingStatus}>
        {isPlaying.playing ? 'Playing' : 'Paused'}
      </Text>
      <View style={styles.volumeContainer}>
        <Text style={styles.volumeText}>Volume</Text>
        <Slider
          style={{width: '80%', height: 40}}
          minimumValue={0}
          maximumValue={1}
          step={0.01}
          value={0.5}
          minimumTrackTintColor={colorData.success}
          maximumTrackTintColor={colorData.danger}
          thumbTintColor={colorData.primary}
          onValueChange={handleVolumeChange}
        />
      </View>
    </View>
  );
};

export default DetailedPlayer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  trackTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  trackArtist: {
    fontSize: 16,
    marginBottom: 20,
    color: 'white',
  },
  progressContainer: {
    width: screenWidth - 40,
    marginBottom: 20,
  },
  progressText: {
    fontSize: 14,
    marginBottom: 0,
    color: 'white',
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonContainer: {
    marginHorizontal: 20,
  },
  playingStatus: {
    fontSize: 16,
    color: 'white',
  },
  volumeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  volumeText: {
    fontSize: 16,
    marginRight: 10,
    color: 'white',
  },
});
