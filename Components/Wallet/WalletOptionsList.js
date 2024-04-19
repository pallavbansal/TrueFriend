import {View, Text, TouchableOpacity, StyleSheet, Linking} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../Styles/ColorData';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import WalletModal from './WalletModal';

const options = [
  {
    id: 1,
    name: 'Account Details',
    description: 'View account',
    icon: 'account-circle',
  },
  {
    id: 2,
    name: 'Withdrawal History',
    description: 'See withdrawals',
    icon: 'history',
  },
  {
    id: 3,
    name: 'Recharge History',
    description: 'See recharges',
    icon: 'payment',
  },
  {
    id: 4,
    name: 'Call Transaction',
    description: 'See call transactions',
    icon: 'call',
  },
  {
    id: 5,
    name: 'Visit Profile',
    description: 'Go to profile',
    icon: 'person',
  },
  {
    id: 6,
    name: 'Rate Us',
    description: 'Rate on Play Store',
    icon: 'star-rate',
  },
];

const WalletOptionsList = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState({
    visible: false,
    type: null,
  });

  function handleOptionClick(id) {
    if (id === 1) {
    } else if (id === 2) {
      setModalVisible({
        visible: true,
        type: 'withdrawal',
      });
    } else if (id === 3) {
      setModalVisible({
        visible: true,
        type: 'recharge',
      });
    } else if (id === 4) {
      setModalVisible({
        visible: true,
        type: 'call',
      });
    } else if (id === 5) {
      navigation.navigate('Profile');
    } else if (id === 6) {
      Linking.openURL(
        'https://play.google.com/store/apps/details?id=com.example.app',
      );
    }
  }

  return (
    <LinearGradient
      colors={colors.gradients.buttongradient}
      style={styles.topcontainer}>
      <View style={styles.topinnercontainer}>
        {options.map(item => (
          <TouchableOpacity
            key={item.id}
            style={styles.optioncard2}
            onPress={() => handleOptionClick(item.id)}>
            <MaterialIcons
              name={item.icon}
              size={36}
              color={colors.arrow.primary}
            />
            <View
              style={{
                flex: 1,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View>
                  <Text style={styles.headingtext2}>{item.name}</Text>
                  <Text style={styles.headingtext3}>{item.description}</Text>
                </View>
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={24}
                  color={colors.recharge.primary}
                />
              </View>
              <View
                style={{
                  height: 1.2,
                  width: '100%',
                  backgroundColor: colors.arrow.primary,
                  marginVertical: 5,
                  borderRadius: 10,
                }}></View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      <WalletModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
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
  optioncard2: {
    width: '90%',
    marginVertical: 7,
    paddingHorizontal: 0,
    backgroundColor: 'white',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
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
