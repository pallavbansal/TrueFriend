import React, {useEffect, useState} from 'react';
import {colorData} from '../utils/colorData';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import AudioCard from '../Components/AudioCard';
import NoData from '../Components/NoData';
import RNFS from 'react-native-fs';
import AudioPlayer from '../Components/AudioPlayer';

const Recordings = () => {
  const [recordings, setRecordings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    loadRecordings();
  }, []);

  const loadRecordings = async () => {
    try {
      setLoading(true);
      const files = await RNFS.readDir(RNFS.ExternalDirectoryPath);
      const audioFiles = files.filter(file => file.name.endsWith('.mp3'));
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Recordings</Text>
      </View>

      {/* {selectedFile && (
        <View
          style={{
            paddingHorizontal: 10,
            marginTop: 10,
          }}>
          <AudioPlayer />
        </View>
      )} */}

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
            // padding: 5,
            paddingBottom: 70,
          }}>
          <FlatList
            data={recordings}
            keyExtractor={item => item.path}
            renderItem={({item}) => (
              <AudioCard
                file={item}
                handlePlay={handlePlay}
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
    backgroundColor: colorData.back2,
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 20,
    marginLeft: 20,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Recordings;
