// socket.js
import io from 'socket.io-client';
const socket = io('http://wooing-chat.onrender.com');
// const socket = io('http://192.168.213.181:3000');
export default socket;
