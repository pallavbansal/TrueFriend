import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {BackHandler} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../Styles/ColorData';
import GradientButton from '../Components/Common/GradientButton';
import GradientText from '../Components/Common/GradientText';
import GradientInput from '../Components/Common/GradientInput';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import GradientScreen from '../Layouts/GradientScreen';
import Loading from './Loading';
import {useLogin} from '../Hooks/Query/AuthQuery';
import {useDispatch} from 'react-redux';
import {LoginRed} from '../Store/Auth';
import {logindata} from '../Utils/Logindata';
import Toast from 'react-native-toast-message';

const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [logininputerror, setLoginInputError] = useState({
    showerror: false,
    message: '',
  });
  const [logininputs, setLoginInputs] = useState({
    email: '',
    password: '',
  });
  const {mutate, isPending, error, reset} = useLogin();
  // useEffect(() => {
  //   const backAction = () => {
  //     navigation.reset({
  //       index: 0,
  //       routes: [{name: 'Login'}],
  //     });
  //     return true;
  //   };

  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     backAction,
  //   );

  //   return () => backHandler.remove();
  // }, [navigation]);

  const handleSubmit = () => {
    if (logininputs.email == '' || logininputs.password == '') {
      setLoginInputError({
        showerror: true,
        message: 'Please fill all the fields',
      });
      return;
    }
    setLoginInputError({showerror: false, message: ''});
    const data = {
      email: logininputs.email,
      password: logininputs.password,
    };
    mutate(
      {data},
      {
        onSuccess: data => {
          if (data.status_code == 1) {
            console.log('login success', data);
            dispatch(
              LoginRed({
                userid: data.data.user.id,
                token: data.data.token,
                userinitaldata: data.data.user,
              }),
            );
            setLoginInputs({email: '', password: ''});
            return navigation.reset({
              index: 0,
              routes: [{name: 'Temp'}],
            });
          } else {
            // Toast.show({
            //   type: 'error',
            //   text1: data.message,
            //   text2: 'Try Again',
            // });
            setTimeout(() => {
              reset();
            }, 4000);
            // console.log('login error', data.message);
            throw new Error(data.message);
            // throw new Error('Invalid Credentials');
          }
        },
      },
    );
  };

  const handleForgotPassword = () => {
    return navigation.navigate('ForgotPassword');
  };

  const handleRegister = () => {
    return navigation.navigate('Registration');
  };

  const handletemplogin = item => {
    setLoginInputs({
      email: item.email,
      password: item.password,
    });
  };

  if (isPending) {
    return <Loading />;
  }
  return (
    <GradientScreen>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.headingContainer}>
            <Text style={[styles.headingtext, {marginBottom: 10}]}>Login</Text>
            <Text style={styles.headingtext2}>
              Please enter your valid e-mail address.
            </Text>
            <Text style={styles.headingtext2}>
              We will send you a 4-digit code to verify.
            </Text>
          </View>

          <View style={styles.inputsContainer}>
            <GradientInput style={styles.gradientborder}>
              <View style={styles.inputcontainer}>
                <MaterialIcons
                  name="mail"
                  size={18}
                  color={colors.text.secondary}
                />
                <TextInput
                  placeholder="User Id:"
                  keyboardType="email-address"
                  value={logininputs.email}
                  placeholderTextColor={colors.login.headingtext2}
                  cursorColor={colors.login.headingtext2}
                  style={{color: colors.login.headingtext2, flex: 1}}
                  onChangeText={text =>
                    setLoginInputs({...logininputs, email: text})
                  }
                />
              </View>
            </GradientInput>

            <GradientInput style={styles.gradientborder}>
              <View style={styles.inputcontainer}>
                <FontAwesome5
                  name="key"
                  size={18}
                  color={colors.text.secondary}
                />
                <TextInput
                  placeholder="Password:"
                  secureTextEntry={!passwordVisible}
                  keyboardType="default"
                  value={logininputs.password}
                  placeholderTextColor={colors.login.headingtext2}
                  cursorColor={colors.login.headingtext2}
                  style={{color: colors.login.headingtext2, flex: 1}}
                  onChangeText={text =>
                    setLoginInputs({...logininputs, password: text})
                  }
                />
                <FontAwesome5
                  name={passwordVisible ? 'eye-slash' : 'eye'}
                  size={18}
                  style={{marginLeft: 'auto'}}
                  color={colors.text.secondary}
                  onPress={() => setPasswordVisible(!passwordVisible)}
                />
              </View>
            </GradientInput>

            {(logininputs.email.length == 0 ||
              logininputs.password.length == 0) &&
              logininputerror.showerror && (
                <GradientText style={styles.headingtext2}>
                  {logininputerror.message}
                </GradientText>
              )}

            {error && (
              <GradientText style={styles.headingtext2}>
                {error.message}
              </GradientText>
            )}

            <TouchableOpacity
              onPress={handleForgotPassword}
              style={styles.forgottext}>
              <Text style={styles.headingtext2}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleSubmit} style={{marginTop: 20}}>
              <GradientButton style={styles.submitbutton}>
                <Text style={styles.submittext}>Submit</Text>
              </GradientButton>
            </TouchableOpacity>
          </View>

          <View style={styles.registerContainer}>
            <Text style={[styles.headingtext2, {marginRight: 3}]}>
              Don't have an account?
            </Text>
            <TouchableOpacity onPress={handleRegister}>
              <GradientText style={styles.headingtext2}>Register</GradientText>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal>
            {logindata.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    gap: 10,
                    backgroundColor: colors.login.linecolor,
                    marginRight: 10,
                    padding: 5,
                    borderRadius: 10,
                  }}
                  onPress={() => handletemplogin(item)}>
                  <Text style={styles.headingtext2}>{item.name}</Text>
                  <Text style={styles.headingtext2}>{item.email}</Text>
                  <Text style={styles.headingtext2}>{item.password}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* <View style={styles.dividerContainer}>
            <View
              style={{
                height: 1,
                flex: 1,
                backgroundColor: colors.login.linecolor,
              }}
            />
            <Text style={styles.ortext}>OR</Text>
            <View
              style={{
                height: 1,
                flex: 1,
                backgroundColor: colors.login.linecolor,
              }}
            />
          </View>

          <Text style={styles.headingtext2}>Login using</Text>

          <View style={styles.socialContainer}>
            <TouchableOpacity>
              <Text
                style={[
                  styles.socialtext,
                  {backgroundColor: colors.login.facebook},
                ]}>
                f
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text
                style={[
                  styles.socialtext,
                  {backgroundColor: colors.login.google},
                ]}>
                G
              </Text>
            </TouchableOpacity>
          </View> */}
        </View>
      </ScrollView>
    </GradientScreen>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    gap: 20,
    padding: 10,
    marginTop: 70,
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

  registerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },

  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },

  socialContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    flexDirection: 'row',
    gap: 20,
  },

  gradientborder: {
    padding: 2,
    borderRadius: 30,
    overflow: 'hidden',
    width: '100%',
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

  forgottext: {
    alignSelf: 'flex-end',
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

  ortext: {
    width: 50,
    height: 50,
    backgroundColor: colors.text.primary,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: colors.login.headingtext2,
    fontWeight: '600',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: colors.login.linecolor,
    alignSelf: 'center',
  },

  socialtext: {
    width: 50,
    height: 50,
    color: colors.text.primary,
    fontWeight: '900',
    fontSize: 18,
    borderRadius: 25,
    alignSelf: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
