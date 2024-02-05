import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../../Styles/ColorData';
import {useNavigation} from '@react-navigation/native';
import {getToken} from '../LiveStreaming/api';

const SingleUser = ({item, meetingid}) => {
  const navigation = useNavigation();
  const [token, setToken] = useState('');
  const {profile_picture: imageUrl, online_status, id, name} = item.user;

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getToken();
      setToken(token);
    };

    fetchToken();
  }, [navigation]);

  const handlewatchstream = () => {
    if (meetingid) {
      navigation.navigate('WatchStream', {
        token: token,
        meetingId: meetingid,
        name: name,
        mode: 'VIEWER',
      });
    }
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
