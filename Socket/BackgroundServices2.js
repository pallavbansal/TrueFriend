import BackgroundService from 'react-native-background-actions';
import {Linking, Notifications} from 'react-native';
import socket from './Socket';

// Import your socket library and initialize it
// import Socket from 'your-socket-library';
// const socket = new Socket('https://your-socket-server.com');

// Register event handlers for socket events
// socket.on('call', handleCallEvent);
// socket.on('message', handleMessageEvent);

// Function to handle call event
const handleCallEvent = async data => {
  console.log('handleCallEvent', data);
  // const {name, image, type} = data;

  // Show notification for incoming call
  const callNotification = new Notifications.Notification()
    .setTitle(`Incoming  Call`)
    .setBody(`From: Vivek`)
    .setSound('default')
    .setData({type: 'call', data});

  // Display the notification
  Notifications.showNotification(callNotification);
};

// Function to handle message event
const handleMessageEvent = async data => {
  // const {name, message} = data;

  // Show notification for new message
  const messageNotification = new Notifications.Notification()
    .setTitle('New Message')
    .setBody(`From: Vivek`)
    .setSound('default')
    .setData({type: 'message', data});

  // Display the notification
  Notifications.showNotification(messageNotification);
};

// Background task to keep the socket connection alive
const backgroundTask = async () => {
  // Connect to the socket server
  // await socket.connect();

  // Keep the background task running indefinitely
  while (BackgroundService.isRunning()) {
    // Add any other background logic here
    // ...
    console.log('Background service is running...');
    socket.on('call', handleCallEvent);
    socket.on('message', handleMessageEvent);
  }
};

// Start the background service
export const startBackgroundSocketService = async () => {
  console.log('Starting background service...');
  try {
    await BackgroundService.start(backgroundTask, {
      taskName: 'SocketService',
      taskTitle: 'Socket Service',
      taskDesc: 'Keeping socket connection alive',
      linkingURI: 'yourapp://open', // Deep linking URI
      taskIcon: {
        name: 'ic_launcher',
        type: 'mipmap',
      },
    });
  } catch (error) {
    console.error('Error starting background service:', error);
  }
};

// Stop the background service
export const stopBackgroundSocketService = async () => {
  console.log('Stopping background service...');
  try {
    await BackgroundService.stop();
  } catch (error) {
    console.error('Error stopping background service:', error);
  }
};

// Handle incoming deep links
Linking.addEventListener('url', event => {
  const {url} = event;
  if (url.startsWith('yourapp://open')) {
    // Open the app when the notification is clicked
    // You can navigate to a specific screen or perform any other action here
  }
});
