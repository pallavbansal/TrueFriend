import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import React, {useState} from 'react';
import GradientScreen from '../Layouts/GradientScreen';
import GradientText from '../Components/Common/GradientText';
import GradientButton from '../Components/Common/GradientButton';
import {colors} from '../Styles/ColorData';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import RazorpayCheckout from 'react-native-razorpay';
import {RAZORPAY_KEY} from '@env';
import {useGetOrderId} from '../Hooks/Query/WalletQuery';
import Loading from './Loading';
import Toast from 'react-native-toast-message';
import {useSelector} from 'react-redux';

const plandata = [
  {
    id: 1,
    name: 'Starter X',
    coins: '10K Coins',
    cost: 250,
  },
  {
    id: 2,
    name: 'Buddy Pro',
    coins: '20K Coins',
    cost: 500,
  },
  {
    id: 3,
    name: 'Advanced U',
    coins: '30K Coins',
    cost: 700,
  },
  {
    id: 4,
    name: 'Master M',
    coins: '50K Coins',
    cost: 1000,
  },
  {
    id: 5,
    name: 'Elite E',
    coins: '100K Coins',
    cost: 1500,
  },
  {
    id: 6,
    name: 'Champion C',
    coins: '130K Coins',
    cost: 2000,
  },
  {
    id: 7,
    name: 'Legend L',
    coins: '150K Coins',
    cost: 2500,
  },
  {
    id: 8,
    name: 'Titan T',
    coins: '200K Coins',
    cost: 3000,
  },
  {
    id: 9,
    name: 'Supreme S',
    coins: '230K Coins',
    cost: 3500,
  },
  {
    id: 10,
    name: 'Ultimate U',
    coins: '250K Coins',
    cost: 4000,
  },
  {
    id: 11,
    name: 'Pinnacle P',
    coins: '300K Coins',
    cost: 4500,
  },
  {
    id: 12,
    name: 'Zenith Z',
    coins: '350K Coins',
    cost: 5000,
  },
  {
    id: 13,
    name: 'Nirvana N',
    coins: '700K Coins',
    cost: 9000,
  },
  {
    id: 14,
    name: 'Infinity I',
    coins: '1000K Coins',
    cost: 14000,
  },
];

