import React, {useEffect, useState} from 'react';
import {colorData} from '../utils/colorData';
import {View, Text, StyleSheet, FlatList, Alert} from 'react-native';
import AudioCard from '../Components/AudioCard';
import NoData from '../Components/NoData';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TrackPlayer, {useActiveTrack} from 'react-native-track-player';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFS from 'react-native-fs';

const Recordings = () => {
  const activeTrack = useActiveTrack();
  const [recordings, setRecordings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    loadRecordings();
  }, []);

  const loadRecordings = async () => {
    try {
      setLoading(true);
      let time = 2 * 24 * 60 * 60 * 1000; // default time
      const savedDeleteTime = await AsyncStorage.getItem('autoDeleteTime');
      if (savedDeleteTime) {
        time = JSON.parse(savedDeleteTime) * 24 * 60 * 60 * 1000;
      }
      const files = await RNFS.readDir(RNFS.ExternalDirectoryPath);
      const now = Date.now();

      const audioFiles = files.filter(file => {
        if (file.name.endsWith('.mp3')) {
          // Check if the file is older than the specified time
          if (now - new Date(file.mtime).getTime() > time) {
            // Delete the file
            RNFS.unlink(file.path)
              .then(() => console.log(`Deleted ${file.name}`))
              .catch(err =>
                console.error(`Failed to delete ${file.name}:`, err),
              );
            return false;
          }
          return true;
        }
        return false;
      });

      setRecordings(audioFiles);
    } catch (error) {
      console.error('Failed to load recordings:', error);
    } finally {
      setLoading(false);
    }
  };
  const handlePlay = file => {
    console.log('Playing:', file);
    if (selectedFile && selectedFile.path === file.path) {
      setSelectedFile(null);
      return;
    }
    setSelectedFile(file);
  };

  const deleteRecording = async path => {
    try {
      await RNFS.unlink(path);
      loadRecordings();
      if (activeTrack && activeTrack.id === path) {
        await TrackPlayer.reset();
      }
    } catch (error) {
      console.error('Failed to delete recording:', error);
    }
  };

  const handleDelete = file => {
    Alert.alert(
      'Delete Recording',
      'Are you sure you want to delete this recording?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {text: 'OK', onPress: () => deleteRecording(file.path)},
      ],
    );
  };

  const handleAllDelete = () => {
    Alert.alert(
      'Delete All Recordings',
      'Are you sure you want to delete all recordings?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            try {
              await Promise.all(recordings.map(file => RNFS.unlink(file.path)));
              loadRecordings();
              if (activeTrack) {
                await TrackPlayer.reset();
              }
            } catch (error) {
              console.error('Failed to delete recordings:', error);
            }
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Recordings</Text>
        <View>
          <MaterialIcons
            name="delete"
            size={26}
            color="white"
            onPress={() => handleAllDelete()}
          />
        </View>
      </View>

      {recordings.length === 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
          }}>
          <NoData isloading={loading} />
        </View>
      ) : (
        <View
          style={{
            marginBottom: 120,
            alignItems: recordings > 2 ? 'center' : 'stretch',
            width: '100%',
            height: '100%',
            paddingBottom: 70,
          }}>
          <FlatList
            data={recordings}
            keyExtractor={item => item.path}
            renderItem={({item}) => (
              <AudioCard
                file={item}
                handlePlay={handlePlay}
                handleDelete={handleDelete}
                isPlaying={selectedFile && selectedFile.path === item.path}
              />
            )}
            contentContainerStyle={{paddingBottom: 200}}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colorData.back2,
    padding: 12,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  title: {
    fontSize: 20,
    marginLeft: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Recordings;
