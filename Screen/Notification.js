import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import GradientScreen from '../Layouts/GradientScreen';
import GradientText from '../Components/Common/GradientText';
import {colors} from '../Styles/ColorData';
import SingleNotification from '../Components/Notification/SingleNotification';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {useRefreshData} from '../Hooks/Custom/useRefreshData';
import socket from '../Socket/Socket';
import MyLoadingIndicator from '../Components/Common/MyLoadingIndicator';
import {useFetchNotifications} from '../Hooks/Query/NotificationQuery';

// like,newmessage,newrequest,missedcall

const data = [
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
  const {
    data: NotificationData,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    isFetching,
  } = useFetchNotifications();
  // const [notifidata, setNotifidata] = useState(data);
  const [notifidata, setNotifidata] = useState([]);
  const navigation = useNavigation();
  const {refreshing, onRefresh} = useRefreshData();

  useEffect(() => {
    if (NotificationData) {
      const newdata = NotificationData.pages
        .map(page => page.data.notifications.data)
        .flat();
      setNotifidata(newdata);
    }
  }, [NotificationData]);

  // useEffect(() => {
  //   const handleNotification = data => {
  //     console.log('Received notification:', data);
  //     const newdata = {
  //       ...data,
  //       id: notifidata.length + 1 + Math.random() * 1000,
  //     };
  //     setNotifidata(prev => [newdata, ...prev]);
  //   };

  //   socket.on('notification', handleNotification);

  //   // Cleanup function
  //   return () => {
  //     socket.off('notification', handleNotification);
  //   };
  // }, []);

  // const handletext = () => {
  //   socket.emit('notification', {
  //     receiverid: 44,
  //     id: notifidata.length + 1,
  //     title: 'John Doe',
  //     type: 'like',
  //     text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  //     time: '03:00 PM',
  //     date: '12/12/2020',
  //   });
  // };

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
              style={{marginLeft: 20, marginTop: 10}}
            />
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={handletext}>
            <MaterialIcons
              name="arrow-back"
              size={24}
              color={colors.arrow.primary}
              style={{marginLeft: 200}}
            />
          </TouchableOpacity> */}
        </View>
        <View style={styles.headingContainer}>
          <Text style={styles.headingtext}>Notifications</Text>
          <Text style={styles.headingtext2}>
            Check notifications, respond & keep dating
          </Text>
        </View>

        <View style={styles.notificationcontainer}>
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => onRefresh(['fetchNotifications'])}
                progressViewOffset={-500}
              />
            }
            data={notifidata}
            keyExtractor={item => item.id.toString()}
            renderItem={({item, index}) => (
              <SingleNotification data={item} index={index} />
            )}
            onEndReachedThreshold={0.1}
            onEndReached={fetchNextPage}
            showsVerticalScrollIndicator={false}
            numColumns={1}
            contentContainerStyle={{paddingBottom: 200}}
          />
        </View>
        {isFetching || isFetchingNextPage ? (
          <View
            style={{
              position: 'absolute',
              bottom: 60,
              width: '100%',
              backgroundColor: 'transparent',
              alignItems: 'center',
            }}>
            <View
              style={{
                paddingHorizontal: 20,
                paddingVertical: 5,
                borderRadius: 20,
                backgroundColor: colors.text.primary,
              }}>
              <GradientText style={styles.headingtext2}>
                Fetching...
              </GradientText>
            </View>
          </View>
        ) : null}
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
    marginTop: 50,
    marginLeft: 20,
    marginBottom: 10,
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
