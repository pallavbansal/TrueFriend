import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import GradientScreen from '../Layouts/GradientScreen';
import GradientInput from '../Components/Common/GradientInput';
import {colors} from '../Styles/ColorData';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import RazorpayCheckout from 'react-native-razorpay';
import GradientButton from '../Components/Common/GradientButton';
import {useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';
import {RAZORPAY_KEY, RAZORPAY_SECRET_KEY} from '@env';
import {useRequestPayout} from '../Hooks/Query/WalletQuery';
import {useGetWallet} from '../Hooks/Query/WalletQuery';

const Payment = () => {
  const navigation = useNavigation();
  const myuserid = useSelector(state => state.Auth.userid);
  const {isPending, error, data, isError} = useGetWallet(myuserid);
  const currentbalance = data?.data?.user?.balance || 0;
  const {
    mutate: paymutate,
    reset: payreset,
    isPending: payisPending,
    error: payerror,
  } = useRequestPayout();
  const [inputValue, setInputValue] = useState('');

  function handlepayclick() {
    if (
      inputValue === '' ||
      parseInt(inputValue.trim()) > currentbalance ||
      parseInt(inputValue.trim()) < 100
    ) {
      return;
    }

    const formdata = {
      diamonds: inputValue,
    };

    paymutate(
      {data: formdata},
      {
        onSuccess: data => {
          console.log('on success payout request', data);
        },
        onError: error => {
          console.log('on error payout request', error);
          Toast.show({
            type: 'error',
            position: 'top',
            text1: 'Payment Failed',
            text2: 'Your payment is failed',
            visibilityTime: 2000,
          });
          navigation.reset({
            index: 0,
            routes: [{name: 'Discover'}],
          });
        },
      },
    );
  }

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
            Convert your tokens to real money
          </Text>
          {/* <Text
            style={[
              styles.headingtext3,
              {
                marginTop: 20,
              },
            ]}>
            Saved payment options
          </Text> */}
        </View>

        <View style={styles.statscontainer}>
          <View style={{alignItems: 'center', flexDirection: 'row', gap: 10}}>
            <Text style={styles.headingtext2}>Current Balance</Text>
            <Text style={styles.headingtext3}>
              {isPending ? 'Loading...' : data?.data?.user?.balance || 0}
            </Text>
          </View>
        </View>

        <View style={styles.headerbottomcontainer}>
          <GradientInput style={styles.gradientborder}>
            <View style={styles.inputcontainer}>
              <FontAwesome6
                name="coins"
                size={24}
                color={colors.text.secondary}
              />
              <TextInput
                placeholder="Enter Amount"
                keyboardType="numeric"
                placeholderTextColor={colors.login.headingtext2}
                cursorColor={colors.login.headingtext2}
                style={{color: colors.login.headingtext2, flex: 1}}
                onChangeText={text => {
                  const filteredText = text.replace(/[^0-9]/g, '');
                  setInputValue(filteredText);
                }}
                value={inputValue}
              />
            </View>
          </GradientInput>
        </View>

        <View style={{marginTop: 20, alignItems: 'center'}}>
          <TouchableOpacity
            onPress={handlepayclick}
            disabled={
              inputValue === '' ||
              parseInt(inputValue.trim()) > currentbalance ||
              parseInt(inputValue.trim()) < 100
            }>
            <GradientButton style={styles.submitbutton}>
              <Text style={styles.submittext}>Pay Now</Text>
            </GradientButton>
          </TouchableOpacity>
        </View>
      </View>
    </GradientScreen>
  );
};

export default Payment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  headerbackcontainer: {
    position: 'absolute',
    top: 0,
  },
  headingContainer: {
    width: '100%',
    marginTop: 60,
    // marginLeft: 20,
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

  statscontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },

  headerbottomcontainer: {
    padding: 10,
    marginTop: 20,
    paddingBottom: 0,
    width: '100%',
    alignItems: 'center',
  },
  gradientborder: {
    padding: 2,
    borderRadius: 30,
    overflow: 'hidden',
    width: '90%',
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
