import {
  View,
  Text,
  Modal,
  Pressable,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import GradientButton from '../Common/GradientButton';
import SelectFriend from './SelectFriend';
import React, {useState, useEffect} from 'react';
import GradientText from '../Common/GradientText';
import GradientInput from '../Common/GradientInput';
import {colors} from '../../Styles/ColorData';
import {useCreateGroup} from '../../Hooks/Query/ChatQuery';

const CreateGroupModal = ({
  showgroupmodal,
  setshowgroupmodal,
  friendsdata2,
}) => {
  const FinalFriendsData = friendsdata2?.data?.friends
    ? friendsdata2?.data?.friends
    : [];
  const {isPending, error, mutate, reset} = useCreateGroup();
  const [showerrors, setshowerrors] = useState(false);
  const [grouplist, setgrouplist] = useState([]);
  const [name, setname] = useState('');

  useEffect(() => {
    setname('');
    setgrouplist([]);
    setshowerrors(false);
  }, [showgroupmodal]);

  const handlecreategroup = () => {
    if (grouplist.length === 0 || name === '') {
      setshowerrors(true);
      return;
    }
    const finaldata = {
      name: name,
      user_ids: grouplist,
    };
    mutate(
      {data: finaldata},
      {
        onSuccess: data => {
          console.log('Group Created', data);
          setshowgroupmodal(false);
          setgrouplist([]);
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
          <View style={styles.headingsearchcontainer}>
            <GradientInput style={styles.gradientborder}>
              <View style={styles.inputcontainer}>
                <TextInput
                  placeholder="Enter Group Name"
                  keyboardType="email-address"
                  placeholderTextColor={colors.login.headingtext2}
                  onChangeText={text => setname(text)}
                  value={name}
                  cursorColor={colors.login.headingtext2}
                  style={{color: colors.login.headingtext2, flex: 1}}
                />
              </View>
            </GradientInput>
          </View>
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

          {showerrors && (grouplist.length === 0 || name === '') && (
            <View
              style={{
                width: '100%',
                justifyContent: 'center',
                flexDirection: 'row',
                marginBottom: 20,
              }}>
              <GradientText>Please fill all the fields</GradientText>
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
                  {isPending ? 'Creating...' : 'Create Group'}
                </Text>
              </GradientButton>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default CreateGroupModal;

const styles = StyleSheet.create({
  GroupModal: {
    flex: 1,
    // backgroundColor: colors.arrow.secondary,
    backgroundColor: colors.text.primary,
    marginTop: 10,
    marginHorizontal: 5,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  headingsearchcontainer: {
    marginTop: 20,
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
