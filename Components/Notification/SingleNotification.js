import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {normalize} from 'react-native-elements';

function SingleNotificationicon({type}) {
  if (type == 'like') {
    return (
      <View
        style={[
          styles.iconcontainer,
          {
            backgroundColor: '#F74A69',
          },
        ]}>
        <AntDesign name="heart" size={28} color="white" />
      </View>
    );
  }
  if (type == 'newmessage') {
    return (
      <View
        style={[
          styles.iconcontainer,
          {
            backgroundColor: '#03A94F',
          },
        ]}>
        <Ionicons name="mail" size={28} color="white" />
      </View>
    );
  }
  if (type == 'newrequest') {
    return (
      <View
        style={[
          styles.iconcontainer,
          {
            backgroundColor: '#8D49EE',
          },
        ]}>
        <FontAwesome5 name="user-friends" size={28} color="white" />
      </View>
    );
  }
  if (type == 'missedcall') {
    return (
      <View
        style={[
          styles.iconcontainer,
          {
            backgroundColor: '#F74A69',
          },
        ]}>
        <MaterialCommunityIcons name="phone-missed" size={28} color="white" />
      </View>
    );
  }
}

const SingleNotification = ({data}) => {
  return (
    <View>
      <View style={styles.noticontainer}>
        <SingleNotificationicon type={data.type} />
        <View style={{flex: 1}}>
          <Text style={styles.text1}>{data.title}</Text>
          <Text style={styles.text2}>{data.text}</Text>
          <View style={{flexDirection: 'row', gap: 10}}>
            <Text style={styles.text3}>{data.time}</Text>
            <Text style={styles.text3}>|</Text>
            <Text style={styles.text3}>{data.date}</Text>
          </View>
          {data.type == 'newrequest' && (
            <View style={{flexDirection: 'row', gap: 10, marginTop: 10}}>
              <TouchableOpacity style={styles.followbutton}>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: '500',
                  }}>
                  Follow back
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.ignorebutton}>
                <Text
                  style={{
                    color: 'black',
                    fontWeight: '500',
                  }}>
                  Ignore
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

export default SingleNotification;

const styles = StyleSheet.create({
  noticontainer: {
    flexDirection: 'row',
    gap: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    padding: 10,
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
    color: '#33196B',
    fontSize: 16,
    fontWeight: '900',
  },
  text2: {
    color: '#745594',
    fontSize: 14,
    fontWeight: '700',
  },
  text3: {
    color: '#4635E2',
    fontSize: 12,
    fontWeight: '500',
  },

  divider: {
    height: 1.5,
    backgroundColor: '#DFD2F3',
    marginHorizontal: 10,
  },
  followbutton: {
    height: 30,
    width: 106,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8D49EE',
    paddingHorizontal: 10,
  },
  ignorebutton: {
    height: 30,
    width: 106,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DDDDDD',
    paddingHorizontal: 10,
  },
});
