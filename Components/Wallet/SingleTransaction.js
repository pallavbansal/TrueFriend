import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors} from '../../Styles/ColorData';
import ProfileNavigator from '../Common/ProfileNavigator';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const SingleTransaction = ({data, setModalVisible}) => {
  const navigation = useNavigation();
  const myid = useSelector(state => state.Auth.userid);

  const handlenavigate = id => {
    setModalVisible({
      visible: false,
      type: null,
    });

    if (id == myid) {
      return navigation.navigate('Profile');
    } else {
      return navigation.navigate('ProfileById', {userid: id});
    }
  };

  let description = data.amount >= 0 ? 'Received on' : 'Sent on';
  description = description + ' ' + data.date + ' at ' + data.time;

  return (
    <View style={styles.optioncard2}>
      <TouchableOpacity onPress={() => handlenavigate(data.user.id)}>
        <Image
          source={{uri: data.user.imageurl}}
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
          }}
          resizeMode="contain"
        />
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          padding: 10,
          gap: 5,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={styles.headingtext2}>{data.user.name}</Text>
          <Text
            style={[
              styles.headingtext2,
              {
                color:
                  data.amount >= 0
                    ? colors.arrow.primary
                    : colors.arrow.tertiary,
              },
            ]}>
            {data.amount}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={styles.headingtext3}>{description}</Text>
          <Text style={styles.headingtext3}>
            {data.amount >= 0 ? 'In' : 'Out'}
          </Text>
        </View>
        <View
          style={{
            height: 1.2,
            width: '100%',
            backgroundColor: colors.arrow.primary,
            marginVertical: 1,
            borderRadius: 10,
          }}></View>
      </View>
    </View>
  );
};

export default SingleTransaction;

const styles = StyleSheet.create({
  optioncard2: {
    marginHorizontal: 10,
    marginVertical: 7,
    paddingHorizontal: 5,
    backgroundColor: 'white',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  headingtext: {
    fontFamily: 'Lexend',
    color: colors.login.headingtext,
    fontWeight: '900',
    fontSize: 28,
    lineHeight: 36,
  },
  headingtext2: {
    fontFamily: 'Lexend',
    color: colors.login.headingtext,
    fontWeight: '900',
    fontSize: 14,
    lineHeight: 22.4,
  },
  headingtext3: {
    fontFamily: 'Lexend',
    color: colors.login.headingtext2,
    fontWeight: '900',
    fontSize: 12,
    lineHeight: 20,
  },
});
