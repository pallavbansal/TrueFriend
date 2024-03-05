import {
  View,
  Text,
  Modal,
  Pressable,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import GradientButton from '../Common/GradientButton';
import React, {useState, useEffect} from 'react';
import GradientText from '../Common/GradientText';
import {colors} from '../../Styles/ColorData';
import SelectFriend from '../FriendList/SelectFriend';
import {useAddUserToGroup} from '../../Hooks/Query/ChatQuery';
import {useNavigation} from '@react-navigation/native';

const AddMemberModal = ({
  showgroupmodal,
  setshowgroupmodal,
  friendsdata2,
  alreadymembers,
  groupid,
}) => {
  const navigation = useNavigation();
  let FinalFriendsData = friendsdata2?.data?.friends
    ? friendsdata2?.data?.friends
    : [];

  const alreadyMemberIds = alreadymembers.map(member => member.user.id);
  FinalFriendsData = FinalFriendsData.filter(
    friend => !alreadyMemberIds.includes(friend.id),
  );

  const {isPending, error, mutate, reset} = useAddUserToGroup();
  const [showerrors, setshowerrors] = useState(false);
  const [grouplist, setgrouplist] = useState([]);

  useEffect(() => {
    setgrouplist([]);
    setshowerrors(false);
  }, [showgroupmodal]);

  const handlecreategroup = () => {
    if (grouplist.length === 0) {
      setshowerrors(true);
      return;
    }
    const finaldata = {
      group_id: groupid,
      user_ids: grouplist,
    };

    mutate(
      {
        data: finaldata,
      },
      {
        onSuccess: data => {
          if (data.status_code === 1) {
            setshowgroupmodal(false);
            setgrouplist([]);
            navigation.navigate('FriendsList');
          }
        },
      },
    );
  };

  return (
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
          {FinalFriendsData.length > 0 ? (
            <>
              <View
                style={{
                  flex: 1,
                }}>
                <FlatList
                  data={FinalFriendsData.filter(item => item.type === 'SINGLE')}
                  keyExtractor={item => item.id.toString()}
                  renderItem={({item, index}) => (
                    <SelectFriend
                      data={item}
                      index={index}
                      setgrouplist={setgrouplist}
                    />
                  )}
                  onEndReachedThreshold={0.1}
                  showsVerticalScrollIndicator={false}
                  numColumns={1}
                  contentContainerStyle={{paddingBottom: 20, paddingTop: 20}}
                />
              </View>

              {showerrors && grouplist.length === 0 && (
                <View
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    marginBottom: 20,
                  }}>
                  <GradientText>Please select at least one friend</GradientText>
                </View>
              )}

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
                    <Text style={styles.submittext}>
                      {isPending ? 'Adding Members...' : 'Add Members'}
                    </Text>
                  </GradientButton>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: 'Lexend',
                  color: 'white',
                  fontWeight: '900',
                  fontSize: 16,
                  lineHeight: 22.4,
                }}>
                No Friends to Add
              </Text>
            </View>
          )}
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default AddMemberModal;

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
  headingtext2: {
    fontFamily: 'Lexend',
    color: colors.login.headingtext2,
    fontWeight: '900',
    fontSize: 16,
    lineHeight: 22.4,
  },
});
