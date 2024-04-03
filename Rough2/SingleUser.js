import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../../Styles/ColorData';
import {useNavigation} from '@react-navigation/native';
import {getToken} from '../../Utils/Streamapi';
import {useSelector} from 'react-redux';
import {useGetMeetingId} from '../../Hooks/Query/StreamQuery';
import Video from 'react-native-video';

const SingleUser = ({item}) => {
  const navigation = useNavigation();
  const mydata = useSelector(state => state.Auth.userinitaldata);
  const {profile_picture: imageUrl, online_status, id, name} = item.user;
  const [meetingid, setmeetingid] = useState(null);
  const [otherdata, setotherdata] = useState(null);
  const {isPending, error, mutate, reset} = useGetMeetingId();

  const handlewatchstream = async () => {
    const token = await getToken();
    navigation.navigate('WatchStream', {
      id: id,
      token: token,
      name: mydata.name,
      mode: 'VIEWER',
      type: 'ONLINE',
    });
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
