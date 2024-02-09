import {
  View,
  Text,
  StyleSheet,
  Image,
  Modal,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../Styles/ColorData';
import Video from 'react-native-video';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Message = ({MessageData, myid}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const onBuffer = ({isBuffering}) => {
    console.log(isBuffering ? 'Video is buffering' : 'Video buffering ended');
  };

  const videoError = error => {
    console.error('Video error', error);
  };
  const formatTime = dateString => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const dividertext = date => {
    const inputDate = new Date(date);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    if (
      inputDate.getDate() === today.getDate() &&
      inputDate.getMonth() === today.getMonth() &&
      inputDate.getFullYear() === today.getFullYear()
    ) {
      return 'Today';
    } else if (
      inputDate.getDate() === yesterday.getDate() &&
      inputDate.getMonth() === yesterday.getMonth() &&
      inputDate.getFullYear() === yesterday.getFullYear()
    ) {
      return 'Yesterday';
    } else {
      return `${inputDate.getDate()}/${
        inputDate.getMonth() + 1
      }/${inputDate.getFullYear()}`;
    }
  };

  if (MessageData.type == 'DIVIDER') {
    return (
      <View
        style={{
          width: '100%',
          marginVertical: 10,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            width: '90%',
            height: 2,
            backgroundColor: colors.login.headingtext2,
            borderRadius: 10,
          }}></View>
        <Text
          style={{
            color: colors.arrow.primary,
            fontSize: 12,
            fontWeight: '900',
          }}>
          {dividertext(MessageData.created_at)}
        </Text>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        MessageData.sender_id == myid ? styles.right : styles.left,
      ]}>
      <View style={styles.messageheader}>
        <Text
          style={[
            MessageData.sender_id == myid ? styles.nametext1 : styles.nametext2,
          ]}>
          {MessageData.sender_id == myid ? 'You' : MessageData.sender.name}
        </Text>
        {MessageData.type == 'image' && (
          <MaterialIcons
            name="image"
            size={18}
            color={colors.arrow.primary}
            style={{
              marginRight: 'auto',
            }}
          />
        )}
        {MessageData.type == 'video' && (
          <MaterialIcons
            name="video-camera-back"
            size={18}
            color={colors.arrow.primary}
            style={{
              marginRight: 'auto',
            }}
          />
        )}
        {MessageData.type == 'doc' && (
          <MaterialIcons
            name="edit-document"
            size={18}
            color={colors.arrow.primary}
            style={{
              marginRight: 'auto',
            }}
          />
        )}

        <Text style={styles.timetext}>
          {formatTime(MessageData.created_at)}
        </Text>
      </View>
      {MessageData.type == 'TEXT' && (
        <Text style={styles.messagetext}>{MessageData.content}</Text>
      )}
      {MessageData.type == 'PHOTO' && (
        <Image
          source={{uri: MessageData.media_path}}
          style={{width: 150, height: 150}}
        />
      )}
      {MessageData.type == 'VIDEO' && (
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Video
            source={{uri: MessageData.media_path}}
            style={{width: 150, height: 150}}
            resizeMode="cover"
            muted={true}
            paused={true}
            repeat={false}
            onBuffer={onBuffer}
            onError={videoError}
          />
          {/* <Image
            source={{uri: MessageData.media_path}}
            style={{width: 150, height: 150}}
          /> */}
          <Modal
            animationType="slide"
            transparent={false}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.videoModal}>
              <Video
                source={{uri: MessageData.media_path}}
                style={{width: '100%', height: '100%'}}
                resizeMode="cover"
                controls={true}
                paused={false}
                repeat={false}
                onBuffer={onBuffer}
                onError={videoError}
              />
            </View>
          </Modal>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({
  container: {
    maxWidth: '70%',
    minWidth: '30%',
    backgroundColor: 'white',
    margin: 10,
    padding: 10,
    paddingHorizontal: 20,
  },
  left: {
    alignSelf: 'flex-start',
    borderTopRightRadius: 35,
    borderBottomRightRadius: 35,
    borderBottomLeftRadius: 35,
  },
  right: {
    alignSelf: 'flex-end',
    borderBottomRightRadius: 35,
    borderBottomLeftRadius: 35,
    borderTopLeftRadius: 35,
  },
  messageheader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    gap: 20,
  },
  timetext: {
    fontFamily: 'Lexend',
    color: colors.arrow.primary,
    fontWeight: '900',
    fontSize: 12,
    lineHeight: 18,
  },
  nametext1: {
    fontFamily: 'Lexend',
    color: colors.arrow.primary,
    fontWeight: '900',
    fontSize: 14,
    lineHeight: 20,
  },
  nametext2: {
    fontFamily: 'Lexend',
    color: colors.arrow.quadary,
    fontWeight: '900',
    fontSize: 14,
    lineHeight: 20,
  },
  messagetext: {
    fontFamily: 'Lexend',
    color: colors.login.headingtext2,
    fontWeight: '900',
    fontSize: 14,
    lineHeight: 20,
  },
  videoModal: {
    // backgroundColor: 'black',
    flex: 1,
    // padding: 10,
    // margin: 10,
  },
});
