import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../../Styles/ColorData';
import socket from '../../Socket/Socket';
import {useSelector} from 'react-redux';
import {getToken, createMeeting} from '../../Utils/Streamapi';

const SingleFriend = ({data, hideunseen, handleChatClick}) => {
  const mydata = useSelector(state => state.Auth.userinitaldata);
  const navigation = useNavigation();
  const isCreator = true;

  const handleChat = () => {
    const finaldata = {
      userid: data.id,
      name: data.name,
      imageUrl: data.profile_picture,
      type: data.type,
      grouproomid: data.grouproomid,
    };
    handleChatClick(finaldata);
    navigation.navigate('Chat', finaldata);
  };

  const handleCall = async () => {
    const token = await getToken();
    let meetingId = '';
    if (isCreator) {
      meetingId = await createMeeting({token});
    }

    const finaldata = {
      caller: {
        userid: mydata.id,
        name: mydata.name,
        imageUrl: mydata.profile_picture,
      },
      reciever: {
        name: data.name,
        id: data.id,
      },
      meetingId: meetingId,
      callaction: 'outgoing',
      type: 'audio',
    };
    navigation.navigate('Call', {
      name: mydata.name.trim(),
      token: token,
      meetingId: meetingId,
      micEnabled: true,
      webcamEnabled: false,
      isCreator: isCreator,
      mode: 'CONFERENCE',
      finaldata: finaldata,
    });
    socket.emit('call', finaldata);
  };

  const handlenavigate = () => {
    if (data.type == 'SINGLE') {
      if (data.id == mydata.id) {
        return navigation.navigate('Profile');
      } else {
        return navigation.navigate('ProfileById', {
          userid: data.id,
        });
      }
    }
    if (data.type == 'GROUP') {
      return navigation.navigate('GroupProfile', {
        groupid: data.id,
      });
    }
  };

  return (
    <View>
      <View style={styles.fricontainer}>
        {data.profile_picture ? (
          <View>
            <TouchableOpacity onPress={handlenavigate}>
              <Image
                source={{uri: data.profile_picture}}
                style={{
                  height: 65,
                  width: 65,
                  borderRadius: 60,
                  borderColor: 'white',
                  borderWidth: 2,
                }}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity onPress={handlenavigate}>
            <View
              style={[
                styles.iconcontainer,
                {
                  backgroundColor: '#8D49EE',
                },
              ]}>
              <FontAwesome5 name="user-friends" size={28} color="white" />
            </View>
          </TouchableOpacity>
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

            {data.type == 'SINGLE' && (
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

            {data.unseenmsg > 0 && hideunseen == false && (
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
