import BackgroundService from 'react-native-background-actions';
import PushNotification, {Importance} from 'react-native-push-notification';
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
  const {delay} = taskDataArguments;

  // Connect to the socket
  socket.connect();

  socket.on('connect', () => {
    console.log('Socket connected');
  });

  socket.on('chat message', data => {
    console.log(
      'Received message in background :====================================',
      data,
    );
    PushNotification.localNotification({
      channelId: '12345',
      title: 'New Message',
      message: 'New message from ' + data.sender.name,
    });
  });

  socket.on('call', data => {
    console.log(
      'Received call in background :========================================',
      data,
    );
    if (data.callaction == 'incoming') {
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
    taskTitle: 'ExampleTask title',
    taskDesc: 'ExampleTask description',
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
