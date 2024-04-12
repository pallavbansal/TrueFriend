import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {colors} from '../../Styles/ColorData';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const options = [
  {
    id: 1,
    name: 'Account Details',
    icon: 'account-circle',
  },
  {
    id: 2,
    name: 'Withdrawal History',
    icon: 'history',
  },
  {
    id: 3,
    name: 'Recharge History',
    icon: 'payment',
  },
  {
    id: 4,
    name: 'Visit Profile',
    icon: 'person',
  },
  {
    id: 5,
    name: 'Rate Us',
    icon: 'star-rate',
  },
];

const WalletOptionsList = () => {
  return (
    <LinearGradient
      colors={colors.gradients.buttongradient}
      style={styles.topcontainer}>
      <View style={styles.topinnercontainer}>
        {options.map(item => (
          <TouchableOpacity key={item.id} style={styles.optioncard}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
              }}>
              <MaterialIcons
                name={item.icon}
                size={24}
                color={colors.arrow.primary}
              />
              <Text style={styles.headingtext3}>{item.name}</Text>
            </View>
            <MaterialIcons
              name="keyboard-arrow-right"
              size={24}
              color={colors.recharge.primary}
            />
          </TouchableOpacity>
        ))}
      </View>
    </LinearGradient>
  );
};

export default WalletOptionsList;

const styles = StyleSheet.create({
  topcontainer: {
    width: '95%',
    padding: 2,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  topinnercontainer: {
    width: '100%',
    borderRadius: 18,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  optioncard: {
    width: '90%',
    marginVertical: 10,
    padding: 10,
    paddingVertical: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 3,
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
    fontSize: 18,
    lineHeight: 26,
  },
  headingtext3: {
    fontFamily: 'Lexend',
    color: colors.login.headingtext2,
    fontWeight: '900',
    fontSize: 14,
    lineHeight: 22.4,
  },
  optiontext: {
    fontFamily: 'Lexend',
    fontWeight: '900',
    fontSize: 18,
    lineHeight: 26,
  },
});
