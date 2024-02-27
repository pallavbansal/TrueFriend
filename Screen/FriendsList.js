import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
  Modal,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../Styles/ColorData';
import GradientScreen from '../Layouts/GradientScreen';
import GradientInput from '../Components/Common/GradientInput';
import GradientButton from '../Components/Common/GradientButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import SingleFriend from '../Components/FriendList/SingleFriend';
import SingleRequest from '../Components/FriendList/SingleRequest';
import SelectFriend from '../Components/FriendList/SelectFriend';
import socket from '../Socket/Socket';
import {useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';
import FriendsListSkeleton from '../Layouts/Skeletions/FriendsListSkeleton';
import Loading from './Loading';
import {
  useFetchFriends,
  useFetchFriendRequests,
} from '../Hooks/Query/RequestQuery';

// const friendsdata = [
//   {
//     id: 7,
//     name: 'Jhon Doe',
//     type: 'SINGLE',
//     liked: true,
//     imageUrl:
//       'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//     unseenmsg: 0,
//   },
//   {
//     id: 44,
//     name: 'Vivek',
//     type: 'SINGLE',
//     imageUrl:
//       'https://images.unsplash.com/photo-1613521140785-e85e427f8002?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//     unseenmsg: 0,
//   },
//   {
//     id: 45,
//     name: 'Vivek 2',
//     type: 'SINGLE',
//     liked: true,
//     imageUrl:
//       'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//     unseenmsg: 0,
//   },
//   {
//     id: 56,
//     name: 'Jhon',
//     type: 'SINGLE',
//     imageUrl:
//       'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//     liked: true,
//     unseenmsg: 0,
//   },
//   {
//     id: 200,
//     name: 'Friends Group',
//     type: 'GROUP',
//     grouproomid: '123',
//     imageUrl:
//       'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//     unseenmsg: 0,
//   },
// ];
// const requestdata = [
//   {
//     id: 7,
//     name: 'Jhon Doe',
//     type: 'SINGLE',
//     imageUrl:
//       'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//   },
//   {
//     id: 44,
//     name: 'Vivek',
//     type: 'SINGLE',
//     imageUrl:
//       'https://images.unsplash.com/photo-1613521140785-e85e427f8002?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
//   },
//   {
//     id: 45,
//     name: 'Collage Friends',
//     type: 'GROUP',
//     imageUrl:
//       'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D',
//   },
// ];

const FriendsList = () => {
  const navigation = useNavigation();
  const myuserid = useSelector(state => state.Auth.userid);
  const [selectedoptiontype, setselectedoptiontype] = useState('friends');
  const [showgroupmodal, setshowgroupmodal] = useState(false);
  const [grouplist, setgrouplist] = useState([]);
  const [filteredfriendsdata, setfilteredfriendsdata] = useState([]);
  const [filteredrequestdata, setfilteredrequestdata] = useState([]);
  const [searchfilter, setsearchfilter] = useState('');
  const [socketconnected, setsocketconnected] = useState(true);

  const {
    data: friendsdata2,
    isPending: friendsdatapending,
    error: friendserror,
    isError: friendsisError,
  } = useFetchFriends();

  const {
    data: requestdata2,
    isPending: requestdatapending,
    error: requesterror,
    isError: requestisError,
  } = useFetchFriendRequests();

  useEffect(() => {
    if (requestdata2?.data?.friends) {
      setfilteredrequestdata(requestdata2.data.friends);
    }
  }, [requestdata2]);

  useEffect(() => {
    if (friendsdata2?.data?.friends) {
      setfilteredfriendsdata(friendsdata2.data.friends);
    }
  }, [friendsdata2]);

  useEffect(() => {
    if (selectedoptiontype === 'friends' && friendsdata2?.data?.friends) {
      if (searchfilter) {
        setfilteredfriendsdata(
          friendsdata2.filter(item =>
            item.name.toLowerCase().includes(searchfilter.toLowerCase()),
          ),
        );
      } else {
        setfilteredfriendsdata(friendsdata2.data.friends);
      }
    }
    if (selectedoptiontype === 'requests' && requestdata2?.data?.friends) {
      if (searchfilter) {
        setfilteredrequestdata(
          requestdata2.data.friends.filter(item =>
            item.name.toLowerCase().includes(searchfilter.toLowerCase()),
          ),
        );
      } else {
        setfilteredrequestdata(requestdata2.data.friends);
      }
    }
  }, [searchfilter, selectedoptiontype]);

  const handlecreategroup = () => {
    console.log('grouplist', grouplist);
    setshowgroupmodal(false);
  };

  useEffect(() => {
    if (socket.connected) {
      setsocketconnected(true);
      if (friendsdata2?.data?.friends) {
        friendsdata2.data.friends.map(item => {
          if (item.type === 'GROUP') {
            socket.emit('join room', item.grouproomid);
          }
        });
      }
    } else {
      console.log('Socket not connected');
      setsocketconnected(false);
    }
  }, [friendsdata2]);

  useEffect(() => {
    const handleMessage = msg => {
      console.log('msg in friend list', msg);
      setfilteredfriendsdata(prevData =>
        prevData.map(item => {
          if (item.type === 'SINGLE' && msg.sender_id === item.id) {
            return {...item, unseenmsg: item.unseenmsg + 1};
          }
          if (
            item.type === 'GROUP' &&
            msg.receiver_id === item.grouproomid &&
            msg.sender_id !== myuserid
          ) {
            return {...item, unseenmsg: item.unseenmsg + 1};
          }
          return item;
        }),
      );
    };
    socket.on('chat message', handleMessage);
    return () => {
      socket.off('chat message', handleMessage);
    };
  }, []);

  if (!socketconnected) {
    setTimeout(() => {
      navigation.navigate('Discover');
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Network Error, Please try again later.',
        visibilityTime: 2000,
      });
    }, 2000);
    return <FriendsListSkeleton />;
  }
  if (requestdatapending || friendsdatapending) {
    return <Loading />;
  }

  console.log('friendsdata2', friendsdata2.data.friends);

  return (
    <GradientScreen>
      <View style={styles.container}>
        <View style={styles.headerbackcontainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <MaterialIcons
              name="arrow-back"
              size={24}
              color={colors.arrow.primary}
              style={{marginLeft: 20}}
            />
          </TouchableOpacity>

          {selectedoptiontype === 'friends' && (
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginRight: 20,
                gap: 3,
              }}
              onPress={() => setshowgroupmodal(true)}>
              <View
                style={{
                  backgroundColor: '#FF5A90',
                  padding: 5,
                  borderRadius: 50,
                }}>
                <AntDesign
                  name="plus"
                  size={24}
                  color="white"
                  style={{fontWeight: '900'}}
                />
              </View>
              <Text style={styles.headingtext2}> Create Group</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.headingsearchcontainer}>
          <GradientInput style={styles.gradientborder}>
            <View style={styles.inputcontainer}>
              <MaterialIcons
                name="search"
                size={18}
                color={colors.text.secondary}
              />
              <TextInput
                placeholder={
                  selectedoptiontype === 'friends'
                    ? 'Search Friends & Groups'
                    : 'Search Requests'
                }
                keyboardType="email-address"
                placeholderTextColor={colors.login.headingtext2}
                onChangeText={text => setsearchfilter(text)}
                value={searchfilter}
                cursorColor={colors.login.headingtext2}
                style={{color: colors.login.headingtext2, flex: 1}}
              />
            </View>
          </GradientInput>
        </View>
        <View style={styles.optionscontainer}>
          <TouchableOpacity onPress={() => setselectedoptiontype('friends')}>
            <Text
              style={[
                styles.optiontext,
                {
                  color:
                    selectedoptiontype === 'friends'
                      ? colors.arrow.tertiary
                      : colors.arrow.primary,
                },
              ]}>
              Friends
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setselectedoptiontype('requests')}>
            <Text
              style={[
                styles.optiontext,
                {
                  color:
                    selectedoptiontype === 'requests'
                      ? colors.arrow.tertiary
                      : colors.arrow.primary,
                },
              ]}>
              Requests
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.headingContainer}></View>
        <View style={styles.friendlistcontainer}>
          {selectedoptiontype === 'friends' ? (
            filteredfriendsdata.filter(item => item.id !== myuserid).length >
            0 ? (
              <FlatList
                data={filteredfriendsdata.filter(item => item.id !== myuserid)}
                keyExtractor={item => item.id.toString()}
                renderItem={({item, index}) => (
                  <SingleFriend data={item} index={index} />
                )}
                onEndReachedThreshold={0.1}
                showsVerticalScrollIndicator={false}
                numColumns={1}
                contentContainerStyle={{paddingBottom: 250}}
              />
            ) : (
              <Text
                style={{
                  color: colors.login.headingtext2,
                  marginTop: 80,
                  fontSize: 20,
                  fontWeight: '900',
                  textAlign: 'center',
                }}>
                No Friends Found
              </Text>
            )
          ) : filteredrequestdata.length > 0 ? (
            <FlatList
              data={filteredrequestdata}
              keyExtractor={item => item.friend_id.toString()}
              renderItem={({item, index}) => (
                <SingleRequest
                  data={item}
                  index={index}
                  setfilteredrequestdata={setfilteredrequestdata}
                />
              )}
              onEndReachedThreshold={0.1}
              showsVerticalScrollIndicator={false}
              numColumns={1}
              contentContainerStyle={{paddingBottom: 250}}
            />
          ) : (
            <Text
              style={{
                color: colors.login.headingtext2,
                marginTop: 80,
                fontSize: 20,
                fontWeight: '900',
                textAlign: 'center',
              }}>
              No Requests Found
            </Text>
          )}
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={showgroupmodal}
          onRequestClose={() => {
            setshowgroupmodal(!showgroupmodal);
          }}>
          <Pressable
            onPress={() => setshowgroupmodal(false)}
            style={{
              flex: 1,
            }}>
            <Pressable
              onPress={event => event.stopPropagation()}
              style={styles.GroupModal}>
              <View
                style={{
                  flex: 1,
                }}>
                <FlatList
                  data={friendsdata2.data.friends.filter(
                    item => item.type === 'SINGLE',
                  )}
                  keyExtractor={item => item.id.toString()}
                  renderItem={({item, index}) => (
                    <SelectFriend
                      data={item}
                      index={index}
                      grouplist={grouplist}
                      setgrouplist={setgrouplist}
                    />
                  )}
                  onEndReachedThreshold={0.1}
                  showsVerticalScrollIndicator={false}
                  numColumns={1}
                  contentContainerStyle={{paddingBottom: 20, paddingTop: 20}}
                />
              </View>

              <View
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  flexDirection: 'row',
                  marginBottom: 20,
                }}>
                <TouchableOpacity
                  style={{marginTop: 20}}
                  onPress={handlecreategroup}>
                  <GradientButton style={styles.submitbutton}>
                    <Text style={styles.submittext}>Create Group</Text>
                  </GradientButton>
                </TouchableOpacity>
              </View>
            </Pressable>
          </Pressable>
        </Modal>
      </View>
    </GradientScreen>
  );
};

