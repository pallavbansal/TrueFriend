import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import {colors} from '../../Styles/ColorData';
import {useUpdateRequest} from '../../Hooks/Query/RequestQuery';
import {useNavigation} from '@react-navigation/native';
import {useQueryClient} from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

const SingleRequest = ({data, setfilteredrequestdata}) => {
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  const {mutate, isPending, error, reset} = useUpdateRequest();

  const acceptRequest = () => {
    const finaldata = {
      friend_request_id: data.friend_request_id,
      status: 'ACCEPTED',
    };
    mutate(
      {data: finaldata},
      {
        onSuccess: data => {
          console.log('Request success accept', data);
          Toast.show({
            type: 'success',
            text1: 'Request Accepted',
          });
          queryClient.invalidateQueries({queryKey: ['fetchFriendRequests']});
          queryClient.invalidateQueries({queryKey: ['fetchFriends']});
        },
      },
    );
  };

  const deleteRequest = () => {
    const finaldata = {
      friend_request_id: data.friend_request_id,
      status: 'CANCELLED',
    };
    mutate(
      {data: finaldata},
      {
        onSuccess: data => {
          console.log('Request success delete', data);
          Toast.show({
            type: 'success',
            text1: 'Request Deleted',
          });
          queryClient.invalidateQueries({queryKey: ['fetchFriendRequests']});
          queryClient.invalidateQueries({queryKey: ['fetchFriends']});
        },
      },
    );
  };

  const handleprofile = () => {
    console.log('handleprofile', data);
    if (data.type != 'GROUP') {
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
      {data.type == 'GROUP' ? (
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
