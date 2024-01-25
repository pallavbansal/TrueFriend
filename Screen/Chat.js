import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import GradientScreen from '../Layouts/GradientScreen';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../Styles/ColorData';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ReportUser from '../Components/Chat/ReportUser';
import Message from '../Components/Chat/Message';

const MessageData = [
  {
    id: '1',
    message:
      'Hello dndi knoe kdmld omsld ddd dm odd modm w dkfed fmde dfle djfode demdoedd  dled e dfmew kdmfe mfel dfmled lfe flm',
    sender: '1',
    senderName: 'You',
    receiver: '2',
    time: '10:00 AM',
  },
  {
    id: '2',
    message: 'Hi',
    sender: '2',
    senderName: 'Rahul Singh',
    receiver: '1',
    time: '10:00 PM',
  },
  {
    id: '3',
    message: 'How are you?',
    sender: '1',
    senderName: 'You',
    receiver: '2',
    time: '10:00 AM',
  },
  {
    id: '4',
    message: 'I am fine',
    sender: '2',
    senderName: 'Rahul Singh',
    receiver: '1',
    time: '10:00 PM',
  },
  {
    id: '5',
    message: 'What about you?',
    sender: '2',
    senderName: 'Rahul Singh',
    receiver: '1',
    time: '10:00 AM',
  },
  {
    id: '6',
    message: 'I am fine',
    sender: '1',
    senderName: 'You',
    receiver: '2',
    time: '10:00 PM',
  },
  {
    id: '7',
    message: 'What about you?',
    sender: '1',
    senderName: 'You',
    receiver: '2',
    time: '10:00 AM',
  },
  {
    id: '8',
    message: 'I am fine',
    sender: '2',
    senderName: 'Rahul Singh',
    receiver: '1',
    time: '10:00 PM',
  },
  {
    id: '9',
    message: 'What about you?',
    sender: '2',
    senderName: 'Rahul Singh',
    receiver: '1',
    time: '10:00 AM',
  },
  {
    id: '10',
    message: 'I am fine',
    sender: '1',
    senderName: 'You',
    receiver: '2',
    time: '10:00 PM',
  },
  {
    id: '11',
    message: 'What about you?',
    sender: '1',
    senderName: 'You',
    receiver: '2',
    time: '10:00 AM',
  },
  {
    id: '12',
    message: 'I am fine',
    sender: '2',
    senderName: 'Rahul Singh',
    receiver: '1',
    time: '10:00 PM',
  },
  {
    id: '13',
    message: 'What about you?',
    sender: '2',
    senderName: 'Rahul Singh',
    receiver: '1',
    time: '10:00 AM',
  },
];

const Chat = ({route}) => {
  const {userid, name, imageUrl} = route.params;
  const [reportdialog, setreportdialog] = useState(false);
  const handlerreportdialog = () => {
    setreportdialog(!reportdialog);
  };

  return (
    <GradientScreen>
      <View style={styles.container}>
        <LinearGradient
          colors={colors.gradients.buttongradient}
          style={styles.headercontainer}>
          <View>
            <Image
              source={{uri: imageUrl}}
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                borderWidth: 1,
                borderColor: 'white',
              }}
            />
          </View>
          <View>
            <Text style={styles.headingtext2}>{name}</Text>
          </View>
          <View style={{flexDirection: 'row', gap: 10, marginLeft: 'auto'}}>
            <TouchableOpacity>
              <Ionicons name="call" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity>
              <FontAwesome5 name="video" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handlerreportdialog}>
              <Entypo name="dots-three-vertical" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </LinearGradient>
        {reportdialog && <ReportUser close={handlerreportdialog} />}

        <View style={styles.chatcontainer}>
          <FlatList
            data={MessageData}
            keyExtractor={item => item.id.toString()}
            renderItem={({item, index}) => (
              <Message MessageData={item} index={index} />
            )}
            onEndReachedThreshold={0.1}
            showsVerticalScrollIndicator={false}
            numColumns={1}
            contentContainerStyle={{paddingBottom: 80}}
          />
        </View>
        <View style={styles.bottomcontainer}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: colors.text.primary,
              gap: 10,
            }}>
            <TextInput
              placeholder="Type a message"
              placeholderTextColor={colors.login.headingtext2}
              cursorColor={colors.login.headingtext2}
              style={{
                color: colors.login.headingtext2,
                fontWeight: '900',
                flex: 1,
                borderRadius: 20,
                paddingHorizontal: 20,
                margin: 5,
              }}
            />
            <TouchableOpacity>
              <Entypo
                name="attachment"
                size={24}
                color={colors.arrow.secondary}
              />
            </TouchableOpacity>
            <TouchableOpacity style={{marginRight: 10}}>
              <MaterialIcons
                name="send"
                size={24}
                color={colors.arrow.secondary}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </GradientScreen>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headercontainer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    width: '100%',
  },
  bottomcontainer: {
    backgroundColor: 'red',
    position: 'fixed',
    bottom: 0,
  },
  headingtext2: {
    fontFamily: 'Lexend',
    color: colors.text.primary,
    fontWeight: '900',
    fontSize: 18,
    lineHeight: 26,
  },
  chatcontainer: {
    flex: 1,
    // backgroundColor: 'blue',
  },
});
