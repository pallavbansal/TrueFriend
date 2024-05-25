import BackgroundService from 'react-native-background-actions';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import BackgroundTimer from 'react-native-background-timer';
import RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Platform} from 'react-native';

const audioRecorderPlayer = new AudioRecorderPlayer();
let recordingInterval = null;

const startRecording = async () => {
  try {
    const path = getRecordPath();
    const result = await audioRecorderPlayer.startRecorder(path);
    console.log('Recording started:', result);
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
  if (Platform.OS === 'ios') {
    return `${RNFS.DocumentDirectoryPath}/audio1_${timestamp}.m4a`;
  } else {
    return `${RNFS.ExternalDirectoryPath}/audio1_${timestamp}.mp3`;
  }
};

const sleep = time => new Promise(resolve => setTimeout(resolve, time));

const veryIntensiveTask = async taskDataArguments => {
  const {delay} = taskDataArguments;
  let autoSaveTime = await AsyncStorage.getItem('autoSaveTime');
  let time = 30 * 60 * 1000;

  if (autoSaveTime) {
    try {
      autoSaveTime = JSON.parse(autoSaveTime);
      time = parseInt(autoSaveTime) * 60 * 1000;
    } catch (error) {
      console.error('Error parsing autoSaveTime:', error);
    }
  }
  console.log('autoSaveTime in background services', time);

  await startRecording();

  recordingInterval = BackgroundTimer.setInterval(async () => {
    await stopRecording();
    await startRecording();
  }, time);

  await new Promise(async resolve => {
    while (BackgroundService.isRunning()) {
      await sleep(delay);
      console.log('Background service is running', delay);
    }
    resolve();
  });

  BackgroundTimer.clearInterval(recordingInterval);
  await stopRecording();
};

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
  BackgroundTimer.clearInterval(recordingInterval);
  await stopRecording();
  await BackgroundService.stop();
};

export {startBackgroundTask, stopBackgroundTask};
