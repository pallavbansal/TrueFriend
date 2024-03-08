import {
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Text,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {colors} from '../../Styles/ColorData';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MultipleImagePicker from '@baronha/react-native-multiple-image-picker';
import {useCreateChat} from '../../Hooks/Query/ChatQuery';
import socket from '../../Socket/Socket';

// types => text,image,video,emoji,docs,divider

const ChatBottom = ({
  senderid,
  receiverid,
  myname,
  chattype,
  grouproomid,
  MessageData,
}) => {
  const [typetext, settypetext] = useState('');
  const [media, setmedia] = useState([]);
  const [showattachmentoptions, setshowattachmentoptions] = useState(false);
  const {mutate, isPending, error, reset} = useCreateChat();
  const tempdata = {
    sender_id: senderid,
    receiver_id: chattype == 'GROUP' ? grouproomid : receiverid,
    sender: {
      name: myname,
    },
    chattype: chattype,
    created_at: new Date(),
  };
  const handleinput = text => {
    settypetext(text);
  };

  const ifdividerneeded = () => {
    if (MessageData.length === 0) {
      return true;
    }

    const lastMessageDate = new Date(
      MessageData[MessageData.length - 1].created_at,
    );
    const today = new Date();

    if (
      lastMessageDate.getDate() !== today.getDate() ||
      lastMessageDate.getMonth() !== today.getMonth() ||
      lastMessageDate.getFullYear() !== today.getFullYear()
    ) {
      return true;
    }

    return false;
  };

  const senddivider = () => {
    return new Promise((resolve, reject) => {
      const messagedatafinal = {
        type: 'DIVIDER',
        content: 'divider',
        ...tempdata,
      };
      const backenddata = {
        type: messagedatafinal.type,
        content: messagedatafinal.content,
      };
      if (chattype === 'SINGLE') {
        backenddata.receiver_id = messagedatafinal.receiver_id;
      }
      if (chattype === 'GROUP') {
        backenddata.group_id = messagedatafinal.receiver_id;
      }
      console.log('divider', backenddata);
      mutate(
        {
          data: backenddata,
        },
        {
          onSuccess: data => {
            messagedatafinal.id = data.data.message.id;
            messagedatafinal.created_at = data.data.message.created_at;
            socket.emit('chat message', messagedatafinal);
            resolve();
          },
          onError: error => {
            console.log('error msg from backend', error);
            reject(error);
          },
        },
      );
    });
  };

  const sendMessage = async messagedata => {
    if (ifdividerneeded()) {
      try {
        await senddivider();
      } catch (error) {
        console.log('Error sending divider', error);
        return;
      }
    }
    const messagedatafinal = {
      ...messagedata,
      ...tempdata,
    };
    const backenddata = {
      type: messagedatafinal.type,
      content: messagedatafinal.content,
    };
    if (chattype === 'SINGLE') {
      backenddata.receiver_id = messagedatafinal.receiver_id;
    }
    if (chattype === 'GROUP') {
      backenddata.group_id = messagedatafinal.receiver_id;
    }
    if (messagedatafinal.type == 'PHOTO' || messagedatafinal.type == 'VIDEO') {
      backenddata.media = messagedatafinal.media;
    }

    console.log('backenddata', backenddata);

    mutate(
      {
        data: backenddata,
      },
      {
        onSuccess: data => {
          messagedatafinal.id = data.data.message.id;
          messagedatafinal.created_at = data.data.message.created_at;
          if (
            messagedatafinal.type == 'PHOTO' ||
            messagedatafinal.type == 'VIDEO'
          ) {
            messagedatafinal.media_path = data.data.message.media_path;
            delete messagedatafinal.media;
          }
          socket.emit('chat message', messagedatafinal);
        },
        onError: error => {
          console.log('error msg from backend', error);
        },
      },
    );
  };

  const sendTextMessage = () => {
    if (media.length == 0 && typetext.length == 0) {
      return;
    }
    if (media.length == 0 && typetext.length != 0) {
      const messagedata = {
        type: 'TEXT',
        content: typetext,
      };
      sendMessage(messagedata);
      settypetext('');
      setmedia([]);
    } else {
      const messagedata = {
        type: media.type == 'image' ? 'PHOTO' : 'VIDEO',
        content: typetext,
        media: media,
      };
      sendMessage(messagedata);
      settypetext('');
      setmedia([]);
    }
  };

  const handleImageUpload = async type => {
    try {
      setshowattachmentoptions(false);
      const response = await MultipleImagePicker.openPicker({
        mediaType: type,
        maxSelectedAssets: 1,
      });
      if (response && response.length > 0) {
        setmedia(response[0]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.bottomcontainer}>
      {showattachmentoptions && (
        <View style={styles.attachmentcontainer}>
          <TouchableOpacity onPress={() => handleImageUpload('image')}>
            <MaterialIcons name="image" size={40} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleImageUpload('video')}>
            <MaterialIcons name="video-camera-back" size={40} color="white" />
          </TouchableOpacity>
        </View>
      )}
      {media.length != 0 && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.text.primary,
            gap: 15,
            alignSelf: 'center',
            padding: 10,
            borderRadius: 20,
            position: 'absolute',
            bottom: 65,
            left: 10,
          }}>
          <Image
            source={{
              uri: media.path,
            }}
            style={{width: 50, height: 50, borderRadius: 10}}></Image>
          <View style={{gap: 10}}>
            {media.type == 'image' ? (
              <MaterialIcons
                name="image"
                size={20}
                color={colors.arrow.secondary}
              />
            ) : (
              <MaterialIcons
                name="video-camera-back"
                size={20}
                color={colors.arrow.secondary}
              />
            )}

            <TouchableOpacity
              onPress={() => {
                setmedia([]);
              }}>
              <AntDesign
                name="closecircle"
                size={20}
                color={colors.arrow.secondary}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: colors.text.primary,
          gap: 10,
        }}>
        <TouchableOpacity style={{marginLeft: 10}}>
          <MaterialIcons
            name="emoji-emotions"
            size={24}
            color={colors.arrow.secondary}
          />
        </TouchableOpacity>
        <TextInput
          placeholder="Type a message"
          placeholderTextColor={colors.login.headingtext2}
          cursorColor={colors.login.headingtext2}
          onChangeText={handleinput}
          // onChange={handleinput}
          value={typetext}
          style={{
            color: colors.login.headingtext2,
            // backgroundColor: 'black',
            fontWeight: '900',
            flex: 1,
            borderRadius: 20,
            paddingHorizontal: 20,
            margin: 5,
          }}
        />

        <TouchableOpacity
          onPress={() => {
            setmedia([]), setshowattachmentoptions(prev => !prev);
          }}>
          <Entypo name="attachment" size={24} color={colors.arrow.secondary} />
        </TouchableOpacity>
        <TouchableOpacity style={{marginRight: 10}} onPress={sendTextMessage}>
          <MaterialIcons name="send" size={24} color={colors.arrow.secondary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatBottom;

const styles = StyleSheet.create({
  bottomcontainer: {
    // backgroundColor: 'red',
    position: 'fixed',
    bottom: 0,
  },
  headingtext2: {
    fontFamily: 'Lexend',
    color: colors.text.primary,
    fontWeight: '900',
    fontSize: 18,
    lineHeight: 26,
  },
  attachmentcontainer: {
    position: 'absolute',
    bottom: 70,
    left: 10,
    borderRadius: 20,
    flexDirection: 'column',
    gap: 20,
    padding: 15,
    backgroundColor: colors.arrow.secondary,
    width: 70,
  },
});
