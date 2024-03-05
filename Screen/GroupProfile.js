import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useFetchGroupData} from '../Hooks/Query/ChatQuery';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import GradientScreen from '../Layouts/GradientScreen';
import Loading from './Loading';
import GradientInput from '../Components/Common/GradientInput';
import SingleGroupItem from '../Components/Group/SingleGroupItem';
import BottomBar from '../Layouts/BottomBar';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../Styles/ColorData';
import {useEditGroupName} from '../Hooks/Query/ChatQuery';
import {useFetchFriends} from '../Hooks/Query/RequestQuery';
import AddMemberModal from '../Components/Group/AddMemberModal';
import {useQueryClient} from '@tanstack/react-query';

const GroupProfile = ({route}) => {
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  const groupid = route.params.groupid;
  const myid = useSelector(state => state.Auth.userid);
  const {data, isPending, error, isError} = useFetchGroupData(groupid);
  const {
    data: friendsdata2,
    isPending: friendsdatapending,
    error: friendserror,
    isError: friendsisError,
  } = useFetchFriends();
  const {
    mutate: editgroupname,
    isPending: editnamepending,
    error: editnameerror,
    reset: editnamereset,
  } = useEditGroupName();
  const [showgroupmodal, setshowgroupmodal] = useState(false);
  const [groupusers, setgroupusers] = useState([]);
  const [editname, seteditname] = useState(false);
  const [name, setname] = useState('');
  const [adminid, setadminid] = useState('');

  useEffect(() => {
    if (data?.data?.group.users) {
      const adminid2 = data?.data?.group.users.find(user => {
        if (user.admin === true) {
          return user;
        }
      });
      setadminid(adminid2.user_id);
      setgroupusers(data?.data?.group.users);
    }
  }, [data]);

  const handleeditprofile = () => {
    seteditname(true);
  };

  const handlenamecancel = () => {
    setname('');
    seteditname(false);
  };

  const handlesavename = () => {
    if (name === '') {
      seteditname(false);
      return;
    }
    const finaldata = {
      name: name,
      group_id: groupid,
    };
    editgroupname(
      {data: finaldata},
      {
        onSuccess: data => {
          if (data.status_code == 1) {
            console.log('Group name updated', data);
            queryClient.invalidateQueries({queryKey: ['fetchChattingFriends']});
            navigation.navigate('FriendsList');
            seteditname(false);
          }
        },
      },
    );
  };

  const handleremoved = id => {
    setgroupusers(prev => {
      return prev.filter(user => user.user.id !== id);
    });
  };

  if (isPending || friendsdatapending) {
    return <Loading />;
  }

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
            <Text style={styles.headingtext2}> Add Members</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.statscontainer}>
          <View
            style={{
              flexDirection: 'row',
              gap: 10,
              alignItems: 'center',
            }}>
            {!editname && (
              <Text style={styles.text1}>{data?.data?.group.name}</Text>
            )}
            {!editname && myid == adminid && (
              <View style={styles.editbutton}>
                <TouchableOpacity onPress={handleeditprofile}>
                  <AntDesign name="edit" size={18} color="white" />
                </TouchableOpacity>
              </View>
            )}
            {editname && (
              <View style={styles.headingsearchcontainer}>
                <GradientInput style={styles.gradientborder}>
                  <View style={styles.inputcontainer}>
                    <TextInput
                      placeholder="Enter Name"
                      keyboardType="email-address"
                      placeholderTextColor={colors.login.headingtext2}
                      onChangeText={text => setname(text)}
                      value={name}
                      cursorColor={colors.login.headingtext2}
                      style={{color: colors.login.headingtext2, flex: 1}}
                    />
                  </View>
                </GradientInput>

                <View
                  style={{
                    flexDirection: 'row',
                    gap: 10,
                    marginTop: 10,
                  }}>
                  <TouchableOpacity
                    style={styles.deletebutton}
                    onPress={handlesavename}>
                    <Text
                      style={{
                        color: 'white',
                        fontWeight: '500',
                      }}>
                      Save
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.deletebutton}
                    onPress={handlenamecancel}>
                    <Text
                      style={{
                        color: 'white',
                        fontWeight: '500',
                      }}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>

          <Text style={styles.text2}>{groupusers.length} Members</Text>
        </View>
        <View style={styles.friendlistcontainer}>
          <FlatList
            data={groupusers}
            keyExtractor={item => item.id.toString()}
            renderItem={({item, index}) => (
              <SingleGroupItem
                data={item}
                index={index}
                myid={myid}
                adminid={adminid}
                groupid={groupid}
                handleremoved={handleremoved}
              />
            )}
            onEndReachedThreshold={0.1}
            showsVerticalScrollIndicator={false}
            numColumns={1}
            contentContainerStyle={{paddingBottom: 250}}
          />
        </View>
        <AddMemberModal
          showgroupmodal={showgroupmodal}
          setshowgroupmodal={setshowgroupmodal}
          friendsdata2={friendsdata2}
          alreadymembers={groupusers}
          groupid={groupid}
        />
        <BottomBar />
      </View>
    </GradientScreen>
  );
};

export default GroupProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
  },

  headerbackcontainer: {
    position: 'absolute',
    top: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  text1: {
    color: colors.login.headingtext2,
    fontSize: 24,
    fontWeight: '900',
  },
  text2: {
    color: colors.login.headingtext2,
    fontSize: 16,
    fontWeight: '900',
  },
  statscontainer: {
    marginTop: 70,
    marginHorizontal: 20,
    gap: 10,
    alignItems: 'center',
  },
  actioncontainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },

  headingtext2: {
    fontFamily: 'Lexend',
    color: colors.login.headingtext2,
    fontWeight: '900',
    fontSize: 16,
    lineHeight: 22.4,
  },
  editbutton: {
    backgroundColor: colors.profile.edit,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    padding: 5,
  },
  headingsearchcontainer: {
    marginHorizontal: 10,
    // flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 5,
  },
  gradientborder: {
    padding: 2,
    borderRadius: 30,
    overflow: 'hidden',
    width: '80%',
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
  deletebutton: {
    width: 65,
    height: 30,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2942C7',
  },
});
