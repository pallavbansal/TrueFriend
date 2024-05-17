import React, {useState} from 'react';
import {colorData} from '../utils/colorData';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TouchableHighlight,
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TrackPlayer from 'react-native-track-player';
import AnimatedIcon from './Common/AnimatedIcon';

const AudioCard = ({file, handlePlay, isPlaying, handleDelete}) => {
  const {name, size, mtime} = file;

  const formattedSize = (size / (1024 * 1024)).toFixed(2);
  const formattedDate = new Intl.DateTimeFormat('default', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(mtime));

  const setTrack = async () => {
    // await TrackPlayer.add({
    //   id: file.path,
    //   url: `file://${file.path}`,
    //   title: file.name,
    //   artist: 'Unknown',
    // });
    await TrackPlayer.load({
      id: file.path,
      url: `file://${file.path}`,
      title: file.name,
      artist: 'Unknown',
    });
    await TrackPlayer.play();
    handlePlay(file);
  };

  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: isPlaying ? colorData.back2 : colorData.back1,
        },
      ]}
      // onPress={() => handlePlay(file)}
      onPress={setTrack}>
      <View
        style={{
          backgroundColor: 'white',
          borderRadius: 50,
          padding: 2,
          marginRight: 10,
        }}>
        <AnimatedIcon
          source={require('../assets/icons/music-note.json')}
          width={40}
          height={40}
          autoPlay={isPlaying}
          loop={isPlaying}
        />
      </View>
      <View
        style={{
          flexDirection: 'column',
          flex: 1,
          gap: 8,
        }}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.details}>
          {formattedDate} - {formattedSize} MB
        </Text>
      </View>
      <View>
        <MaterialIcons
          name="delete"
          size={30}
          color="white"
          onPress={() => handleDelete(file)}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    margin: 5,
    backgroundColor: colorData.back1,
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AudioCard;
