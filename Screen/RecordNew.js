import React, {useState, useEffect} from 'react';
import {View, Button, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {
  check,
  request,
  openSettings,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import RNFS from 'react-native-fs';
import {colorData} from '../utils/colorData';

const audioRecorderPlayer = new AudioRecorderPlayer();

const RecordNew = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordPath, setRecordPath] = useState('');

  const handleStartRecording = async () => {
    try {
      const granted = await check(PERMISSIONS.ANDROID.RECORD_AUDIO);

      if (granted === RESULTS.GRANTED) {
        console.log('Microphone permission granted');
        const path = await startRecording();
        setRecordPath(path);
        setIsRecording(true);
      } else {
        console.log('Microphone permission denied');
        const requestedPermission = await request(
          PERMISSIONS.ANDROID.RECORD_AUDIO,
        );

        if (requestedPermission === RESULTS.GRANTED) {
          console.log('Microphone permission granted after request');
          const path = await startRecording();
          setRecordPath(path);
          setIsRecording(true);
        } else if (requestedPermission === RESULTS.DENIED) {
          console.log('Microphone permission denied after request');
        } else if (requestedPermission === RESULTS.BLOCKED) {
          console.log('Microphone permission blocked, opening settings');
          openSettings().catch(() => console.warn('Cannot open settings'));
        }
      }
    } catch (error) {
      console.error('Error checking microphone permission:', error);
    }
  };

  const handleStopRecording = async () => {
    try {
      await stopRecording();
      setIsRecording(false);
      setRecordPath('');
    } catch (error) {
      console.error('Failed to stop recording:', error);
    }
  };

  const startRecording = async () => {
    try {
      const path = getRecordPath();
      await audioRecorderPlayer.startRecorder(path);
      console.log('Recording started at:', path);
      return path;
    } catch (error) {
      console.error('Failed to start recording:', error);
    }
  };

  const stopRecording = async () => {
    try {
      const result = await audioRecorderPlayer.stopRecorder();
      console.log('Recording stopped:', result);
    } catch (error) {
      console.error('Failed to stop recording:', error);
    }
  };

  const getRecordPath = () => {
    const timestamp = Date.now();
    return `${RNFS.ExternalDirectoryPath}/audio_${timestamp}.mp3`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Record</Text>
      </View>
      <View style={styles.content}>
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: isRecording
                ? colorData.danger
                : colorData.success,
            },
          ]}
          onPress={isRecording ? handleStopRecording : handleStartRecording}>
          <Ionicons
            name={isRecording ? 'pause' : 'play'}
            size={24}
            color="white"
          />
          <Text style={styles.buttonText}>
            {isRecording ? 'Stop Recording' : 'Start Recording'}
          </Text>
        </TouchableOpacity>
        {recordPath ? (
          <Text style={styles.recordedText}>
            Recorded audio saved at: {recordPath}
          </Text>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: colorData.back2,
    padding: 12,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 20,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 16,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 10,
  },
  recordedText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 20,
  },
});

export default RecordNew;
