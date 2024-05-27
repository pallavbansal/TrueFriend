import React, {useState, useEffect} from 'react';
import {colorData} from '../utils/colorData';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TrackPlayer from 'react-native-track-player';
import RNFS from 'react-native-fs';
import AnimatedIcon from './Common/AnimatedIcon';

const AudioCard = ({file, handlePlay, isPlaying, handleDelete}) => {
  const {name, size, mtime} = file;
  const formattedSize = (size / (1024 * 1024)).toFixed(2);
  const formattedDate = new Date(mtime).toLocaleString();
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const folderPath = `${RNFS.DownloadDirectoryPath}/TrueFriend`;
    const destPath = `${folderPath}/${file.name}`;

    RNFS.exists(destPath).then(exists => {
      setIsSaved(exists);
    });
  }, [file.name]);

  const saveFile = async () => {
    if (isSaved) {
      Alert.alert(
        'File already saved',
        'This file is already saved in the destination folder.',
      );
    } else {
      Alert.alert('Save File', 'Are you sure you want to save this file?', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            const folderPath = `${RNFS.DownloadDirectoryPath}/TrueFriend`;
            const destPath = `${folderPath}/${file.name}`;

            RNFS.exists(folderPath).then(exists => {
              if (!exists) {
                RNFS.mkdir(folderPath).then(() => {
                  console.log('Folder created');
                });
              }
            });

            RNFS.copyFile(file.path, destPath)
              .then(() => {
                console.log('File saved');
                setIsSaved(true);
              })
              .catch(err => console.error('Error saving file:', err));
          },
        },
      ]);
    }
  };

  const setTrack = async () => {
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
        {backgroundColor: isPlaying ? colorData.back2 : colorData.back1},
      ]}
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
      <View style={{flexDirection: 'column', flex: 1, gap: 8}}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.details}>
          {formattedDate} - {formattedSize} MB
        </Text>
      </View>
      <View style={{flexDirection: 'column', gap: 4}}>
        <MaterialIcons
          name="delete"
          size={28}
          color="white"
          onPress={() => handleDelete(file)}
        />
        {isSaved ? (
          <MaterialCommunityIcons
            name="content-save-check"
            size={28}
            color="white"
            onPress={() =>
              Alert.alert(
                'File already saved',
                'This file is already saved in the destination folder.',
              )
            }
          />
        ) : (
          <MaterialIcons
            name="save"
            size={26}
            color="white"
            onPress={saveFile}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
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
