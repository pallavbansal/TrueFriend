import React, {useState} from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Modal} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RecordingDetails from '../Screen/RecordingDetails';
import TrackPlayer, {
  useActiveTrack,
  useIsPlaying,
} from 'react-native-track-player';
import {colorData} from '../utils/colorData';

const AudioPlayer = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const activeTrack = useActiveTrack();
  const isPlaying = useIsPlaying();
  if (!activeTrack) return null;

  const togglePlayback = async () => {
    if (isPlaying.playing) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
  };

  const closePlayer = async () => {
    await TrackPlayer.reset();
  };

  return (
    <TouchableOpacity
      style={styles.playerContainer}
      onPress={() => {
        setModalVisible(true);
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
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
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <RecordingDetails />
      </Modal>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  playerContainer: {
    flexDirection: 'column',
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
