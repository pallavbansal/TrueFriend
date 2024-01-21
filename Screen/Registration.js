import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Button,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {BackHandler} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../Styles/ColorData';
import GradientButton from '../Components/Common/GradientButton';
import GradientText from '../Components/Common/GradientText';
import GradientInput from '../Components/Common/GradientInput';
import GradientScreen from '../Layouts/GradientScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useRegister} from '../Hooks/Query/AuthQuery';
import Loading from './Loading';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useDispatch} from 'react-redux';
import {VerifyRed} from '../Store/Auth';
import {validateRegistrationForm, validateinputs} from '../Utils/Rules';
import AntDesign from 'react-native-vector-icons/AntDesign';
// import MultipleImagePicker from '@baronha/react-native-multiple-image-picker';
// name: 'test21',
//     email: 'test21@gamil.com',
//     password: '1234567',
//     confirmpassword: '1234567',
//     phone: '0123456789',
//     dob: '2005-11-11',
//     address: 'Delhi',

const Registration = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {mutate, isPending, error} = useRegister();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [registerdata, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmpassword: '',
    phone: '',
    dob: '',
    address: '',
  });
  const [formvalid, setFormValid] = useState(false);
  const [registerdatavalidation, setRegisterDataValidation] = useState({
    name: false,
    email: false,
    password: false,
    confirmpassword: false,
    phone: false,
    dob: false,
    address: false,
  });
  const [defaultimage, setDefaultImage] = useState(
    require('../assets/favicon.png'),
  );

  useEffect(() => {
    const formvalid = validateRegistrationForm({
      name: registerdata.name,
      email: registerdata.email,
      password: registerdata.password,
      confirmpassword: registerdata.confirmpassword,
      phone: registerdata.phone,
      dob: registerdata.dob,
      address: registerdata.address,
    });
    setFormValid(formvalid);
    const invalid = validateinputs({
      name: registerdata.name,
      email: registerdata.email,
      password: registerdata.password,
      confirmpassword: registerdata.confirmpassword,
      phone: registerdata.phone,
      dob: registerdata.dob,
      address: registerdata.address,
    });
    setRegisterDataValidation(prev => ({...prev, ...invalid}));
  }, [registerdata]);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    const formattedDate = currentDate.toISOString().slice(0, 10);
    setRegisterData({...registerdata, dob: formattedDate});
  };

  function handleLogin() {
    return navigation.navigate('Login');
  }

  function handleRegistration() {
    const data = {
      name: registerdata.name,
      email: registerdata.email,
      password: registerdata.password,
      mobile_number: registerdata.phone,
      dob: registerdata.dob,
      city: registerdata.address,
    };
    mutate(
      {data},
      {
        onSuccess: data => {
          console.log('register success', data);
          dispatch(VerifyRed({id: data.data.id, otp: data.test_otp}));
          resetalldata();
          return navigation.navigate('Verify');
        },
      },
    );
  }

  if (isPending) {
    return <Loading />;
  }

  function handleImageUpload() {
    // const options = {
    //   mediaType: 'photo',
    //   includeBase64: true,
    // };
    // launchImageLibrary(options, response => {
    //   if (response.didCancel) {
    //     console.log('User cancelled image picker');
    //   } else if (response.error) {
    //     console.log('ImagePicker Error: ', response.error);
    //   } else {
    //     setDefaultImage({uri: response.assets[0].uri});
    //   }
    // });
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
              style={{marginLeft: 20, marginTop: 10}}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <View style={styles.headingContainer}>
            <Text
              style={[styles.headingtext, {marginBottom: 0, marginTop: -20}]}>
              Register
            </Text>
            <Text style={styles.headingtext2}>
              Fill up the following details.
            </Text>
          </View>

          <View style={styles.imagecontainer}>
            <FontAwesome name="user" size={60} color="#C2ADDA" />
            <TouchableOpacity onPress={handleImageUpload}>
              <GradientButton
                style={[
                  styles.submitbutton,
                  {
                    position: 'absolute',
                    width: 30,
                    height: 30,
                    bottom: -15,
                    right: -45,
                    borderRadius: 50,
                  },
                ]}>
                <Entypo name="camera" size={18} color={colors.text.primary} />
              </GradientButton>
            </TouchableOpacity>
          </View>

          <View style={styles.inputsContainer}>
            <GradientInput style={styles.gradientborder}>
              <View style={styles.inputcontainer}>
                <TextInput
                  placeholder="Full Name"
                  keyboardType="default"
                  value={registerdata.name}
                  placeholderTextColor={colors.login.headingtext2}
                  cursorColor={colors.login.headingtext2}
                  style={{color: colors.login.headingtext2}}
                  onChangeText={text =>
                    setRegisterData({...registerdata, name: text})
                  }
                />
              </View>
            </GradientInput>
            <GradientInput style={styles.gradientborder}>
              <View style={styles.inputcontainer}>
                <TextInput
                  placeholder="Email Id"
                  keyboardType="email-address"
                  value={registerdata.email}
                  placeholderTextColor={colors.login.headingtext2}
                  cursorColor={colors.login.headingtext2}
                  style={{color: colors.login.headingtext2}}
                  onChangeText={text =>
                    setRegisterData({...registerdata, email: text})
                  }
                />
              </View>
            </GradientInput>
            <GradientInput style={styles.gradientborder}>
              <View style={styles.inputcontainer}>
                <TextInput
                  placeholder="Password"
                  secureTextEntry={!passwordVisible}
                  keyboardType="default"
                  value={registerdata.password}
                  placeholderTextColor={colors.login.headingtext2}
                  cursorColor={colors.login.headingtext2}
                  style={{color: colors.login.headingtext2, flex: 1}}
                  onChangeText={text =>
                    setRegisterData({...registerdata, password: text})
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
            <GradientInput style={styles.gradientborder}>
              <View style={styles.inputcontainer}>
                <TextInput
                  placeholder="Confirm Password"
                  secureTextEntry={!passwordVisible}
                  value={registerdata.confirmpassword}
                  keyboardType="default"
                  placeholderTextColor={colors.login.headingtext2}
                  cursorColor={colors.login.headingtext2}
                  style={{color: colors.login.headingtext2, flex: 1}}
                  onChangeText={text =>
                    setRegisterData({...registerdata, confirmpassword: text})
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
            <GradientInput style={styles.gradientborder}>
              <View style={styles.inputcontainer}>
                <TextInput
                  placeholder="Phone no."
                  keyboardType="number-pad"
                  value={registerdata.phone}
                  placeholderTextColor={colors.login.headingtext2}
                  cursorColor={colors.login.headingtext2}
                  style={{color: colors.login.headingtext2}}
                  onChangeText={text =>
                    setRegisterData({...registerdata, phone: text})
                  }
                />
              </View>
            </GradientInput>
            <GradientInput style={styles.gradientborder}>
              <Pressable onPress={() => setShow(true)}>
                <View style={styles.inputcontainer}>
                  <TextInput
                    placeholder="DOB"
                    keyboardType="default"
                    value={registerdata.dob}
                    placeholderTextColor={colors.login.headingtext2}
                    cursorColor={colors.login.headingtext2}
                    style={{color: colors.login.headingtext2}}
                    editable={false}
                  />
                </View>
              </Pressable>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={'date'}
                  display="default"
                  onChange={onChangeDate}
                  maximumDate={
                    new Date(new Date(2023, 10, 20).getFullYear() - 18, 10, 20)
                  }
                />
              )}
            </GradientInput>
            <GradientInput style={styles.gradientborder}>
              <View style={styles.inputcontainer}>
                <TextInput
                  placeholder="City"
                  keyboardType="default"
                  value={registerdata.address}
                  placeholderTextColor={colors.login.headingtext2}
                  cursorColor={colors.login.headingtext2}
                  style={{color: colors.login.headingtext2}}
                  onChangeText={text =>
                    setRegisterData({...registerdata, address: text})
                  }
                />
              </View>
            </GradientInput>

            {/* <GradientInput
              style={{
                padding: 2,
                borderRadius: 32,
              }}>
              <View
                style={{
                  padding: 10,
                  borderRadius: 30,
                  overflow: 'hidden',
                  width: '100%',
                  backgroundColor: colors.text.primary,
                }}>
                {Object.keys(registerdatavalidation).map(key => (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 10,
                      marginBottom: 5,
                    }}
                    key={key}>
                    <AntDesign
                      name={
                        registerdatavalidation[key]
                          ? 'checkCircle'
                          : 'closecircle'
                      }
                      size={20}
                      color={registerdatavalidation[key] ? 'green' : 'red'}
                    />
                    <Text
                      style={[
                        styles.headingtext2,
                        {color: colors.login.headingtext},
                      ]}>
                      {key} is{' '}
                      {registerdatavalidation[key] ? 'valid' : 'invalid'}
                    </Text>
                  </View>
                ))}
              </View>
            </GradientInput> */}

            <TouchableOpacity
              onPress={handleRegistration}
              style={{marginTop: 10}}
              disabled={!formvalid}>
              <GradientButton style={styles.submitbutton}>
                <Text style={styles.submittext}>Registration</Text>
              </GradientButton>
            </TouchableOpacity>
          </View>

          <View style={styles.registerContainer}>
            <Text style={[styles.headingtext2, {marginRight: 3}]}>
              Already have an account?
            </Text>
            <TouchableOpacity onPress={handleLogin}>
              <GradientText style={styles.headingtext2}>Login</GradientText>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </GradientScreen>
  );
};

export default Registration;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    gap: 7,
    padding: 10,
    marginTop: 0,
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

  imagecontainer: {
    position: 'relative',
    marginBottom: 10,
    width: 80,
    height: 80,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },

  inputsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    width: '100%',
  },

  registerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
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
