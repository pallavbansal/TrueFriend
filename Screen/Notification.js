import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import GradientScreen from '../Layouts/GradientScreen';
import {colors} from '../Styles/ColorData';
import SingleNotification from '../Components/Notification/SingleNotification';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

// like,newmessage,newrequest,missedcall

const notifidata = [
  {
    id: 1,
    type: 'like',
    title: 'John Doe',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing.',
    time: '03:00 PM',
    date: '12/12/2020',
  },
  {
    id: 2,
    type: 'newmessage',
    title: 'John Doe',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    time: '03:00 PM',
    date: '12/12/2020',
  },
  {
    id: 3,
    type: 'newrequest',
    title: 'John Doe',
    text: 'Lorem ipsum dolor sit amet, consectetur ',
    time: '03:00 PM',
    date: '12/12/2020',
  },
  {
    id: 4,
    type: 'missedcall',
    title: 'John Doe',
    text: 'Lorem ipsum dolor sit amet, ',
    time: '03:00 PM',
    date: '12/12/2020',
  },
  {
    id: 5,
    type: 'like',
    title: 'John Doe',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ',
    time: '03:00 PM',
    date: '12/12/2020',
  },
  {
    id: 6,
    type: 'newmessage',
    title: 'John Doe',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing',
    time: '03:00 PM',
    date: '12/12/2020',
  },
  {
    id: 7,
    type: 'newrequest',
    title: 'John Doe',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    time: '03:00 PM',
    date: '12/12/2020',
  },
  {
    id: 8,
    type: 'missedcall',
    title: 'John Doe',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    time: '03:00 PM',
    date: '12/12/2020',
  },
];

const Notification = () => {
  const navigation = useNavigation();
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
              style={{marginLeft: 20, marginTop: 30}}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.headingContainer}>
          <Text style={[styles.headingtext, {marginBottom: 5, marginTop: 20}]}>
            Notifications
          </Text>
          <Text style={styles.headingtext2}>
            Check notifications, respond & keep dating
          </Text>
        </View>

        <View style={styles.notificationcontainer}>
          <FlatList
            data={notifidata}
            keyExtractor={item => item.id.toString()}
            renderItem={({item, index}) => (
              <SingleNotification data={item} index={index} />
            )}
            onEndReachedThreshold={0.1}
            showsVerticalScrollIndicator={false}
            numColumns={1}
            contentContainerStyle={{paddingBottom: 200}}
          />
        </View>
      </View>
    </GradientScreen>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerbackcontainer: {
    position: 'absolute',
    top: 0,
  },
  headingContainer: {
    width: '100%',
    marginTop: 60,
    marginLeft: 20,
    marginBottom: 20,
  },
  headingtext: {
    fontFamily: 'Lexend',
    color: colors.login.headingtext,
    fontWeight: '900',
    fontSize: 36,
    lineHeight: 36,
  },

  headingtext2: {
    fontFamily: 'Lexend',
    color: colors.login.headingtext2,
    fontWeight: '900',
    fontSize: 14,
    lineHeight: 22.4,
  },

  notificationcontainer: {},
});
