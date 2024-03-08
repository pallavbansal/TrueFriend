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
import {Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;

const Message = ({MessageData, myid}) => {
  const [modalVisible, setModalVisible] = useState({
    visible: false,
    type: '',
  });
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const handlePause = () => {
    setIsPaused(prev => !prev);
  };

  const handleMute = () => {
    setIsMuted(prev => !prev);
  };

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
        {MessageData.type == 'PHOTO' && (
          <MaterialIcons
            name="image"
            size={18}
            color={colors.arrow.primary}
            style={{
              marginLeft: 'auto',
            }}
          />
        )}
        {MessageData.type == 'VIDEO' && (
          <MaterialIcons
            name="video-camera-back"
            size={18}
            color={colors.arrow.primary}
            style={{
              marginLeft: 'auto',
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
        <TouchableOpacity
          onPress={() =>
            setModalVisible({
              visible: true,
              type: 'image',
            })
          }>
          <View
            style={{
              gap: 10,
            }}>
            {MessageData.content && (
              <Text style={styles.messagetext}>{MessageData.content}</Text>
            )}
            <Image
              source={{uri: MessageData.media_path}}
              style={{
                width: 150,
                height: 150,
                borderRadius: 15,
                marginBottom: 10,
                overflow: 'hidden',
              }}
            />
          </View>
        </TouchableOpacity>
      )}
      {MessageData.type == 'VIDEO' && (
        <TouchableOpacity
          onPress={() =>
            setModalVisible({
              visible: true,
              type: 'video',
            })
          }>
          <View
            style={{
              gap: 10,
            }}>
            {MessageData.content && (
              <Text style={styles.messagetext}>{MessageData.content}</Text>
            )}
            <Video
              source={{uri: MessageData.media_path}}
              style={{
                width: 150,
                height: 150,
                borderRadius: 15,
                marginBottom: 10,
                overflow: 'hidden',
              }}
              resizeMode="cover"
              muted={true}
              paused={true}
              repeat={false}
              onBuffer={onBuffer}
              onError={videoError}
              poster="https://www.w3schools.com/w3images/lights.jpg"
              posterResizeMode="cover"
            />
          </View>
        </TouchableOpacity>
      )}
      <View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible.visible}
          onRequestClose={() => {
            setModalVisible({
              visible: false,
              type: '',
            });
          }}>
          {modalVisible.type == 'video' && (
            <View style={styles.innerModal}>
              <View style={styles.profilecontainer}>
                <Video
                  source={{uri: MessageData.media_path}}
                  style={{
                    width: '100%',
                    aspectRatio: 16 / 9,
                  }}
                  resizeMode="contain"
                  controls={true}
                  paused={isPaused}
                  muted={isMuted}
                  repeat={false}
                  onBuffer={onBuffer}
                  onError={videoError}
                />
              </View>

              <View style={styles.videobuttons}>
                <TouchableOpacity
                  onPress={handlePause}
                  style={styles.pausebutton}>
                  <MaterialIcons
                    name={isPaused ? 'play-arrow' : 'pause'}
                    size={28}
                    color={colors.text.primary}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleMute}
                  style={styles.mutebutton}>
                  <MaterialIcons
                    name={isMuted ? 'volume-off' : 'volume-up'}
                    size={28}
                    color={colors.text.primary}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}

          {modalVisible.type == 'image' && (
            <View style={styles.innerModal}>
              <View style={styles.profilecontainer}>
                <Image
                  source={{uri: MessageData.media_path}}
                  style={{
                    width: '100%',
                    aspectRatio: 1,
                    overflow: 'hidden',
                  }}
                  resizeMode="contain"
                />
              </View>
            </View>
          )}
        </Modal>
      </View>
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
    gap: 5,
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
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 20,
  },
  nametext2: {
    fontFamily: 'Lexend',
    color: colors.arrow.quadary,
    fontWeight: 'bold',
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
  innerModal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.arrow.secondary,
  },
  profilecontainer: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
    overflow: 'hidden',
    margin: 5,
    width: windowWidth - 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  videobuttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 25,
    marginTop: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 20,
  },
});
