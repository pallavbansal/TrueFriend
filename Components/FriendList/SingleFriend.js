import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';

const SingleFriend = ({data}) => {
  const navigation = useNavigation();

  const handleChat = () => {
    navigation.navigate('Chat', {
      userid: data.id,
      name: data.name,
      imageUrl: data.imageUrl,
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

          <View style={{flexDirection: 'row', gap: 10, marginTop: 10}}>
            <TouchableOpacity style={styles.chatbutton} onPress={handleChat}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: '500',
                }}>
                Chat
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.callbutton}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: '500',
                }}>
                Call
              </Text>
            </TouchableOpacity>
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
    width: 106,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8D49EE',
    paddingHorizontal: 10,
  },
  callbutton: {
    height: 30,
    width: 106,
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
