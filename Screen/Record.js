import React, {useState, useEffect} from 'react';
import {View, Text, Button, StyleSheet, Platform} from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import BackgroundTimer from 'react-native-background-timer';
import RNFS from 'react-native-fs';

const audioRecorderPlayer = new AudioRecorderPlayer();

const Record = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordPath, setRecordPath] = useState(null);

  useEffect(() => {
    // Start background timer for periodic saving
    BackgroundTimer.runBackgroundTimer(() => {
      saveRecordedAudio();
    }, 30 * 60 * 1000); // Save every 30 minutes

    return () => {
      // Clear background timer on unmount
      BackgroundTimer.stopBackgroundTimer();
    };
  }, []);

  const startRecording = async () => {
    try {
      const path = getRecordPath();
      const result = await audioRecorderPlayer.startRecorder(path);
      setIsRecording(true);
      setRecordPath(path);
      console.log(result);
    } catch (error) {
      console.error('Failed to start recording:', error);
    }
  };

  const stopRecording = async () => {
    try {
      const result = await audioRecorderPlayer.stopRecorder();
      setIsRecording(false);
      console.log(result);
    } catch (error) {
      console.error('Failed to stop recording:', error);
    }
  };

  const saveRecordedAudio = () => {
    // Implement logic to save recorded audio periodically
    console.log('Saving recorded audio...');
    if (recordPath) {
      // Copy recorded audio to a permanent location
      const permanentPath = `${
        RNFS.DocumentDirectoryPath
      }/recorded_audio_${Date.now()}.m4a`;
      RNFS.copyFile(recordPath, permanentPath)
        .then(() => {
          console.log('Recorded audio saved successfully:', permanentPath);
          // Optionally, you can delete the temporary recorded audio
          RNFS.unlink(recordPath)
            .then(() => console.log('Temporary recorded audio deleted.'))
            .catch(error =>
              console.error(
                'Failed to delete temporary recorded audio:',
                error,
              ),
            );
        })
        .catch(error => console.error('Failed to save recorded audio:', error));
    }
  };

  const getRecordPath = () => {
    const timestamp = Date.now();
    if (Platform.OS === 'ios') {
      return `${RNFS.DocumentDirectoryPath}/audio_${timestamp}.m4a`;
    } else {
      return `${RNFS.ExternalDirectoryPath}/audio_${timestamp}.mp3`;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isRecording ? 'Recording...' : 'Not recording'}
      </Text>
      <Button
        title={isRecording ? 'Stop Recording' : 'Start Recording'}
        onPress={isRecording ? stopRecording : startRecording}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default Record;
