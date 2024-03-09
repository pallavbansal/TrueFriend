import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../Styles/ColorData';
import GradientScreen from '../Layouts/GradientScreen';
import GradientInput from '../Components/Common/GradientInput';
import BottomBar from '../Layouts/BottomBar';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import SingleFriend from '../Components/FriendList/SingleFriend';
import SingleRequest from '../Components/FriendList/SingleRequest';
import socket from '../Socket/Socket';
import {useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';
import FriendsListSkeleton from '../Layouts/Skeletions/FriendsListSkeleton';
import CreateGroupModal from '../Components/FriendList/CreateGroupModal';
import MyLoadingIndicator from '../Components/Common/MyLoadingIndicator';
import Loading from './Loading';
import {
  useFetchFriends,
  useFetchFriendRequests,
  useFetchChattingFriends,
} from '../Hooks/Query/RequestQuery';
import {useRefreshData} from '../Hooks/Custom/useRefreshData';

const FriendsList = () => {
  const navigation = useNavigation();
  const {refreshing, onRefresh} = useRefreshData();
  const myuserid = useSelector(state => state.Auth.userid);
  const [selectedoptiontype, setselectedoptiontype] = useState('chats');
  const [showgroupmodal, setshowgroupmodal] = useState(false);
  const [filteredchattingfriendsdata, setfilteredchattingfriendsdata] =
    useState([]);
  const [filteredfriendsdata, setfilteredfriendsdata] = useState([]);
  const [filteredrequestdata, setfilteredrequestdata] = useState([]);
  const [searchfilter, setsearchfilter] = useState('');
  const [activechat, setactivechat] = useState({
    type: '',
    id: '',
  });
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

  const {
    data: chattingfriendsdata,
    isPending: chattingfriendspending,
    error: chattingfriendserror,
    isError: chattingfriendsisError,
  } = useFetchChattingFriends();

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
    if (chattingfriendsdata) {
      setfilteredchattingfriendsdata(chattingfriendsdata);
    }
  }, [chattingfriendsdata]);

  useEffect(() => {
    if (selectedoptiontype === 'friends' && friendsdata2?.data?.friends) {
      if (searchfilter) {
        setfilteredfriendsdata(
          friendsdata2.data.friends.filter(item =>
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
    if (selectedoptiontype === 'chats' && chattingfriendsdata) {
      if (searchfilter) {
        setfilteredchattingfriendsdata(
          chattingfriendsdata.filter(item =>
            item.name.toLowerCase().includes(searchfilter.toLowerCase()),
          ),
        );
      } else {
        setfilteredchattingfriendsdata(chattingfriendsdata);
      }
    }
  }, [searchfilter, selectedoptiontype]);

  useEffect(() => {
    if (socket.connected) {
      setsocketconnected(true);
      if (chattingfriendsdata) {
        chattingfriendsdata.map(item => {
          if (item.type === 'GROUP') {
            socket.emit('join room', item.grouproomid);
          }
        });
      }
    }
  }, [chattingfriendsdata]);

  useEffect(() => {
    const handleMessage = msg => {
      console.log('msg in friend list', msg, activechat);
      // console.log('myid', myuserid);
      if (msg.sender_id === myuserid) return;
      if (msg.type === activechat.type && msg.sender_id === activechat.id)
        return;

      // console.log('chats', chattingfriendsdata);

      setfilteredchattingfriendsdata(prevData =>
        prevData.map(item => {
          if (
            item.type === 'SINGLE' &&
            msg.chattype === 'SINGLE' &&
            msg.sender_id === item.id
          ) {
            return {...item, unseenmsg: item.unseenmsg + 1};
          }
          if (
            item.type === 'GROUP' &&
            msg.chattype === 'GROUP' &&
            msg.receiver_id === item.grouproomid
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

  useEffect(() => {
    console.log('trying to connect to socket server in friendlist.js');
    socket.on('connect', () => {
      console.log('connected to socket server in friendlist.js');
      console.log('socket id:', socket.id, socket.connected);
      socket.emit('register', myuserid);
    });
  }, []);

  const handleChatClick = data => {
    console.log('data in handle chat', data);
    console.log(filteredchattingfriendsdata);
    setfilteredchattingfriendsdata(prevData =>
      prevData.map(item => {
        if (item.id === data.userid && item.type === data.type) {
          return {...item, unseenmsg: 0};
        }
        return item;
      }),
    );
    setactivechat({
      type: data.type,
      id: data.userid,
    });
  };

  // if (!socketconnected) {
  //   setTimeout(() => {
  //     navigation.navigate('Discover');
  //     Toast.show({
  //       type: 'error',
  //       text1: 'Error',
  //       text2: 'Network Error, Please try again later.',
  //       visibilityTime: 2000,
  //     });
  //   }, 2000);
  //   return <FriendsListSkeleton />;
  // }

  if (requestdatapending || friendsdatapending || chattingfriendspending) {
    return <Loading />;
  }

  return (
    <GradientScreen>
      <View style={styles.container}>
        <MyLoadingIndicator isRefreshing={refreshing} />
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
                    ? 'Search All Friends'
                    : selectedoptiontype === 'requests'
                    ? 'Search Requests'
                    : 'Search Chats'
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
          <TouchableOpacity onPress={() => setselectedoptiontype('chats')}>
            <Text
              style={[
                styles.optiontext,
                {
                  color:
                    selectedoptiontype === 'chats'
                      ? colors.arrow.tertiary
                      : colors.arrow.primary,
                },
              ]}>
              Chats
            </Text>
          </TouchableOpacity>
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

        <View style={styles.friendlistcontainer}>
          {selectedoptiontype === 'friends' ? (
            filteredfriendsdata.filter(item => item.id !== myuserid).length >
            0 ? (
              <FlatList
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={() => onRefresh(['fetchFriends'])}
                    progressViewOffset={-500}
                  />
                }
                data={filteredfriendsdata.filter(item => item.id !== myuserid)}
                keyExtractor={item => item.id.toString()}
                renderItem={({item, index}) => (
                  <SingleFriend
                    data={item}
                    index={index}
                    hideunseen={true}
                    handleChatClick={handleChatClick}
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
                No Friends Found
              </Text>
            )
          ) : selectedoptiontype === 'requests' ? (
            filteredrequestdata.length > 0 ? (
              <FlatList
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={() => onRefresh(['fetchFriendRequests'])}
                    progressViewOffset={-500}
                  />
                }
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
            )
          ) : selectedoptiontype === 'chats' ? (
            filteredchattingfriendsdata.length > 0 ? (
              <FlatList
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={() => onRefresh(['fetchChattingFriends'])}
                    progressViewOffset={-500}
                  />
                }
                data={filteredchattingfriendsdata}
                keyExtractor={(item, index) => index.toString()}
                // keyExtractor={item => item.id.toString()}
                renderItem={({item, index}) => (
                  <SingleFriend
                    data={item}
                    index={index}
                    hideunseen={false}
                    handleChatClick={handleChatClick}
                  />
                )}
                onEndReachedThreshold={0.1}
                showsVerticalScrollIndicator={false}
                numColumns={1}
                contentContainerStyle={{
                  paddingBottom: 250,
                }}
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
                No Chats Found
              </Text>
            )
          ) : null}
        </View>
        <CreateGroupModal
          showgroupmodal={showgroupmodal}
          setshowgroupmodal={setshowgroupmodal}
          friendsdata2={friendsdata2}
        />
        <BottomBar />
      </View>
    </GradientScreen>
  );
};

export default FriendsList;

const styles = StyleSheet.create({
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
