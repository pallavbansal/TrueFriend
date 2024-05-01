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
import {useFetchPackageData, useBuyPackage} from '../Hooks/Query/WalletQuery';
import Loading from './Loading';
import Toast from 'react-native-toast-message';
import {useSelector} from 'react-redux';

const Recharge = () => {
  const navigation = useNavigation();
  const profiledata = useSelector(state => state.Auth.userinitaldata);
  // console.log('profiledata', profiledata);
  const [selectedplan, setselectedplan] = useState({});

  const {
    isPending: PlanPending,
    error: PlanError,
    data: PlanData,
    isError: PlanIsError,
  } = useFetchPackageData();

  const {
    mutate: BuyPackageMutate,
    isPending: BuyPackagePending,
    reset: BuyPackageReset,
    error: BuyPackageError,
  } = useBuyPackage();

  const handleplanclick = item => {
    if (BuyPackagePending) return;
    setselectedplan(item);
  };

  if (PlanPending) {
    return <Loading />;
  }

  function handleSendTransactionBackend(transaction_id, status) {
    console.log('transaction_id', transaction_id, status);
    const formdata = {
      transaction_id: transaction_id,
    };
    BuyPackageMutate(
      {data: formdata},
      {
        onSuccess: data => {
          console.log('payment success send in backend', data);
          if (status === 'success') {
            Toast.show({
              type: 'success',
              position: 'top',
              text1: 'Payment Success',
              text2: 'Your payment is successful',
              visibilityTime: 2000,
            });
          } else {
            Toast.show({
              type: 'error',
              position: 'top',
              text1: 'Payment Failed',
              text2: 'Your payment is failed',
              visibilityTime: 2000,
            });
          }
          navigation.reset({
            index: 0,
            routes: [{name: 'Discover'}],
          });
        },
      },
    );
  }

  function handlepayclick() {
    console.log('selectedplan', selectedplan, RAZORPAY_KEY, profiledata);
    if (!selectedplan.id) {
      return;
    }
    var options = {
      description: 'Recharge',
      // image: 'https://i.imgur.com/3g7nmJC.jpg',
      image: profiledata.profile_picture,
      currency: 'INR',
      key: RAZORPAY_KEY,
      amount: selectedplan.price * 100,
      name: 'Wooing',
      prefill: {
        email: profiledata.email,
        // contact: profiledata.mobile_number,
        name: profiledata.name,
      },
      theme: {color: '#53a20e'},
      notes: {
        type: 'recharge',
        userId: profiledata.id,
        planId: selectedplan.id,
      },
      remember_customer: false,
    };
    RazorpayCheckout.open(options)
      .then(data => {
        handleSendTransactionBackend(data.razorpay_payment_id, 'success');
      })
      .catch(error => {
        console.log('error', error);
        handleSendTransactionBackend(error.error.metadata.payment_id, 'failed');
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
            data={PlanData.data.packages.filter(
              item => item.status === 'active',
            )}
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
                      <Text style={styles.headingtextcoin}>
                        {item.diamonds}
                      </Text>
                    </View>
                    <View style={styles.plancost}>
                      <Text style={styles.headingtext4}>
                        {'₹' + item.price}
                      </Text>
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
                    <Text style={styles.headingtextcoin}>{item.diamonds}</Text>
                  </View>
                  <View style={styles.plancost}>
                    <Text style={styles.headingtext4}>{'₹' + item.price}</Text>
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
