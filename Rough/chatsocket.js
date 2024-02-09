// useEffect(() => {
//   console.log('socket', socket.connected);
//   // const socket = io('http://192.168.175.60:3000');
//   socket.on('connect', () => {
//     const roomid = [myuserid, userid].sort().join('_');
//     console.log('roomid', roomid);
//     if (chattype == 'group') {
//       socket.emit('join room', grouproomid);
//     } else {
//       socket.emit('join room', roomid);
//     }
//   });

//   socket.on('chat message', msg => {
//     console.log('message recieved', msg);
//     setMessageData(prev => {
//       return [...prev, msg];
//     });
//   });

//   // return () => {
//   //   socket.disconnect();
//   // };
// }, [userid]);

useEffect(() => {
  // const joinRoom = () => {
  //   const roomid = [myuserid, userid].sort().join('_');
  //   if (chattype == 'group') {
  //     socket.emit('join room', grouproomid);
  //   } else {
  //     socket.emit('join room', roomid);
  //   }
  // };

  // if (socket.connected) {
  //   joinRoom();
  // } else {
  //   socket.on('connect', joinRoom);
  // }

  socket.on('chat message', msg => {
    console.log('message recieved', msg);
    setMessageData(prev => {
      return [...prev, msg];
    });
  });
}, []);
