import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {colors} from '../../Styles/ColorData';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useGetWallet} from '../../Hooks/Query/WalletQuery';
import {useSelector} from 'react-redux';

const WalletTopBalance = () => {
  const navigation = useNavigation();
  const myuserid = useSelector(state => state.Auth.userid);
  const {isPending, error, data, isError} = useGetWallet(myuserid);

  function handlerecharge() {
    navigation.navigate('Payment');
  }

  function handlewithdrawal() {
    navigation.navigate('Recharge');
  }

  return (
    <LinearGradient
      colors={colors.gradients.buttongradient}
      style={styles.topcontainer}>
      <View style={styles.topinnercontainer}>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
            flex: 1,
          }}>
          <Text style={styles.headingtext}>Wallet</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 5,
              marginVertical: 3,
            }}>
            <MaterialIcons
              name="diamond"
              size={24}
              color={colors.recharge.primary}
            />
            <Text style={styles.headingtext2}>
              {isPending ? 'Loading...' : data?.data?.user?.balance || 0}
            </Text>
          </View>

          <Text style={styles.headingtext3}>Available Balance</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: '100%',
            padding: 10,
          }}>
          <TouchableOpacity
            onPress={handlewithdrawal}
            style={{
              backgroundColor: colors.arrow.primary,
              padding: 7,
              paddingHorizontal: 15,
              borderRadius: 50,
            }}>
            <Text
              style={{
                color: 'white',
              }}>
              Recharge
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handlerecharge}
            style={{
              backgroundColor: colors.arrow.primary,
              padding: 7,
              paddingHorizontal: 15,
              borderRadius: 50,
            }}>
            <Text
              style={{
                color: 'white',
              }}>
              WithDraw
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

export default WalletTopBalance;

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
    // height: 175,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
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
