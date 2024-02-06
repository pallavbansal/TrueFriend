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
import React, {useState} from 'react';
import {colors} from '../Styles/ColorData';
import GradientScreen from '../Layouts/GradientScreen';
import GradientInput from '../Components/Common/GradientInput';
import GradientButton from '../Components/Common/GradientButton';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import SingleFriend from '../Components/FriendList/SingleFriend';
import SelectFriend from '../Components/FriendList/SelectFriend';

const data = [
  {
    id: 7,
    name: 'Jhon Doe',
    type: 'single',
    liked: true,
    imageUrl:
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 44,
    name: 'Vivek',
    type: 'single',
    imageUrl:
      'https://images.unsplash.com/photo-1613521140785-e85e427f8002?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 45,
    name: 'Vivek 2',
    type: 'single',
    liked: true,
    imageUrl:
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 56,
    name: 'Jhon',
    type: 'single',
    imageUrl:
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=1854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    liked: true,
  },
  {
    id: 200,
    name: 'Friends Group',
    type: 'group',
    grouproomid: '123',
    imageUrl:
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 201,
    name: 'Mohit Sharma',
    type: 'single',
    imageUrl:
      'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: 202,
    name: 'XYZ',
    type: 'single',
    imageUrl:
      'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

const FriendsList = () => {
  const navigation = useNavigation();
  const [showgroupmodal, setshowgroupmodal] = useState(false);
  const [grouplist, setgrouplist] = useState([]);

  const handlecreategroup = () => {
    console.log('grouplist', grouplist);
    setshowgroupmodal(false);
  };
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
            <Text style={styles.headingtext2}> Create Group</Text>
          </TouchableOpacity>
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
                placeholder="Search Message, Match"
                keyboardType="email-address"
                placeholderTextColor={colors.login.headingtext2}
                cursorColor={colors.login.headingtext2}
                style={{color: colors.login.headingtext2, flex: 1}}
              />
            </View>
          </GradientInput>
        </View>
        <View style={styles.headingContainer}>
          <Text style={[styles.headingtext, {marginBottom: 5, marginTop: 20}]}>
            Friend List
          </Text>
          <Text style={styles.headingtext2}>
            Check out friends list & keep enjoying
          </Text>
        </View>
        <View style={styles.friendlistcontainer}>
          <FlatList
            data={data}
            keyExtractor={item => item.id.toString()}
            renderItem={({item, index}) => (
              <SingleFriend data={item} index={index} />
            )}
            onEndReachedThreshold={0.1}
            showsVerticalScrollIndicator={false}
            numColumns={1}
            contentContainerStyle={{paddingBottom: 250}}
          />
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
                  data={data.filter(item => item.type === 'single')}
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
    marginTop: 80,
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
    marginTop: 10,
    marginLeft: 20,
    // marginBottom: 20,
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
