import BackgroundService from 'react-native-background-actions';
import io from 'socket.io-client';
import {getToken} from '../Utils/Streamapi';
import Sound from 'react-native-sound';
import socket from './Socket';
import {notificationHandler} from './Notification';
import {NavigationActions} from 'react-navigation';

// let socket;
let ringtone;
const friendsdata = [
  {
    id: 7,
    name: 'Jhon Doe',
    type: 'single',
    liked: true,
    imageUrl:
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    unseenmsg: 0,
  },
  {
    id: 44,
    name: 'Vivek',
    type: 'single',
    imageUrl:
      'https://images.unsplash.com/photo-1613521140785-e85e427f8002?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    unseenmsg: 0,
  },
  {
    id: 45,
    name: 'Vivek 2',
    type: 'single',
    liked: true,
    imageUrl:
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    unseenmsg: 0,
  },
  {
    id: 56,
    name: 'Jhon',
    type: 'single',
    imageUrl:
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    liked: true,
    unseenmsg: 0,
  },
  {
    id: 200,
    name: 'Friends Group',
    type: 'group',
    grouproomid: '123',
    imageUrl:
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    unseenmsg: 0,
  },
];
const myuserid = 56;

const connectToSocket = async () => {
  // socket = io('http://wooing-chat.onrender.com');

  socket.on('connect', () => {
    console.log('Socket connection opened for background service');
    friendsdata.map(item => {
      if (item.type === 'single') {
        const roomid = [myuserid, item.id].sort().join('_');
        item.roomid = roomid;
        socket.emit('join room', roomid);
      } else {
        socket.emit('join room', item.grouproomid);
      }
    });
  });

  socket.on('call', data => {
    console.log('Received call in socket oncall in background :', data);
    handleCall(data);
  });

  socket.on('error', error => {
    console.error(error);
  });

  socket.on('disconnect', reason => {
    console.log('Socket disconnected:', reason);
  });
};

const handleCall = data => {
  console.log('Received call in background :', data);
  if (data.callaction === 'incoming') {
    console.log('incoming :', data);
    // ringtone.setVolume(1);
    // ringtone.play();
    const timeoutId = setTimeout(() => handleReject(data), 15000);

    notificationHandler(
      'Incoming Call',
      `You have an incoming call from ${data.caller.name}`,
      new Date(Date.now() + 15000),
    );

    return () => clearTimeout(timeoutId);
  }
};

const handleCallAccept = async data => {
  ringtone.stop();
  socket.emit('call', {...data, callaction: 'accepted'});

  try {
    const token = await getToken();
    const navigateAction = NavigationActions.navigate({
      routeName: 'Call',
      params: {
        name: data?.reciever?.name.trim(),
        token: token,
        meetingId: data.meetingId,
        micEnabled: true,
        webcamEnabled: data.type === 'video' ? true : false,
        isCreator: false,
        mode: 'CONFERENCE',
      },
    });
    NavigationService.dispatch(navigateAction);
  } catch (error) {
    console.error('Error navigating to call screen:', error);
    // Handle error if navigation fails
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
          socket.disconnect();
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
    console.log('Background socket service is already running');
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
