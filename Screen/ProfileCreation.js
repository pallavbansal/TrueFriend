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
        label: 'Male',
        value: 'Male',
      },
      {
        label: 'Female',
        value: 'Female',
      },
      {
        label: 'Other',
        value: 'Other',
      },
    ],
  });
  const [martialstatusdata, setmartialstatusData] = useState({
    open: false,
    value: null,
    placeholder: 'Martial Status',
    items: [
      {
        label: 'Single',
        value: 'Single',
      },
      {
        label: 'Married',
        value: 'Married',
      },
      {
        label: 'Divorced',
        value: 'Divorced',
      },
      {
        label: 'Widowed',
        value: 'Widowed',
      },
    ],
  });
  const [searchingfordata, setsearchingforData] = useState({
    open: false,
    value: null,
    placeholder: "I'm looking for",
    items: [
      {
        label: 'Dating',
        value: 'Dating',
      },
      {
        label: 'Friendship',
        value: 'Friendship',
      },
      {
        label: 'Chat Buddy',
        value: 'Chat Buddy',
      },
      {
        label: 'Sugar Daddy',
        value: 'Sugar Daddy',
      },
      {
        label: 'Sugar Mommy',
        value: 'Sugar Mommy',
      },
      {
        label: 'Hookups',
        value: 'Hookups',
      },
    ],
  });
  const [religiondata, setreligionData] = useState({
    open: false,
    value: null,
    placeholder: 'Religion',
    items: [
      {
        label: 'Christianity',
        value: 'Christianity',
      },
      {
        label: 'Islam',
        value: 'Islam',
      },
      {
        label: 'Hinduism',
        value: 'Hinduism',
      },
      {
        label: 'Buddhism',
        value: 'Buddhism',
      },
      {
        label: 'Judaism',
        value: 'Judaism',
      },
      {
        label: 'Atheist',
        value: 'Atheist',
      },
      {
        label: 'Other',
        value: 'Other',
      },
    ],
  });
  const [drinkingdata, setdrinkingData] = useState({
    open: false,
    value: null,
    placeholder: 'Drinking',
    items: [
      {
        label: 'Never',
        value: 'Never',
      },
      {
        label: 'Socially',
        value: 'Socially',
      },
      {
        label: 'Often',
        value: 'Often',
      },
      {
        label: 'Regularly',
        value: 'Regularly',
      },
    ],
  });
  const [smokingdata, setsmokingData] = useState({
    open: false,
    value: null,
    placeholder: 'Smoking',
    items: [
      {
        label: 'Never',
        value: 'Never',
      },
      {
        label: 'Socially',
        value: 'Socially',
      },
      {
        label: 'Often',
        value: 'Often',
      },
      {
        label: 'Regularly',
        value: 'Regularly',
      },
    ],
  });

  function handleContinue() {
    return navigation.reset({
      index: 0,
      routes: [{name: 'Discover'}],
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
