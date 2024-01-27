import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../Styles/ColorData';
import GradientButton from '../Components/Common/GradientButton';
import GradientScreen from '../Layouts/GradientScreen';
import GradientText from '../Components/Common/GradientText';
import {useProfileCreation} from '../Hooks/Query/ProfileQuery';
import Loading from './Loading';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ProfileCreationDropdown from '../Components/ProfileCreation/ProfileCreationDropdown';

const ProfileCreation = () => {
  const navigation = useNavigation();

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
  const [showerror, setshowerror] = useState(false);
  const [validform, setvalidform] = useState(false);
  const {mutate, isPending, error, reset} = useProfileCreation();

  useEffect(() => {
    if (
      sexdata.value &&
      martialstatusdata.value &&
      searchingfordata.value &&
      religiondata.value &&
      drinkingdata.value &&
      smokingdata.value
    ) {
      setvalidform(true);
    } else {
      setvalidform(false);
    }
  }, [
    sexdata,
    martialstatusdata,
    searchingfordata,
    religiondata,
    drinkingdata,
    smokingdata,
  ]);

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

  function handleContinue() {
    if (!validform) {
      setshowerror(true);
      return;
    }
    setshowerror(false);

    const formdata = {
      sex: sexdata.value,
      marital_status: martialstatusdata.value,
      looking_for: searchingfordata.value,
      religion: religiondata.value,
      drinking: drinkingdata.value,
      smoking: smokingdata.value,
    };
    // const formdata = {
    //   sex: 'male',
    //   marital_status: 'married',
    //   looking_for: 'dating',
    //   religion: 'hindu',
    //   drinking: 'no',
    //   smoking: 'no',
    // };
    console.log('formdata', formdata);
    mutate(
      {data: formdata},
      {
        onSuccess: data => {
          console.log('Success profile creation', data);
          return navigation.reset({
            index: 0,
            routes: [{name: 'Discover'}],
          });
        },
        onError: error => {
          console.log('Error profile creation', error);
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
              style={{marginLeft: 20, marginTop: 30}}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.container}>
          <View style={styles.headingContainer}>
            <Text
              style={[styles.headingtext, {marginBottom: 5, marginTop: 20}]}>
              Profile Creation
            </Text>
            <Text style={styles.headingtext2}>
              Fill up the following details.
            </Text>
          </View>

          <View style={styles.inputsContainer}>
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

            {showerror && !validform && (
              <GradientText style={styles.headingtext2}>
                Please fill all the details
              </GradientText>
            )}

            {error && (
              <GradientText style={styles.headingtext2}>
                {error.message}
              </GradientText>
            )}

            <TouchableOpacity
              onPress={handleContinue}
              style={{marginTop: 10, marginBottom: 100}}>
              <GradientButton style={styles.submitbutton}>
                <Text style={styles.submittext}>Continue</Text>
              </GradientButton>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </GradientScreen>
  );
};

export default ProfileCreation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    gap: 10,
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

  inputsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
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
  gradientborder2: {
    padding: 2,
    borderRadius: 30,
    overflow: 'hidden',
    width: '100%',
  },

  inputcontainer2: {
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
