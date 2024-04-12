import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  FlatList,
  Text,
  Linking,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import TextInputContainer from './TextInput';
import {useMeeting} from '@videosdk.live/react-native-sdk';
import Hyperlink from 'react-native-hyperlink';
import moment from 'moment';
import {usePubSub} from '@videosdk.live/react-native-sdk';
import {convertRFValue, useStandardHeight} from './spacing';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../../../../Styles/ColorData';

const ChatViewer = ({setshowinputouter, showinputouter}) => {
  const mpubsubRef = useRef();

  const mpubsub = usePubSub('CHAT', {});

  useEffect(() => {
    mpubsubRef.current = mpubsub;
  }, [mpubsub]);

  const mMeeting = useMeeting({});
  const localParticipantId = mMeeting?.localParticipant?.id;

  const [message, setMessage] = useState('');

  const flatListRef = React.useRef();

  // const sendMessage = () => {
  //   mpubsub.publish(message, {persist: true});
  //   setMessage('');
  //   setTimeout(() => {
  //     scrollToBottom();
  //   }, 100);
  // };
  useEffect(() => {
    scrollToBottom();
  }, [mpubsub.messages]);

  const scrollToBottom = () => {
    flatListRef.current.scrollToEnd({animated: true});
  };

  return (
    <View
      style={{
        flex: 1,
        zIndex: 101,
      }}>
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'flex-end',
        }}>
        {/* <View
          style={{
            marginLeft: 12,
            marginVertical: 12,
          }}>
          <Text
            style={{
              fontSize: 18,
              color: colors.primary[100],
              fontWeight: 'bold',
            }}>
            Chat
          </Text>
        </View> */}
        {mpubsub.messages ? (
          <FlatList
            ref={flatListRef}
            // data={mpubsub.messages}
            data={[
              {
                message:
                  'Welcome to the Wooing LiveStream! Warning: Pornographic, violent, or otherwise inappropriate content is strictly prohibited. Enjoy the show!',
                senderName: 'Wooing',
                senderId: localParticipantId,
                timestamp: new Date(),
              },
              ...mpubsub.messages,
            ]}
            showsVerticalScrollIndicator={false}
            renderItem={({item, i}) => {
              const {message, senderId, timestamp, senderName} = item;
              const localSender = localParticipantId === senderId;
              const time = moment(timestamp).format('hh:mm a');
              return (
                <View
                  key={i}
                  style={{
                    // backgroundColor: colors.primary[600],
                    paddingVertical: 4,
                    paddingHorizontal: 10,
                    marginVertical: 3,
                    borderRadius: 10,
                    marginHorizontal: 6,
                    // alignSelf: localSender ? 'flex-end' : 'flex-start',
                    alignSelf: 'flex-start',
                  }}>
                  <Text
                    style={{
                      fontSize: convertRFValue(8),
                      // color: '#9A9FA5',
                      color: localSender
                        ? colors.arrow.tertiary
                        : colors.text.primary,
                      fontWeight: 'bold',
                    }}>
                    {localSender ? 'You' : senderName}
                  </Text>
                  <Hyperlink
                    linkDefault={true}
                    onPress={url => Linking.openURL(url)}
                    linkStyle={{color: 'blue'}}>
                    <Text
                      style={{
                        fontSize: convertRFValue(10),
                        // color: 'black',
                        color: localSender
                          ? colors.arrow.tertiary
                          : colors.text.primary,
                      }}>
                      {message}
                    </Text>
                  </Hyperlink>
                  {/* <Text
                    style={{
                      color: 'grey',
                      fontSize: convertRFValue(10),
                      alignSelf: 'flex-end',
                      marginTop: 4,
                    }}>
                    {time}
                  </Text> */}
                </View>
              );
            }}
            keyExtractor={(item, index) => `${index}_message_list`}
            style={{
              marginVertical: 5,
            }}
          />
        ) : null}

        {/* {!showinputouter && (
          <TouchableOpacity
            style={{
              padding: 4,
              backgroundColor: 'rgba(0,0,0,0.5)',
              borderRadius: 10,
              width: 40,
              marginBottom: 10,
              marginLeft: 10,
              alignItems: 'center',
            }}>
            <MaterialIcons
              name="send"
              size={28}
              color="white"
              onPress={() => {
                setshowinputouter(true);
              }}
            />
          </TouchableOpacity>
        )} */}
      </SafeAreaView>
    </View>
  );
};
export default ChatViewer;

// {showinput && (
//   <View
//     style={{
//       paddingHorizontal: 6,
//       flexDirection: 'row',
//     }}>
//     <View
//       style={{
//         flex: 1,
//         marginBottom: 10,
//       }}>
//       <TextInputContainer
//         message={message}
//         setMessage={setMessage}
//         sendMessage={sendMessage}
//       />
//     </View>
//   </View>
// )}

{
  /* <Modal
          animationType="slide"
          transparent={true}
          visible={showinput}
          onRequestClose={() => {
            setshowinput(!showinput);
          }}>
          <TouchableWithoutFeedback onPress={() => setshowinput(false)}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0,0,0,0.1)',
              }}>
              <TouchableWithoutFeedback>
                <View
                  style={{
                    margin: 20,
                    backgroundColor: 'white',
                    borderRadius: 20,
                    padding: 25,
                    alignItems: 'center',
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 4,
                    elevation: 5,
                  }}>
                  <TextInputContainer
                    message={message}
                    setMessage={setMessage}
                    isSending={isSending}
                    sendMessage={sendMessage}
                  />
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal> */
}
