// socket.js
import io from 'socket.io-client';
import {SOCKET_URL} from '@env';
const socket = io.connect(SOCKET_URL);
// const socket = io('http://192.168.213.181:3000');
export default socket;
