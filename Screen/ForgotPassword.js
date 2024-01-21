import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import GradientScreen from '../Layouts/GradientScreen';
import GradientButton from '../Components/Common/GradientButton';
import GradientInput from '../Components/Common/GradientInput';
import {colors} from '../Styles/ColorData';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import {useForgotPassword} from '../Hooks/Query/AuthQuery';

const ForgotPassword = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('test20@gmail.com');
  const {mutate, isPending, error} = useForgotPassword();

  function handleSent() {
    const data = {
      email: email,
    };
    console.log('forgot passsword email', data);
    mutate(
      {data},
      {
        onSuccess: data => {
          console.log('forgot passsword email', data);
          navigation.navigate('Login');
        },
        onError: error => {
          console.log('forgot passsword email error', error);
        },
      },
    );
    // return navigation.reset({
    //   index: 0,
    //   routes: [{name: 'Discover'}],
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
              style={{marginLeft: 20, marginTop: 20}}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <View style={styles.headingContainer}>
            <Text style={[styles.headingtext, {marginBottom: 10}]}>
              Forgot Password?
            </Text>
            <Text style={styles.headingtext2}>
              Enter the e-mail address associated
            </Text>
            <Text style={styles.headingtext2}>with your account</Text>
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
                  placeholder="Email:"
                  keyboardType="email-address"
                  value={email}
                  placeholderTextColor={colors.login.headingtext2}
                  cursorColor={colors.login.headingtext2}
                  style={{color: colors.login.headingtext2}}
                  onChangeText={text => setEmail(text)}
                />
              </View>
            </GradientInput>
            <TouchableOpacity onPress={handleSent} style={{marginTop: 20}}>
              <GradientButton style={styles.submitbutton}>
                <Text style={styles.submittext}>Send</Text>
                <Octicons
                  name="paper-airplane"
                  size={18}
                  color={colors.text.primary}
                />
              </GradientButton>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </GradientScreen>
  );
};

export default ForgotPassword;

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
    fontSize: 30,
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
  submitbutton: {
    width: 170,
    height: 55,
    borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 5,
  },

  submittext: {
    fontFamily: 'Lexend',
    color: colors.text.primary,
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 22.5,
  },
});
