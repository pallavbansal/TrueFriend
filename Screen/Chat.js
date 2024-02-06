import {View, StyleSheet, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import GradientScreen from '../Layouts/GradientScreen';
import {colors} from '../Styles/ColorData';
import Message from '../Components/Chat/Message';
import ChatHeader from '../Components/Chat/ChatHeader';
import ChatBottom from '../Components/Chat/ChatBottom';
import {useSelector} from 'react-redux';
import io from 'socket.io-client';
const socket = io('http://192.168.205.98:3000');

// const MessageDatatemp = [
//   {
//     id: '1',
//     type: 'text',
//     message:
//       'Hello dndi knoe kdmld omsld ddd dm odd modm w dkfed fmde dfle djfode demdoedd  dled e dfmew kdmfe mfel dfmled lfe flm',
//     senderid: '7',
//     senderName: 'You',
//     receiverid: '2',
//     time: '10:00 AM',
//   },
//   {
//     id: '2',
//     type: 'text',
//     message: 'Hi',
//     senderid: '2',
//     senderName: 'Rahul Singh',
//     receiverid: '1',
//     time: '10:00 PM',
//   },
//   {
//     id: '3',
//     type: 'text',
//     message: 'How are you?',
//     senderid: '7',
//     senderName: 'You',
//     receiverid: '2',
//     time: '10:00 AM',
//   },
//   {
//     id: '4',
//     type: 'text',
//     message: 'I am fine',
//     senderid: '2',
//     senderName: 'Rahul Singh',
//     receiverid: '7',
//     time: '10:00 PM',
//   },
//   {
//     id: '5',
//     type: 'text',
//     message: 'What about you?',
//     senderid: '2',
//     senderName: 'Rahul Singh',
//     receiverid: '7',
//     time: '10:00 AM',
//   },
//   {
//     id: '6',
//     type: 'text',
//     message: 'I am fine',
//     senderid: '7',
//     senderName: 'You',
//     receiverid: '2',
//     time: '10:00 PM',
//   },
//   {
//     id: '7',
//     type: 'text',
//     message: 'What about you?',
//     senderid: '7',
//     senderName: 'You',
//     receiverid: '2',
//     time: '10:00 AM',
//   },
//   {
//     id: '8',
//     type: 'text',
//     message: 'I am fine',
//     senderid: '2',
//     senderName: 'Rahul Singh',
//     receiverid: '7',
//     time: '10:00 PM',
//   },
//   {
//     id: '9',
//     type: 'text',
//     message: 'What about you?',
//     senderid: '2',
//     senderName: 'Rahul Singh',
//     receiverid: '7',
//     time: '10:00 AM',
//   },
//   {
//     id: '10',
//     type: 'text',
//     message: 'I am fine',
//     senderid: '7',
//     senderName: 'You',
//     receiverid: '2',
//     time: '10:00 PM',
//   },
//   {
//     id: '11',
//     type: 'text',
//     message: 'What about you?',
//     senderid: '7',
//     senderName: 'You',
//     receiverid: '2',
//     time: '10:00 AM',
//   },
//   {
//     id: '12',
//     type: 'text',
//     message: 'I am fine',
//     senderid: '2',
//     senderName: 'Rahul Singh',
//     receiverid: '7',
//     time: '10:00 PM',
//   },
//   {
//     id: '13',
//     type: 'text',
//     message: 'What about you?',
//     senderid: '2',
//     senderName: 'Rahul Singh',
//     receiverid: '7',
//     time: '10:00 AM',
//   },
// ];

const Chat = ({route}) => {
  const [MessageData, setMessageData] = useState([]);
  const {userid, name, imageUrl, type: chattype, grouproomid} = route.params;
  const myuserid = useSelector(state => state.Auth.userid);
  const {name: myname} = useSelector(state => state.Auth.userinitaldata);

  useEffect(() => {
    const socket = io('http://192.168.205.98:3000');
    socket.on('connect', () => {
      const roomid = [myuserid, userid].sort().join('_');
      console.log('roomid', roomid);
      if (chattype == 'group') {
        socket.emit('join room', grouproomid);
      } else {
        socket.emit('join room', roomid);
      }
    });

    socket.on('chat message', msg => {
      console.log('message recieved', msg);
      setMessageData(prev => {
        const lastMessageId = prev.length > 0 ? prev[prev.length - 1].id : 0;
        msg.id = lastMessageId + 1;
        return [...prev, msg];
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <GradientScreen>
      <View style={styles.container}>
        <ChatHeader
          name={name}
          imageUrl={imageUrl}
          userid={userid}
          chattype={chattype}
        />
        <View style={styles.chatcontainer}>
          <FlatList
            data={MessageData}
            keyExtractor={item => item.id.toString()}
            renderItem={({item, index}) => (
              <Message MessageData={item} index={index} myid={myuserid} />
            )}
            onEndReachedThreshold={0.1}
            showsVerticalScrollIndicator={false}
            numColumns={1}
            contentContainerStyle={{paddingBottom: 80}}
          />
        </View>
        <ChatBottom
          socket={socket}
          senderid={myuserid}
          receiverid={userid}
          myname={myname}
          chattype={chattype}
          grouproomid={grouproomid}
          MessageData={MessageData}
        />
      </View>
    </GradientScreen>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headingtext2: {
    fontFamily: 'Lexend',
    color: colors.text.primary,
    fontWeight: '900',
    fontSize: 18,
    lineHeight: 26,
  },
  chatcontainer: {
    flex: 1,
  },
});
