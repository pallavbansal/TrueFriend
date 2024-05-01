import BackgroundService from 'react-native-background-actions';
import PushNotification, {Importance} from 'react-native-push-notification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import socket from './Socket';

PushNotification.createChannel(
  {
    channelId: '12345',
    channelName: 'Wooing Channel',
    channelDescription: 'A brief description of the channel',
    playSound: true,
    soundName: 'default',
    importance: Importance.HIGH,
  },
  created =>
    console.log(
      `createChannel returned in background---------------- '${created}'`,
    ),
);

const sleep = time => new Promise(resolve => setTimeout(() => resolve(), time));

const veryIntensiveTask = async taskDataArguments => {
  console.log(
    'taskDataArguments:============================',
    taskDataArguments,
  );
  const {delay} = taskDataArguments;

  // Fetch userId from AsyncStorage once
  const userid = JSON.parse(await AsyncStorage.getItem('userid'));

  // Connect to the socket
  socket.connect();

  socket.on('connect', () => {
    socket.emit('register', userid, response => {
      console.log('Registration response in background services:', response);
    });
  });

  socket.on('chat message', data => {
    console.log(
      'Received message in background :====================================',
      data,
    );
    if (userid && data.sender_id !== userid) {
      console.log(
        'Received message in background in:====================================',
      );
      PushNotification.localNotification({
        channelId: '12345',
        title: 'New Message',
        message: 'New message from ' + data.sender.name,
      });
    }
  });

  socket.on('call', data => {
    console.log(
      'Received call in background :========================================',
      data,
    );
    if (userid && data.callaction == 'incoming') {
      PushNotification.localNotification({
        channelId: '12345',
        title: 'Incoming Call',
        message: 'Incoming call from ' + data.caller.name,
        // actions: ['Answer', 'Decline'],
      });
    }
  });

  await new Promise(async resolve => {
    for (let i = 0; BackgroundService.isRunning(); i++) {
      console.log(i);
      await sleep(delay);
    }
  });

  socket.disconnect();
};

const startBackgroundTask = async () => {
  if (BackgroundService.isRunning()) {
    console.log('Background service is already running');
    return;
  }

  const options = {
    taskName: 'Example',
    taskTitle: 'Wooing',
    taskDesc: 'Wooing Notifications Services',
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
  await BackgroundService.updateNotification({
    taskDesc: 'New ExampleTask description',
  });
};

const stopBackgroundTask = async () => {
  await BackgroundService.stop();
};

export {startBackgroundTask, stopBackgroundTask};
