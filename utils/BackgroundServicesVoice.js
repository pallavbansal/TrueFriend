import BackgroundService from 'react-native-background-actions';
import Voice from '@react-native-voice/voice';
import BackgroundTimer from 'react-native-background-timer';
import RNFS from 'react-native-fs';
import AsyncStorage from '@react-native-async-storage/async-storage';

let recordingInterval = null;

const startRecording = async () => {
  try {
    const path = getRecordPath();
    await Voice.start(path);
    console.log('Recording started');
  } catch (error) {
    console.error('Failed to start recording:', error);
  }
};

const stopRecording = async () => {
  try {
    await Voice.stop();
    console.log('Recording stopped');
  } catch (error) {
    console.error('Failed to stop recording:', error);
  }
};

const getRecordPath = () => {
  const timestamp = Date.now();
  if (Platform.OS === 'ios') {
    return `${RNFS.DocumentDirectoryPath}/audio2_${timestamp}.m4a`;
  } else {
    return `${RNFS.ExternalDirectoryPath}/audio2_${timestamp}.mp3`;
  }
};

const veryIntensiveTask = async taskDataArguments => {
  const {delay} = taskDataArguments;
  const autoSaveTime = await AsyncStorage.getItem('autoSaveTime');
  let time = 30 * 60 * 1000;
  if (autoSaveTime) {
    const data = JSON.parse(autoSaveTime);
    time = parseInt(data) * 60 * 1000;
  }
  console.log('autoSaveTime in background services', time);
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

const sleep = time => new Promise(resolve => setTimeout(() => resolve(), time));

const startBackgroundTask = async () => {
  if (BackgroundService.isRunning()) {
    console.log('Background service is already running');
    return;
  }

  const options = {
    taskName: 'PermanentRecording',
    taskTitle: 'Permanent Recording',
    taskDesc: 'Recording audio in the background',
    taskIcon: {name: 'ic_launcher', type: 'mipmap'},
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
