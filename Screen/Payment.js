import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import GradientScreen from '../Layouts/GradientScreen';
import {colors} from '../Styles/ColorData';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

const Payment = () => {
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
            Payment
          </Text>
          <Text style={styles.headingtext2}>
            Complete your payment to enjoy the most
          </Text>
          <Text
            style={[
              styles.headingtext3,
              {
                marginTop: 20,
              },
            ]}>
            Saved payment options
          </Text>
        </View>

        <View style={styles.notificationcontainer}></View>
      </View>
    </GradientScreen>
  );
};

export default Payment;

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

  headingtext3: {
    fontFamily: 'Lexend',
    color: colors.login.headingtext2,
    fontWeight: '900',
    fontSize: 18,
    lineHeight: 22.4,
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
