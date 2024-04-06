import React, {useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {usePubSub} from '@videosdk.live/react-native-sdk';

const WatchSpeakerFooter = ({
  bottomSheetView,
  handleChat,
  leave,
  participants,
  showinputouter,
  message,
  setMessage,
  setshowinputouter,
}) => {
  const mpubsubRef = useRef();
  const mpubsub = usePubSub('CHAT', {});
  const sendMessage = () => {
    if (message === '') return;
    mpubsub.publish(message, {persist: true});
    setMessage('');
  };

  useEffect(() => {
    mpubsubRef.current = mpubsub;
  }, [mpubsub]);

  if (showinputouter) {
    return (
      <View style={styles.bottomchatcontainer}>
        <TextInput
          style={{
            backgroundColor: 'white',
            borderRadius: 50,
            padding: 15,
            paddingHorizontal: 30,
            flex: 1,
          }}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message"
          placeholderTextColor="black"
          cursorColor={'black'}
          color={'black'}
        />
        <TouchableOpacity
          onPress={sendMessage}
          style={{
            backgroundColor: 'white',
            borderRadius: 50,
            padding: 12,
          }}>
          <MaterialIcons name="send" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setshowinputouter(false);
          }}
          style={{
            backgroundColor: 'white',
            borderRadius: 50,
            padding: 12,
          }}>
          <MaterialIcons name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View style={styles.bottomcontainer}>
        <TouchableOpacity
          style={{
            width: 50,
            backgroundColor: 'rgba(0,0,0,0.1)',
            padding: 5,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 8,
          }}>
          <MaterialIcons
            name={bottomSheetView === 'CHAT' ? 'cancel-presentation' : 'chat'}
            size={24}
            color="black"
            onPress={handleChat}
          />
        </TouchableOpacity>
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 50,
            padding: 15,
          }}>
          <TouchableOpacity
            onPress={leave}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: 60,
              width: 60,
              borderRadius: 40,
            }}>
            <AntDesign name="home" size={34} color="blue" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.1)',
            padding: 5,
            gap: 5,
            borderRadius: 8,
            width: 50,
          }}>
          <AntDesign name="eye" size={24} color="black" />
          <Text
            style={{
              fontSize: 12,
              color: 'black',
              fontWeight: 'bold',
            }}>
            {participants ? [...participants.keys()].length : 1}
          </Text>
        </View>
      </View>
    );
  }
};

export default WatchSpeakerFooter;

const styles = StyleSheet.create({
  bottomchatcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    gap: 5,
    marginVertical: 5,
    marginHorizontal: 5,
  },

  bottomcontainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    alignItems: 'center',
    padding: 5,
    marginBottom: 15,
    borderRadius: 50,
    marginHorizontal: 5,
    backgroundColor: 'white',
    marginVertical: 15,
    height: 75,
  },
});
