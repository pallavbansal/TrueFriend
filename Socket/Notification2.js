// import PushNotification from 'react-native-push-notification';

// PushNotification.createChannel(
//   {
//     channelId: '12345', // Change this to a unique channel ID
//     channelName: 'Wooing Channel',
//     channelDescription: 'A brief description of the channel',
//     playSound: true,
//     soundName: 'default',
//     importance: 4,
//   },
//   created =>
//     console.log(
//       `createChannel returned in background---------------- '${created}'`,
//     ),
// );

// const sendIncomingCallNotification = callerName => {
//   PushNotification.localNotification({
//     channelId: '12345',
//     title: 'Incoming Call',
//     message: 'Incoming call from ' + callerName,
//     actions: ['Answer', 'Decline'],
//   });
// };

// const handleNotification = notification => {
//   // Handle notification based on its action
//   if (notification.action === 'Answer') {
//     // Navigate to a specific screen upon tapping Answer
//     // For example, you can use navigation.navigate('YourScreenName')
//     // Replace 'YourScreenName' with the actual screen you want to navigate to
//   } else if (notification.action === 'Decline') {
//     // Handle Decline action if needed
//   }
// };

// PushNotification.configure({
//   // Called when a remote or local notification is opened or received
//   onNotification: handleNotification,
// });

// export {sendIncomingCallNotification};
