import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, createRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import GradientScreen from '../Layouts/GradientScreen';
import GradientButton from '../Components/Common/GradientButton';
import GradientText from '../Components/Common/GradientText';
import GradientInput from '../Components/Common/GradientInput';
import {colors} from '../Styles/ColorData';
import {useVerify} from '../Hooks/Query/AuthQuery';
import Loading from './Loading';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';

const Verify = () => {
  const navigation = useNavigation();
  const verifydata = useSelector(state => state.Auth.verify);
  const {mutate, isPending, error, reset} = useVerify();

  const inputRefs = React.useMemo(
    () =>
      Array(4)
        .fill(0)
        .map(i => createRef()),
    [],
  );

  const focusNextInput = index => {
    if (index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };
  const focusPreviousInput = index => {
    if (index > 0) {
      inputRefs[index].current.value = '';
      inputRefs[index - 1].current.focus();
    }
  };

  function handletextChange(text, index) {
    if (text) {
      inputRefs[index].current.value = text;
      focusNextInput(index);
    }
  }

  function handleSubmit() {
    const otp = inputRefs.map(ref => ref.current.value).join('');
    if (otp.length < 4) {
      return Toast.show({
        type: 'error',
        text1: 'Invalid OTP',
        text2: 'Please enter a valid 4 digit OTP',
      });
    }
    const data = {
      id: verifydata.id.toString(),
      otp: otp,
    };

    console.log('data', data);
    mutate(
      {data},
      {
        onSuccess: data => {
          console.log('Verify success', data);
          if (data.status_code == 1) {
            Toast.show({
              type: 'success',
              text1: 'Verify Success',
              text2: 'Redirecting to Login Page',
            });
            return navigation.reset({
              index: 0,
              routes: [{name: 'Login'}],
            });
          } else {
            setTimeout(() => {
              reset();
            }, 4000);
            throw new Error(data.message);
          }
        },
      },
    );
  }

  if (isPending) {
    return <Loading />;
  }

  return (
    <GradientScreen>
      <ScrollView>
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <MaterialIcons
              name="arrow-back"
              size={24}
              color={colors.arrow.primary}
              style={{marginLeft: 20, marginTop: 20}}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <View style={styles.headingContainer}>
            <Text style={[styles.headingtext, {marginBottom: 10}]}>Verify</Text>
            <Text style={styles.headingtext2}>
              Please enter the 4-digit code
            </Text>
            <Text style={styles.headingtext2}>
              sent to you on e-mail address.
            </Text>
          </View>

          <View style={styles.inputsContainer}>
            <View style={styles.otpcontainer}>
              {[...Array(4)].map((_, i) => (
                <GradientInput style={styles.gradientborder} key={i}>
                  <View style={styles.inputcontainer}>
                    <TextInput
                      placeholder="0"
                      keyboardType="number-pad"
                      maxLength={1}
                      ref={inputRefs[i]}
                      onKeyPress={({nativeEvent}) => {
                        if (nativeEvent.key === 'Backspace') {
                          focusPreviousInput(i);
                        }
                      }}
                      onChangeText={text => handletextChange(text, i)}
                      placeholderTextColor={colors.login.headingtext2}
                      cursorColor={colors.login.headingtext2}
                      style={{
                        color: colors.login.headingtext2,
                        textAlign: 'center',
                      }}
                    />
                  </View>
                </GradientInput>
              ))}
            </View>

            {error && (
              <GradientText
                style={[
                  styles.headingtext2,
                  {
                    textAlign: 'center',
                    paddingHorizontal: 20,
                  },
                ]}>
                {error.message}
              </GradientText>
            )}

            <TouchableOpacity onPress={handleSubmit} style={{marginTop: 20}}>
              <GradientButton style={styles.submitbutton}>
                <Text style={styles.submittext}>Submit</Text>
              </GradientButton>
            </TouchableOpacity>

            <TouchableOpacity>
              <GradientText style={[styles.headingtext2, {fontSize: 16}]}>
                Resend OTP
              </GradientText>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </GradientScreen>
  );
};

export default Verify;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    gap: 20,
    padding: 10,
    marginTop: '30%',
  },

  headingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
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
  inputsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    width: '100%',
  },

  otpcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    gap: 10,
  },

  gradientborder: {
    padding: 2,
    borderRadius: 30,
    overflow: 'hidden',
  },

  inputcontainer: {
    height: 46,
    width: 46,
    backgroundColor: colors.text.primary,
    borderRadius: 23,
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
