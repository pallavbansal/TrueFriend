import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import SingleErrorWarning from '../Components/Registration/SingleErrorWarning';
import MultipleImagePicker from '@baronha/react-native-multiple-image-picker';

const Registration = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {mutate, isPending, error, reset} = useRegister();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [showindividualerror, setShowIndividualError] = useState(false);
  const [image, setImage] = useState('');
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [registerdata, setRegisterData] = useState({
    name: 'Jhon',
    email: '@gmail.com',
    password: '1234567',
    confirmpassword: '1234567',
    phone: '8384863081',
    dob: '1997-10-20',
    address: 'Delhi',
    image: '',
  });
  const [registerdatavalidation, setRegisterDataValidation] = useState({
    name: false,
    email: false,
    password: false,
    confirmpassword: false,
    phone: false,
    dob: false,
    address: false,
    image: false,
  });
  const [formvalid, setFormValid] = useState(false);

  useEffect(() => {
    const formvalid = validateRegistrationForm({
      name: registerdata.name,
      email: registerdata.email,
      password: registerdata.password,
      confirmpassword: registerdata.confirmpassword,
      phone: registerdata.phone,
      dob: registerdata.dob,
      address: registerdata.address,
      image: image,
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
      image: image,
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

  function resetalldata() {
    setRegisterData({
      name: '',
      email: '',
      password: '',
      confirmpassword: '',
      phone: '',
      dob: '',
      address: '',
      image: '',
    });
    setRegisterDataValidation({
      name: false,
      email: false,
      password: false,
      confirmpassword: false,
      phone: false,
      dob: false,
      address: false,
      image: false,
    });
    setImage('');
    setDate(new Date());
  }

  function handleRegistration() {
    if (!formvalid) {
      setShowIndividualError(true);
      return;
    }
    setShowIndividualError(false);
    const data = {
      name: registerdata.name,
      email: registerdata.email,
      password: registerdata.password,
      mobile_number: registerdata.phone,
      dob: registerdata.dob,
      city: registerdata.address,
      profile_picture: registerdata.image,
    };
    mutate(
      {data},
      {
        onSuccess: data => {
          if (data.status_code == 1) {
            console.log('register success', data);
            dispatch(VerifyRed({id: data.data.id}));
            resetalldata();
            return navigation.navigate('Verify');
          } else {
            setTimeout(() => {
              reset();
            }, 4000);
            throw new Error(data.message);
          }
        },
        onError: error => {
          // console.log('register error', error.message);
        },
      },
    );
  }

  if (isPending) {
    return <Loading />;
  }

  const handleImageUpload = async () => {
    try {
      const response = await MultipleImagePicker.openPicker({
        mediaType: 'image',
        maxSelectedAssets: 1,
      });
      console.log('response', response);
      if (response && response.length > 0) {
        setImage(response[0].path);
        setRegisterData({...registerdata, image: response[0]});
      }
    } catch (e) {
      console.log(e);
    }
  };

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
            {image ? (
              <Image
                source={{uri: image}}
                style={{width: 60, height: 60, borderRadius: 30}}
              />
            ) : (
              <FontAwesome name="user" size={60} color="#C2ADDA" />
            )}
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
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 40,
              marginTop: -10,
              marginBottom: 10,
            }}>
            {showindividualerror && !registerdatavalidation.image && (
              <SingleErrorWarning
                type={'registrationprofilepicture'}
                valid={registerdatavalidation.image}
              />
            )}
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
                  style={{color: colors.login.headingtext2, flex: 1}}
                  onChangeText={text =>
                    setRegisterData({...registerdata, name: text})
                  }
                />
              </View>
            </GradientInput>

            {showindividualerror && !registerdatavalidation.name && (
              <SingleErrorWarning
                type={'registrationname'}
                valid={registerdatavalidation.name}
              />
            )}

            <GradientInput style={styles.gradientborder}>
              <View style={styles.inputcontainer}>
                <TextInput
                  placeholder="Email Id"
                  keyboardType="email-address"
                  value={registerdata.email}
                  placeholderTextColor={colors.login.headingtext2}
                  cursorColor={colors.login.headingtext2}
                  style={{color: colors.login.headingtext2, flex: 1}}
                  onChangeText={text =>
                    setRegisterData({...registerdata, email: text})
                  }
                />
              </View>
            </GradientInput>
            {showindividualerror && !registerdatavalidation.email && (
              <SingleErrorWarning
                type={'registrationemail'}
                valid={registerdatavalidation.email}
              />
            )}
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
            {showindividualerror && !registerdatavalidation.password && (
              <SingleErrorWarning
                type={'registrationpassword'}
                valid={registerdatavalidation.password}
              />
            )}
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
            {showindividualerror && !registerdatavalidation.confirmpassword && (
              <SingleErrorWarning
                type={'registrationconfirmpassword'}
                valid={registerdatavalidation.confirmpassword}
              />
            )}
            <GradientInput style={styles.gradientborder}>
              <View style={styles.inputcontainer}>
                <TextInput
                  placeholder="Phone no."
                  keyboardType="number-pad"
                  value={registerdata.phone}
                  placeholderTextColor={colors.login.headingtext2}
                  cursorColor={colors.login.headingtext2}
                  style={{color: colors.login.headingtext2, flex: 1}}
                  onChangeText={text =>
                    setRegisterData({...registerdata, phone: text})
                  }
                />
              </View>
            </GradientInput>
            {showindividualerror && !registerdatavalidation.phone && (
              <SingleErrorWarning
                type={'registrationphone'}
                valid={registerdatavalidation.phone}
              />
            )}
            <GradientInput style={styles.gradientborder}>
              <Pressable onPress={() => setShow(true)}>
                <View style={styles.inputcontainer}>
                  <TextInput
                    placeholder="DOB"
                    keyboardType="default"
                    value={registerdata.dob}
                    placeholderTextColor={colors.login.headingtext2}
                    cursorColor={colors.login.headingtext2}
                    style={{color: colors.login.headingtext2, flex: 1}}
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
            {showindividualerror && !registerdatavalidation.dob && (
              <SingleErrorWarning
                type={'registrationdob'}
                valid={registerdatavalidation.dob}
              />
            )}
            <GradientInput style={styles.gradientborder}>
              <View style={styles.inputcontainer}>
                <TextInput
                  placeholder="City"
                  keyboardType="default"
                  value={registerdata.address}
                  placeholderTextColor={colors.login.headingtext2}
                  cursorColor={colors.login.headingtext2}
                  style={{color: colors.login.headingtext2, flex: 1}}
                  onChangeText={text =>
                    setRegisterData({...registerdata, address: text})
                  }
                />
              </View>
            </GradientInput>
            {showindividualerror && !registerdatavalidation.address && (
              <SingleErrorWarning
                type={'registrationaddress'}
                valid={registerdatavalidation.address}
              />
            )}

            {error && (
              <GradientText style={styles.headingtext2}>
                {error.message}
              </GradientText>
            )}

            <TouchableOpacity
              onPress={handleRegistration}
              style={{marginTop: 10}}>
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
