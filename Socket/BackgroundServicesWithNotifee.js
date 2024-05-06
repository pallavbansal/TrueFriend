import BackgroundService from 'react-native-background-actions';
import notifee, {AndroidImportance} from '@notifee/react-native';
import socket from './Socket';

async function onDisplayNotification(title, message) {
  // Request permissions (required for iOS)

  await notifee.requestPermission();

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    vibration: true,
    sound: 'default',
    importance: AndroidImportance.HIGH,
  });

  // Display a notification
  await notifee.displayNotification({
    title: title,
    body: message,
    android: {
      channelId,
      importance: AndroidImportance.HIGH,
      pressAction: {
        id: 'default',
      },
    },
  });
}

const sleep = time => new Promise(resolve => setTimeout(() => resolve(), time));

const veryIntensiveTask = async taskDataArguments => {
  console.log(
    'taskDataArguments:============================',
    taskDataArguments,
  );
  const {delay} = taskDataArguments;

  socket.connect();

  socket.on('chat message', data => {
    console.log(
      'Received message in background :====================================',
      data,
    );
    if (data.sender.sender == false) {
      console.log(
        'Received message in background in:====================================',
      );
      onDisplayNotification(
        'Incoming Message',
        'New message from ' + data.sender.name,
      );
    }
  });

  socket.on('call', data => {
    console.log(
      'Received call in background :========================================',
      data,
    );
    if (data.callaction == 'incoming') {
      console.log(
        'Received call in background in:====================================',
      );
      onDisplayNotification('Incoming Call', 'Call from ' + data.caller.name);
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