export default FriendsList;

const styles = StyleSheet.create({
  GroupModal: {
    flex: 1,
    backgroundColor: colors.arrow.secondary,
    marginTop: 100,
    marginHorizontal: 10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  container: {
    flex: 1,
  },
  headerbackcontainer: {
    position: 'absolute',
    top: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  headingsearchcontainer: {
    marginTop: 60,
    marginHorizontal: 30,
  },
  gradientborder: {
    padding: 2,
    borderRadius: 30,
    overflow: 'hidden',
    width: '100%',
  },

  inputcontainer: {
    height: 47,
    backgroundColor: colors.text.primary,
    width: '100%',
    borderRadius: 28,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headingContainer: {
    width: '100%',
    marginTop: 0,
    marginLeft: 20,
  },
  optionscontainer: {
    marginLeft: 20,
    width: '100%',
    flexDirection: 'row',
    gap: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  optiontext: {
    fontFamily: 'Lexend',
    fontWeight: '900',
    fontSize: 18,
    lineHeight: 26,
  },
  headingtext: {
    fontFamily: 'Lexend',
    color: colors.login.headingtext,
    fontWeight: '900',
    fontSize: 24,
    lineHeight: 30,
  },

  headingtext2: {
    fontFamily: 'Lexend',
    color: colors.login.headingtext2,
    fontWeight: '900',
    fontSize: 16,
    lineHeight: 22.4,
  },
  friendlistcontainer: {
    marginTop: 10,
  },
  submitbutton: {
    width: 170,
    height: 55,
    borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },

  submittext: {
    fontFamily: 'Lexend',
    color: colors.text.primary,
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 22.5,
  },
});
