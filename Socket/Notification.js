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

// const notificationHandler = (title, message, date) => {
//   PushNotification.localNotification({
//     channelId: '1234',
//     title: title,
//     message: message,
//     autoCancel: true,
//     subText: 'Notification',
//     vibrate: true,
//     vibration: 300,
//     playSound: true,
//     soundName: 'default',
//     ignoreInForeground: false,
//     importance: 'high',
//     invokeApp: true,
//     allowWhileIdle: true,
//     priority: 'high',
//     visibility: 'public',
//     date: date,
//     actions: ['Accept', 'Reject'],
//   });
// };
const notificationHandler = (title, message, date) => {
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
