import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import GradientScreen from '../../Layouts/GradientScreen';
import GradientButton from '../Common/GradientButton';
import GradientInput from '../Common/GradientInput';
import {colors} from '../../Styles/ColorData';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React, {useState, useEffect} from 'react';
import MultipleImagePicker from '@baronha/react-native-multiple-image-picker';
import {useUpdateProfile} from '../../Hooks/Query/ProfileQuery';
import {useQueryClient} from '@tanstack/react-query';
import ProfileCreationDropdown from '../ProfileCreation/ProfileCreationDropdown';

const EditProfile = ({setshoweditmodel, initialdata}) => {
  const queryClient = useQueryClient();
  const {isPending, error, mutate, reset} = useUpdateProfile();
  const [showerrors, setshowerrors] = useState(false);
  const [image, setImage] = useState('');
  const [sexdata, setsexData] = useState({
    open: false,
    value: null,
    placeholder: 'Sex',
    items: [
      {
        label: 'male',
        value: 'male',
      },
      {
        label: 'female',
        value: 'female',
      },
      {
        label: 'other',
        value: 'other',
      },
    ],
  });
  const [martialstatusdata, setmartialstatusData] = useState({
    open: false,
    value: null,
    placeholder: 'Martial Status',
    items: [
      {
        label: 'married',
        value: 'married',
      },
      {
        label: 'single',
        value: 'single',
      },
      {
        label: 'divorced',
        value: 'divorced',
      },
    ],
  });
  const [searchingfordata, setsearchingforData] = useState({
    open: false,
    value: null,
    placeholder: "I'm looking for",
    items: [
      {
        label: 'dating',
        value: 'dating',
      },
      {
        label: 'friendship',
        value: 'friendship',
      },
      {
        label: 'chat Buddy',
        value: 'chat Buddy',
      },
      {
        label: 'sugar Daddy',
        value: 'sugar Daddy',
      },
      {
        label: 'sugar Mommy',
        value: 'sugar Mommy',
      },
      {
        label: 'hookups',
        value: 'hookups',
      },
    ],
  });
  const [religiondata, setreligionData] = useState({
    open: false,
    value: null,
    placeholder: 'Religion',
    items: [
      {
        label: 'hindu',
        value: 'hindu',
      },
      {
        label: 'christianity',
        value: 'christianity',
      },
      {
        label: 'islam',
        value: 'islam',
      },

      {
        label: 'buddhism',
        value: 'buddhism',
      },
      {
        label: 'judaism',
        value: 'judaism',
      },
      {
        label: 'atheist',
        value: 'atheist',
      },
      {
        label: 'other',
        value: 'other',
      },
    ],
  });
  const [drinkingdata, setdrinkingData] = useState({
    open: false,
    value: null,
    placeholder: 'Drinking',
    items: [
      {
        label: 'no',
        value: 'no',
      },
      {
        label: 'socially',
        value: 'socially',
      },
      {
        label: 'often',
        value: 'often',
      },
      {
        label: 'regularly',
        value: 'regularly',
      },
    ],
  });
  const [smokingdata, setsmokingData] = useState({
    open: false,
    value: null,
    placeholder: 'Smoking',
    items: [
      {
        label: 'no',
        value: 'no',
      },
      {
        label: 'socially',
        value: 'socially',
      },
      {
        label: 'often',
        value: 'often',
      },
      {
        label: 'regularly',
        value: 'regularly',
      },
    ],
  });
  const [registerdata, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmpassword: '',
    phone: '',
    dob: '',
    address: '',
    image: '',
    bio: '',
    call_amount: '',
  });

  useEffect(() => {
    setselecteddata(initialdata);
    setRegisterData({
      name: initialdata?.name ? initialdata.name : '',
      email: initialdata?.email ? initialdata.email : '',
      password: initialdata?.password ? initialdata.password : '',
      confirmpassword: initialdata?.confirmpassword
        ? initialdata.confirmpassword
        : '',
      phone: initialdata?.phone_number ? initialdata.phone_number : '',
      dob: initialdata?.dob ? initialdata.dob : '',
      address: initialdata?.address ? initialdata.address : '',
      image: '',
      bio: initialdata?.bio ? initialdata.bio : '',
      call_amount: initialdata?.call_amount ? initialdata.call_amount : '',
    });
    setImage('');
  }, [initialdata]);

  function setselecteddata(data) {
    setsexData({
      ...sexdata,
      value: data.sex,
    });
    setmartialstatusData({
      ...martialstatusdata,
      value: data.marital_status,
    });
    setsearchingforData({
      ...searchingfordata,
      value: data.looking_for,
    });
    setreligionData({
      ...religiondata,
      value: data.religion,
    });
    setdrinkingData({
      ...drinkingdata,
      value: data.drinking,
    });
    setsmokingData({
      ...smokingdata,
      value: data.smoking,
    });
  }

  function closeall() {
    setsexData({
      ...sexdata,
      open: false,
    });
    setmartialstatusData({
      ...martialstatusdata,
      open: false,
    });
    setsearchingforData({
      ...searchingfordata,
      open: false,
    });
    setreligionData({
      ...religiondata,
      open: false,
    });
    setdrinkingData({
      ...drinkingdata,
      open: false,
    });
    setsmokingData({
      ...smokingdata,
      open: false,
    });
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

  const handleUpdate = () => {
    if (registerdata.phone.length < 10 || registerdata.phone.length > 10) {
      setshowerrors(true);
      return;
    }

    if (registerdata.bio.length < 1) {
      registerdata.bio = "Let's make some memorable moments together.";
    }

    if (registerdata.bio.length > 45) {
      registerdata.bio = registerdata.bio.substring(0, 45);
    }

    if (parseInt(registerdata.call_amount) < 2000) {
      registerdata.call_amount = 2000;
    }

    setshowerrors(false);

    const formdata = {
      mobile_number: registerdata.phone,
      bio: registerdata.bio,
      profile_picture: registerdata.image,
      sex: sexdata.value,
      marital_status: martialstatusdata.value,
      looking_for: searchingfordata.value,
      religion: religiondata.value,
      drinking: drinkingdata.value,
      smoking: smokingdata.value,
      call_amount: registerdata.call_amount,
    };
    console.log('xxxxxxxxxxxxxx data', formdata);
    mutate(
      {data: formdata},
      {
        onSuccess: data => {
          console.log('yyyyyyyyyyyyyyyyyy data', data);
          queryClient.invalidateQueries({
            queryKey: ['fetchProfile'],
          });
          queryClient.invalidateQueries({
            queryKey: ['getWallet'],
          });
          setshoweditmodel(false);
        },
        onError: error => {
          console.log('error', error);
        },
      },
    );
  };

  return (
    <GradientScreen>
      <ScrollView>
        <View>
          <TouchableOpacity
            onPress={() => {
              setshoweditmodel(false);
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
              style={[styles.headingtext, {marginBottom: 0, marginTop: 20}]}>
              Edit Profile
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
          <View style={styles.inputsContainer}>
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
            <GradientInput style={styles.gradientborder}>
              <View style={styles.inputcontainer}>
                <TextInput
                  placeholder="Bio"
                  keyboardType="default"
                  value={registerdata.bio}
                  placeholderTextColor={colors.login.headingtext2}
                  cursorColor={colors.login.headingtext2}
                  style={{color: colors.login.headingtext2, flex: 1}}
                  onChangeText={text =>
                    setRegisterData({...registerdata, bio: text})
                  }
                />
              </View>
            </GradientInput>
            <GradientInput style={styles.gradientborder}>
              <View style={styles.inputcontainer}>
                <TextInput
                  placeholder="Call Rates (per minute)"
                  keyboardType="number-pad"
                  value={registerdata.call_amount}
                  placeholderTextColor={colors.login.headingtext2}
                  cursorColor={colors.login.headingtext2}
                  style={{color: colors.login.headingtext2, flex: 1}}
                  onChangeText={text => {
                    if (/^[0-9]*$/.test(text)) {
                      setRegisterData({...registerdata, call_amount: text});
                    }
                  }}
                />
              </View>
            </GradientInput>
            <ProfileCreationDropdown
              data={sexdata}
              setData={setsexData}
              closeall={closeall}
            />
            <ProfileCreationDropdown
              data={martialstatusdata}
              setData={setmartialstatusData}
              closeall={closeall}
            />
            <ProfileCreationDropdown
              data={searchingfordata}
              setData={setsearchingforData}
              closeall={closeall}
            />
            <ProfileCreationDropdown
              data={religiondata}
              setData={setreligionData}
              closeall={closeall}
            />
            <ProfileCreationDropdown
              data={drinkingdata}
              setData={setdrinkingData}
              closeall={closeall}
            />
            <ProfileCreationDropdown
              data={smokingdata}
              setData={setsmokingData}
              closeall={closeall}
            />

            {showerrors &&
              (registerdata.phone.length < 10 ||
                registerdata.phone.length > 10 ||
                registerdata.bio.length < 1) && (
                <Text
                  style={{
                    color: 'red',
                    textAlign: 'center',
                    marginTop: 10,
                    marginBottom: 10,
                  }}>
                  Please enter valid details
                </Text>
              )}

            {error && (
              <Text
                style={{
                  color: 'red',
                  textAlign: 'center',
                  marginTop: 10,
                  marginBottom: 10,
                }}>
                {error.message}
              </Text>
            )}

            <TouchableOpacity
              onPress={handleUpdate}
              style={{marginTop: 10}}
              disabled={isPending}>
              <GradientButton style={styles.submitbutton}>
                <Text style={styles.submittext}>
                  {isPending ? 'Updating...' : 'Update'}
                </Text>
              </GradientButton>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setshoweditmodel(false)}
              style={{marginTop: 10}}
              disabled={isPending}>
              <GradientButton style={styles.submitbutton}>
                <Text style={styles.submittext}>Cancel</Text>
              </GradientButton>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </GradientScreen>
  );
};

export default EditProfile;
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
