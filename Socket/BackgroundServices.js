import BackgroundService from 'react-native-background-actions';
import Sound from 'react-native-sound';
import socket from './Socket';
import {notificationHandler} from './Notification';
import AsyncStorage from '@react-native-async-storage/async-storage';

let ringtone;

const connectToSocket = async () => {
  const myuserid = JSON.parse(await AsyncStorage.getItem('userid'));
  console.log('===myuserid in background services===:', myuserid);

  socket.on('connect', () => {
    console.log('Socket connection opened for background service');
    socket.emit('register', myuserid);
  });

  socket.on('call', data => {
    console.log('Received call in socket oncall in background :', data);
    handleCall(data);
  });

  socket.on('chat message', data => {
    console.log('Received message in socket onmessage in background :', data);
    handleMessage(data);
  });

  socket.on('error', error => {
    console.error(error);
  });

  socket.on('disconnect', reason => {
    console.log('Socket disconnected:', reason);
  });
};

const handleMessage = data => {
  console.log('Received message in background :', data);
  notificationHandler(
    'Incoming Message',
    `You have an incoming message from ${data.sender.name}`,
    new Date(Date.now() + 15000),
    data,
  );
};

const handleCall = data => {
  console.log('Received call in background :', data);
  if (data.callaction === 'incoming') {
    // console.log('incoming :', data);
    notificationHandler(
      'Incoming Call',
      `You have an incoming call from ${data.caller.name}`,
      new Date(Date.now() + 15000),
      data,
    );
  } else if (data.callaction === 'incoming-rejected') {
    console.log('incoming-rejected :', data);
  }
};

const handleCallAccept = async data => {
  ringtone.stop();
  socket.emit('call', {...data, callaction: 'accepted'});

  try {
    // const token = await getToken(); // Assuming you have a function to get the token
    const finalData = {
      routeName: 'Call',
      params: {
        name: data?.reciever?.name.trim(),
        // token: token,
        meetingId: data.meetingId,
        micEnabled: true,
        webcamEnabled: data.type === 'video' ? true : false,
        isCreator: false,
        mode: 'CONFERENCE',
      },
    };
    // Navigate to the call screen with finalData
  } catch (error) {
    console.error('Error navigating to call screen:', error);
  }
};

const handleReject = data => {
  ringtone.stop();
  socket.emit('call', {...data, callaction: 'rejected'});
  console.log('Call rejected');
};

const socketInBackground = async () => {
  try {
    ringtone = new Sound('incoming.mp3', Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
    });

    await connectToSocket();

    // Stop the socket connection when BackgroundService is stopped
    await new Promise(resolve => {
      BackgroundService.on('stop', () => {
        if (socket) {
          // socket.disconnect();
        }
        ringtone.release();
        resolve();
      });
    });

    console.log('Background socket service stopped successfully! 1');
  } catch (error) {
    console.error('Error in socketInBackground:', error);
  }
};

const startBackgroundSocketService = async () => {
  if (BackgroundService.isRunning()) {
    return;
  }

  const options = {
    taskName: 'BackgroundSocketTask',
    taskTitle: 'Wooing Chat Service',
    taskDesc:
      'Wooing Chat is running in the background to provide seamless chat experience.',
    taskIcon: {
      name: 'ic_launcher',
      type: 'mipmap',
    },
    color: '#ff00ff',
    parameters: {
      delay: 1000, // Adjust the delay as needed
    },
    foregroundServiceType: 'dataSync',
  };

  try {
    await BackgroundService.start(() => socketInBackground(), options);
    console.log('Background socket service started successfully!');
  } catch (e) {
    console.error('Failed to start background socket service:', e);
  }
};

const stopBackgroundSocketService = async () => {
  try {
    await BackgroundService.stop();
    console.log('Background socket service stopped successfully! 2');
  } catch (e) {
    console.error('Failed to stop background socket service:', e);
  }
};

export {startBackgroundSocketService, stopBackgroundSocketService};
