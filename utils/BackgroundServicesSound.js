import BackgroundService from 'react-native-background-actions';
import AudioRecord from 'react-native-audio-record';
import BackgroundTimer from 'react-native-background-timer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {check, request, PERMISSIONS} from 'react-native-permissions';
import {PermissionsAndroid} from 'react-native';
import RNFS from 'react-native-fs';

let recordingInterval = null;

const initAudioRecord = () => {
  const options = {
    sampleRate: 16000,
    channels: 1,
    bitsPerSample: 16,
    audioSource: 6, // Android only
    wavFile: 'audio3.wav',
  };

  AudioRecord.init(options);
};

const saveRecordedAudio = async (audioFile, fileName) => {
  try {
    const externalStorageDir = `${RNFS.ExternalDirectoryPath}`;
    await RNFS.mkdir(externalStorageDir, {recreate: true});
    const destPath = `${externalStorageDir}/${fileName}`;
    await RNFS.copyFile(audioFile, destPath);
    console.log(`Audio file saved to ${destPath}`);
  } catch (error) {
    console.error('Failed to save audio file:', error);
  }
};

const startRecording = async () => {
  // console.log(
  //   'Saving audio file:',
  //   RNFS.ExternalStorageDirectoryPath,
  //   RNFS.DocumentDirectoryPath,
  //   RNFS.DownloadDirectoryPath,
  //   RNFS.PicturesDirectoryPath,
  //   RNFS.ExternalDirectoryPath,
  // );
  try {
    initAudioRecord();
    AudioRecord.start();
    console.log('Recording started');
  } catch (error) {
    console.error('Failed to start recording:', error);
  }
};

const stopRecording = async () => {
  try {
    const audioFile = await AudioRecord.stop();
    console.log('Recording stopped:', audioFile);
    const timestamp = Date.now();
    const name = `audio2_${timestamp}.wav`;
    await saveRecordedAudio(audioFile, name);
  } catch (error) {
    console.error('Failed to stop recording:', error);
    return null;
  }
};

const veryIntensiveTask = async taskDataArguments => {
  const {delay} = taskDataArguments;
  const autoSaveTime = await AsyncStorage.getItem('autoSaveTime');
  let time = 30 * 60 * 1000; // Default 30 minutes
  if (autoSaveTime) {
    const data = JSON.parse(autoSaveTime);
    time = parseInt(data) * 60 * 1000;
  }
  console.log('autoSaveTime in background services:', time);

  await startRecording();

  recordingInterval = BackgroundTimer.setInterval(async () => {
    await stopRecording();
    await startRecording();
  }, time);

  await new Promise(async resolve => {
    for (let i = 0; BackgroundService.isRunning(); i++) {
      console.log(i);
      await sleep(delay);
    }
  });

  BackgroundTimer.clearInterval(recordingInterval);
  await stopRecording();
};

const sleep = time => new Promise(resolve => setTimeout(resolve, time));

const startBackgroundTask = async () => {
  if (BackgroundService.isRunning()) {
    console.log('Background service is already running');
    return;
  }

  const options = {
    taskName: 'PermanentRecording',
    taskTitle: 'Permanent Recording',
    taskDesc: 'Recording audio in the background',
    taskIcon: {
      name: 'ic_launcher',
      type: 'mipmap',
    },
    color: '#ff00ff',
    parameters: {
      delay: 1000,
    },
  };

  await BackgroundService.start(veryIntensiveTask, options);
};

const stopBackgroundTask = async () => {
  // Stop the recording
  if (recordingInterval) {
    BackgroundTimer.clearInterval(recordingInterval);
  }
  await stopRecording();

  // Stop the background service
  await BackgroundService.stop();
};

export {startBackgroundTask, stopBackgroundTask};
