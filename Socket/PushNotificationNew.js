import PushNotification, {Importance} from 'react-native-push-notification';

const createChannel = () => {
  PushNotification.createChannel(
    {
      channelId: '12345',
      channelName: 'Wooing Channel',
      channelDescription: 'A channel to categorize your notifications',
      playSound: true,
      soundName: 'default',
      importance: Importance.HIGH,
      vibrate: true,
    },
    created => console.log(`createChannel returned using app.js '${created}'`),
  );
};

const notificationHandler = (title, message, date) => {
  PushNotification.localNotificationSchedule({
    channelId: '12345',
    title: title,
    message: message,
    autoCancel: true,
    subText: 'Notification',
    vibrate: true,
    vibration: 300,
    playSound: true,
    soundName: 'default',
    ignoreInForeground: false,
    importance: 'high',
    invokeApp: true,
    allowWhileIdle: true,
    priority: 'high',
    visibility: 'public',
    date: date,
  });
};

const cancelNotifications = () => {
  PushNotification.cancelAllLocalNotifications();
};

export {createChannel, notificationHandler, cancelNotifications};
