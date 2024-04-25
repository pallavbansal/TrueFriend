import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../../Styles/ColorData';
import {useNavigation} from '@react-navigation/native';
import {getToken} from '../../Utils/Streamapi';
import {useSelector} from 'react-redux';
import {useGetMeetingId} from '../../Hooks/Query/StreamQuery';
import Video from 'react-native-video';
import Toast from 'react-native-toast-message';

const SingleUser = ({item}) => {
  const navigation = useNavigation();
  const mydata = useSelector(state => state.Auth.userinitaldata);
  const {profile_picture: imageUrl, online_status, id, name} = item.user;
  const {isPending, error, mutate, reset} = useGetMeetingId();

  const handlewatchstream = async () => {
    const token = await getToken();
    const formdata = {
      user_id: id,
    };
    mutate(
      {data: formdata},
      {
        onSuccess: data => {
          if (data.status_code == 1) {
            if (data.data.stream == null) {
              Toast.show({
                type: 'info',
                text1: 'Stream Ended',
                visibilityTime: 1000,
              });
              navigation.navigate('Discover');
            }
            if (data.data.stream?.meeting_id) {
              console.log(
                'Stream Data-------------------------------',
                data.data.stream,
              );
              navigation.navigate('WatchStream', {
                id: id,
                token: token,
                name: mydata.name,
                mode: 'VIEWER',
                meeting_id: data.data.stream.meeting_id,
                otherdata: {
                  meeting_id: data.data.stream.meeting_id,
                  stream_id: data.data.stream.id,
                  stream_status: data.data.stream.status, // "ACTIVE","ENDED"
                  user: data.data.stream.user,
                },
                type:
                  data.data.stream.status == 'ACTIVE' ? 'ONLINE' : 'OFFLINE',
                recordedurl:
                  data.data.stream.status == 'ENDED'
                    ? data.data.stream.recorded_url
                    : null,
              });
            }
          }
          if (data.status_code == 0) {
            Toast.show({
              type: 'error',
              text1: 'Stream Ended',
              visibilityTime: 1000,
            });
            navigation.navigate('Discover');
          }
        },
      },
    );
  };

  return (
    <LinearGradient
      colors={colors.gradients.buttongradient}
      style={styles.gradientcontainer}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handlewatchstream}>
          <Image
            source={{uri: imageUrl}}
            style={{height: '100%', width: '100%', borderRadius: 10}}
          />
          {/* <Video
            source={{
              uri: 'https://cdn.videosdk.live/meetings-hls/63231e1e-1339-4800-bda3-1c295886243c/live.m3u8',
            }}
            style={{height: '100%', width: '100%', borderRadius: 10}}
            resizeMode="cover"
            repeat={true}
          /> */}
        </TouchableOpacity>

        {online_status && (
          <View
            style={[
              styles.dotcontainer,
              {
                backgroundColor:
                  online_status === 'online'
                    ? colors.dotcolors.online
                    : colors.dotcolors.offline,
              },
            ]}></View>
        )}
      </View>
    </LinearGradient>
  );
};

export default SingleUser;

const styles = StyleSheet.create({
  gradientcontainer: {
    height: 134,
    width: 109,
    margin: 3,
    padding: 2,
    marginBottom: 10,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  container: {
    position: 'relative',
    height: '100%',
    width: '100%',
    backgroundColor: 'black',
    borderRadius: 10,
  },
  dotcontainer: {
    position: 'absolute',
    top: -5,
    right: -5,
    height: 15,
    width: 15,
    borderRadius: 10,
    backgroundColor: 'white',
  },
});