const Recharge = () => {
  const navigation = useNavigation();
  const profiledata = useSelector(state => state.Auth.userinitaldata);
  const [selectedplan, setselectedplan] = useState({});
  const {
    isPending: OrderIdPending,
    error,
    data: OrderIdData,
    isError,
  } = useGetOrderId();

  const handleplanclick = item => {
    if (OrderIdPending) return;
    setselectedplan({
      ...item,
      order_id: OrderIdData.order_id,
    });
  };

  if (OrderIdPending) {
    return <Loading />;
  }

  function handlepayclick() {
    if (!selectedplan.id) {
      return;
    }
    var options = {
      description: 'Recharge',
      image: 'https://i.imgur.com/3g7nmJC.jpg',
      currency: 'INR',
      key: RAZORPAY_KEY,
      amount: selectedplan.cost * 100,
      name: 'Wooing',
      prefill: {
        email: profiledata.email,
        contact: profiledata.mobile_number,
        name: profiledata.name,
      },
      theme: {color: '#53a20e'},
      notes: {
        type: 'recharge',
        userId: profiledata.id,
        planId: selectedplan.id,
      },
    };
    RazorpayCheckout.open(options)
      .then(data => {
        // handle success
        // console.log('success payment', data);
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Payment Success',
          text2: 'Your payment is successful',
          visibilityTime: 2000,
        });
        navigation.reset({
          index: 0,
          routes: [{name: 'Discover'}],
        });
      })
      .catch(error => {
        // handle failure
        console.log('error payment', error);
        const paymentId = error.error.metadata.payment_id;
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
      });
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
              style={{marginLeft: 20, marginTop: 10}}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.headingContainer}>
          <Text style={[styles.headingtext]}>For Best Access</Text>
          <View style={{flexDirection: 'row', gap: 3}}>
            <Text style={styles.headingtext4}>Recharge your wallet</Text>
            <AntDesign
              name="heart"
              size={18}
              color={colors.arrow.heart}
              style={{
                transform: [{rotate: '-10deg'}],
              }}
            />
          </View>

          <Text
            style={[
              styles.headingtext3,
              {
                marginTop: 15,
              },
            ]}>
            Top features you will get
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              marginTop: 10,
            }}>
            <MaterialIcons
              name="arrow-forward"
              size={24}
              color={colors.login.headingtext}
            />
            <Text
              style={[
                styles.headingtext2,
                {
                  flex: 1,
                },
              ]}>
              Able to make audio & video calls without interruption
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              marginTop: 10,
            }}>
            <MaterialIcons
              name="arrow-forward"
              size={24}
              color={colors.login.headingtext}
            />
            <View
              style={{
                flexDirection: 'row',
                gap: 3,
              }}>
              <Text style={styles.headingtext2}>
                Browse profile invisibly &
              </Text>

              <GradientText style={styles.headingtext2}>
                Many more...
              </GradientText>
            </View>
          </View>
          <Text
            style={[
              styles.headingtext3,
              {
                marginTop: 20,
              },
            ]}>
            Select your Package
          </Text>
        </View>

        <View style={styles.plancontainer}>
          <FlatList
            data={plandata}
            keyExtractor={item => item.id.toString()}
            renderItem={({item, index}) =>
              selectedplan.id === item.id ? (
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={colors.gradients.buttongradient}
                  style={{
                    padding: 2,
                    marginBottom: 10,
                    borderRadius: 50,
                    alignItems: 'center',
                  }}>
                  <View style={styles.planouter}>
                    <View style={styles.planicon}>
                      <MaterialIcons
                        name="diamond"
                        size={48}
                        color={colors.recharge.primary}
                      />
                    </View>
                    <View style={styles.plantext}>
                      <Text style={styles.headingtext3}>{item.name}</Text>
                      <Text style={styles.headingtextcoin}>{item.coins}</Text>
                    </View>
                    <View style={styles.plancost}>
                      <Text style={styles.headingtext4}>{'₹' + item.cost}</Text>
                    </View>
                  </View>
                </LinearGradient>
              ) : (
                <TouchableOpacity
                  style={[styles.planouter, {marginBottom: 10}]}
                  key={index}
                  onPress={() => handleplanclick(item)}>
                  <View style={styles.planicon}>
                    <MaterialIcons
                      name="diamond"
                      size={48}
                      color={colors.recharge.primary}
                    />
                  </View>
                  <View style={styles.plantext}>
                    <Text style={styles.headingtext3}>{item.name}</Text>
                    <Text style={styles.headingtextcoin}>{item.coins}</Text>
                  </View>
                  <View style={styles.plancost}>
                    <Text style={styles.headingtext4}>{'₹' + item.cost}</Text>
                  </View>
                </TouchableOpacity>
              )
            }
            numColumns={1}
            showsVerticalScrollIndicator={false}
          />
        </View>

        <View
          style={{
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginBottom: 10,
          }}>
          <TouchableOpacity style={{marginTop: 20}} onPress={handlepayclick}>
            <GradientButton style={styles.submitbutton}>
              <Text style={styles.submittext}>Continue</Text>
            </GradientButton>
          </TouchableOpacity>
        </View>
      </View>
    </GradientScreen>
  );
};

export default Recharge;

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
    marginBottom: 20,
  },
  headingtext: {
    fontFamily: 'Lexend',
    color: colors.login.headingtext,
    fontWeight: '900',
    fontSize: 28,
  },

  headingtext3: {
    fontFamily: 'Lexend',
    color: colors.login.headingtext2,
    fontWeight: '900',
    fontSize: 18,
  },

  headingtext2: {
    fontFamily: 'Lexend',
    color: colors.login.headingtext2,
    fontWeight: '900',
    fontSize: 14,
  },

  headingtextcoin: {
    fontFamily: 'Lexend',
    color: colors.arrow.primary,
    fontWeight: '900',
    fontSize: 16,
  },

  headingtext4: {
    fontFamily: 'Lexend',
    color: colors.recharge.primary,
    fontWeight: '900',
    fontSize: 16,
  },

  plancontainer: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 20,
    paddingVertical: 10,
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
  planouter: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 50,
  },
  planicon: {
    marginRight: 10,
  },
  plantext: {
    flex: 1,
    gap: 5,
  },
  plancost: {},
});
