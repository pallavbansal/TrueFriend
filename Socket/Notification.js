import PushNotification, {Importance} from 'react-native-push-notification';

const createChannel = () => {
  PushNotification.createChannel(
    {
      channelId: '1234',
      channelName: 'My channel',
      channelDescription: 'A channel to categorize your notifications',
      playSound: false,
      soundName: 'default',
      importance: Importance.HIGH,
      vibrate: true,
    },
    created => console.log(`createChannel returned '${created}'`),
  );
};

const notificationHandler = (title, message, date, callData) => {
  PushNotification.localNotification({
    channelId: '1234',
    title: title,
    message: message,
    autoCancel: true,
    subText: 'Notification',
    vibrate: true,
    vibration: 300,
    playSound: true,
    soundName: 'default',
    ignoreInForeground: true,
    importance: 'high',
    invokeApp: true,
    allowWhileIdle: true,
    priority: 'high',
    visibility: 'public',
    date: date,
    userInteraction: true, // Enable user interaction
    data: callData, // Pass the call data as notification data
  });
};

const cancelNotifications = () => {
  PushNotification.cancelAllLocalNotifications();
};

export {createChannel, notificationHandler, cancelNotifications};
