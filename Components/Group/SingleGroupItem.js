import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../Styles/ColorData';
import ProfileNavigator from '../Common/ProfileNavigator';
import {
  useLeaveGroup,
  useRemoveUserFromGroup,
} from '../../Hooks/Query/ChatQuery';
import {useNavigation} from '@react-navigation/native';
import {useQueryClient} from '@tanstack/react-query';

// singleGroupitem {"created_at": "2024-02-29T12:10:37.000000Z", "group_id": "3", "id": 8, "updated_at": "2024-02-29T12:10:37.000000Z",
// "user": {"id": 7, "name": "John De", "profile_picture": "https://wooing.boxinallsoftech.com/public/uploads/profile/39623_1706860152_a.jpg"}, "user_id": "7"}

const SingleGroupItem = ({data, myid, adminid, groupid, handleremoved}) => {
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  const {
    isPending: leavepending,
    error: leaveerror,
    mutate: leavegroup,
  } = useLeaveGroup();
  const {
    isPending: removepending,
    error: removeerror,
    mutate: removeuser,
  } = useRemoveUserFromGroup();

  const handleremovemember = () => {
    const finaldata = {
      group_id: groupid,
      user_id: data.user.id,
    };

    removeuser(
      {data: finaldata},
      {
        onSuccess: data => {
          if (data.status_code == 1) {
            handleremoved(finaldata.user_id);
          }
        },
      },
    );
  };
  const handleleavegroup = () => {
    const finaldata = {
      group_id: groupid,
    };
    leavegroup(
      {data: finaldata},
      {
        onSuccess: data => {
          if (data.status_code == 1) {
            queryClient.invalidateQueries({queryKey: ['fetchChattingFriends']});
            navigation.navigate('FriendsList');
          }
        },
      },
    );
  };

  return (
    <View
      style={{
        overflow: 'hidden',
      }}>
      <View style={styles.fricontainer}>
        <View>
          <ProfileNavigator id={data.user.id}>
            <Image
              source={{uri: data.user.profile_picture}}
              style={{
                height: 50,
                width: 50,
                borderRadius: 60,
                borderColor: 'white',
                borderWidth: 2,
              }}
            />
          </ProfileNavigator>
        </View>
        <View style={{flex: 1}}>
          {data.user.id == myid ? (
            <Text style={styles.text1}>{data.user.name + ' (You)'}</Text>
          ) : (
            <Text style={styles.text1}>{data.user.name}</Text>
          )}

          {myid == adminid && myid != data.user.id && (
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                marginTop: 10,
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={styles.chatbutton}
                onPress={handleremovemember}>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: '500',
                  }}>
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {adminid == data.user.id && (
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                marginTop: 10,
                alignItems: 'center',
              }}>
              <View style={styles.callbutton}>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: '500',
                  }}>
                  Admin
                </Text>
              </View>
            </View>
          )}

          {myid != adminid && myid == data.user.id && (
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                marginTop: 10,
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={styles.deletebutton}
                onPress={handleleavegroup}>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: '500',
                  }}>
                  Leave
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
      <View style={styles.divider}></View>
    </View>
  );
};

export default SingleGroupItem;

const styles = StyleSheet.create({
  fricontainer: {
    flexDirection: 'row',
    gap: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    padding: 10,
    alignItems: 'center',
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
    color: colors.login.headingtext2,
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
  deletebutton: {
    height: 30,
    width: 106,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2942C7',
    paddingHorizontal: 10,
  },
});
