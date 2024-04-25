import {useSelector} from 'react-redux';
import {AppState} from 'react-native';
import React, {useEffect, useState} from 'react';
import socket from '../../Socket/Socket';

const NotificationHandler = ({children}) => {
  const myuserid = useSelector(state => state.Auth.userid);
  const [background, setBackground] = useState(false);

  useEffect(() => {
    const handleAppStateChange = nextAppState => {
      if (nextAppState === 'active') {
        setBackground(false);
      } else if (nextAppState === 'background') {
        setBackground(true);
      }
    };
    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );
    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    const handleCall = data => {
      // console.log('Received call in notification handler 1:', data);
      if (background) {
        console.log('Received call in notification handler 2 :', data);
      }
    };
    socket.on('call', handleCall);
    return () => {
      socket.off('call', handleCall);
    };
  }, [background]);

  return <>{children}</>;
};

export default NotificationHandler;
