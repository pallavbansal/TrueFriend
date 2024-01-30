import {
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Text,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {colors} from '../../Styles/ColorData';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {getTime} from '../../Utils/HelperFunctions';
import LinearGradient from 'react-native-linear-gradient';
import MultipleImagePicker from '@baronha/react-native-multiple-image-picker';

// types => text,image,video,emoji,docs,divider

const ChatBottom = ({socket, senderid, receiverid, myname}) => {
  const [typetext, settypetext] = useState('');
  const [showattachmentoptions, setshowattachmentoptions] = useState(false);

  const handleinput = text => {
    // console.log('dddddddddddd', event);
    settypetext(text);
  };

  const sendMessage = () => {
    const messagedata = {
      type: 'text',
      message: typetext,
      senderid: senderid,
      senderName: myname,
      receiverid: receiverid,
      room: [senderid, receiverid].sort().join('_'),
      time: getTime(),
    };
    socket.emit('chat message', messagedata);
    settypetext('');
  };

  const handleImageUpload = async type => {
    try {
      setshowattachmentoptions(false);
      const response = await MultipleImagePicker.openPicker({
        mediaType: type,
        maxSelectedAssets: 1,
      });
      console.log('response', response);
      if (response && response.length > 0) {
        const messagedata = {
          type: type,
          message: '',
          media: response[0].path,
          senderid: senderid,
          senderName: myname,
          receiverid: receiverid,
          room: [senderid, receiverid].sort().join('_'),
          time: getTime(),
        };
        socket.emit('chat message', messagedata);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.bottomcontainer}>
      {showattachmentoptions && (
        <LinearGradient
          colors={colors.gradients.buttongradient}
          style={{
            margin: 10,
            borderRadius: 20,
          }}>
          <View style={styles.attachmentcontainer}>
            <TouchableOpacity onPress={() => handleImageUpload('image')}>
              <MaterialIcons name="image" size={40} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleImageUpload('video')}>
              <MaterialIcons name="video-camera-back" size={40} color="white" />
            </TouchableOpacity>
            <TouchableOpacity>
              <MaterialIcons name="edit-document" size={40} color="white" />
            </TouchableOpacity>
          </View>
        </LinearGradient>
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
          onPress={() => setshowattachmentoptions(prev => !prev)}>
          <Entypo name="attachment" size={24} color={colors.arrow.secondary} />
        </TouchableOpacity>
        <TouchableOpacity style={{marginRight: 10}} onPress={sendMessage}>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 50,
    paddingVertical: 15,
  },
});
