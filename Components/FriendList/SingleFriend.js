import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../../Styles/ColorData';
import socket from '../../Socket/Socket';
import {useSelector} from 'react-redux';
import {createMeeting, getToken} from '../LiveStreaming/api';

const SingleFriend = ({data, setfilteredfriendsdata}) => {
  const mydata = useSelector(state => state.Auth.userinitaldata);
  const navigation = useNavigation();
  const [token, setToken] = useState('');
  const [meetingId, setMeetingId] = useState('');
  const isCreator = true;

  useEffect(() => {
    async function fetchData() {
      const token = await getToken();
      setToken(token);
      if (isCreator) {
        const _meetingId = await createMeeting({token});
        setMeetingId(_meetingId);
      }
    }
    fetchData();
  }, [navigation]);

  const handleChat = () => {
    // setfilteredfriendsdata(prev => {
    //   return prev.map(item => {
    //     if (item.id == data.id) {
    //       return {
    //         ...item,
    //         unseenmsg: 0,
    //       };
    //     }
    //     return item;
    //   });
    // });
    navigation.navigate('Chat', {
      userid: data.id,
      name: data.name,
      imageUrl: data.imageUrl,
      type: data.type,
      grouproomid: data.grouproomid,
      roomid: data.roomid,
    });
  };

  const handleCall = () => {
    navigation.navigate('Call', {
      name: mydata.name.trim(),
      token: token,
      meetingId: meetingId,
      micEnabled: true,
      webcamEnabled: false,
      isCreator: isCreator,
      mode: 'CONFERENCE',
    });

    socket.emit('call', {
      room: data.roomid,
      caller: {
        userid: mydata.id,
        name: mydata.name,
        imageUrl: mydata.profile_picture,
      },
      meetingId: meetingId,
      type: 'audio',
    });
  };

  return (
    <View>
      <View style={styles.fricontainer}>
        {data.imageUrl ? (
          <View>
            <Image
              source={{uri: data.imageUrl}}
              style={{
                height: 65,
                width: 65,
                borderRadius: 60,
                borderColor: 'white',
                borderWidth: 2,
              }}
            />
          </View>
        ) : (
          <View
            style={[
              styles.iconcontainer,
              {
                backgroundColor: '#8D49EE',
              },
            ]}>
            <FontAwesome5 name="user-friends" size={28} color="white" />
          </View>
        )}
        <View style={{flex: 1}}>
          <Text style={styles.text1}>{data.name}</Text>

          <View
            style={{
              flexDirection: 'row',
              gap: 10,
              marginTop: 10,
              alignItems: 'center',
            }}>
            <TouchableOpacity style={styles.chatbutton} onPress={handleChat}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: '500',
                }}>
                Chat
              </Text>
            </TouchableOpacity>

            {data.type == 'single' && (
              <TouchableOpacity style={styles.callbutton} onPress={handleCall}>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: '500',
                  }}>
                  Call
                </Text>
              </TouchableOpacity>
            )}

            {data.unseenmsg > 0 && (
              <View
                style={{
                  marginLeft: 'auto',
                  marginRight: 10,
                  backgroundColor: colors.arrow.tertiary,
                  padding: 5,
                  borderRadius: 100,
                  width: 25,
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 25,
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 12,
                  }}>
                  {data.unseenmsg}
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
      {data.liked && (
        <View style={styles.likecontainer}>
          <TouchableOpacity>
            <AntDesign name="like2" size={24} color="black" />
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.divider}></View>
    </View>
  );
};

export default SingleFriend;

const styles = StyleSheet.create({
  fricontainer: {
    flexDirection: 'row',
    gap: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    padding: 10,
  },

  iconcontainer: {
    height: 65,
    width: 65,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },

  text1: {
    color: '#33196B',
    fontSize: 16,
    fontWeight: '900',
  },

  divider: {
    height: 1.5,
    backgroundColor: '#DFD2F3',
    marginHorizontal: 10,
    marginBottom: 15,
  },
  chatbutton: {
    height: 30,
    width: 90,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8D49EE',
    paddingHorizontal: 10,
  },
  callbutton: {
    height: 30,
    width: 90,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00B528',
    paddingHorizontal: 10,
  },
  likecontainer: {
    position: 'absolute',
    top: 0,
    right: 20,
  },
});
