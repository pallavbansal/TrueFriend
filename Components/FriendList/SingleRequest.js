import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import {colors} from '../../Styles/ColorData';
import {useUpdateRequest} from '../../Hooks/Query/RequestQuery';
import {useNavigation} from '@react-navigation/native';

const SingleRequest = ({data, setfilteredrequestdata}) => {
  console.log('data', data);
  const navigation = useNavigation();
  const {mutate, isPending, error, reset} = useUpdateRequest();

  const acceptRequest = () => {
    console.log('accept', data.friend_id);
    const finaldata = {
      friend_request_id: data.friend_id,
      status: 'ACCEPTED',
    };
    // mutate(
    //   {data: finaldata},
    //   {
    //     onSuccess: data => {
    //       console.log('Request success accept', data);
    //       setfilteredrequestdata(prev => {
    //         return prev.filter(item => item.friend_id !== data.friend_id);
    //       });
    //     },
    //   },
    // );
  };

  const deleteRequest = () => {
    console.log('delete', data.friend_id);
    setfilteredrequestdata(prev => {
      return prev.filter(item => item.friend_id !== data.friend_id);
    });
  };

  const handleprofile = () => {
    console.log('handleprofile', data);
    if (data.type != 'group') {
      return navigation.navigate('ProfileById', {userid: data.friend_id});
    }
  };

  return (
    <View>
      <View style={styles.fricontainer}>
        {data.profile_picture ? (
          <TouchableOpacity onPress={handleprofile}>
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
            <TouchableOpacity
              style={styles.acceptbutton}
              onPress={acceptRequest}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: '500',
                }}>
                Accept
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.deletebutton}
              onPress={deleteRequest}>
              <Text
                style={{
                  color: 'black',
                  fontWeight: '500',
                }}>
                Delete
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {data.type == 'group' ? (
        <View style={styles.likecontainer}>
          <TouchableOpacity>
            <Entypo name="users" size={18} color={colors.arrow.secondary} />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.likecontainer}>
          <TouchableOpacity>
            <Entypo name="user" size={18} color={colors.arrow.secondary} />
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.divider}></View>
    </View>
  );
};

export default SingleRequest;

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
  acceptbutton: {
    height: 30,
    width: 106,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8D49EE',
    paddingHorizontal: 10,
  },
  deletebutton: {
    height: 30,
    width: 106,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DDDDDD',
    paddingHorizontal: 10,
  },
  likecontainer: {
    position: 'absolute',
    top: 0,
    right: 20,
  },
});
