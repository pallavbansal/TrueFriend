import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import GradientScreen from '../Layouts/GradientScreen';
import GradientInput from '../Components/Common/GradientInput';
import GradientButton from '../Components/Common/GradientButton';
import React from 'react';
import {useDispatch} from 'react-redux';
import {LogoutRed} from '../Store/Auth';
import {useState} from 'react';
import {colors} from '../Styles/ColorData';
import {useNavigation} from '@react-navigation/native';

const Temp = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [logincode, setLoginCode] = useState('');
  const handleLogout = () => {
    dispatch(LogoutRed());
    return navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
  };

  const handleSubmit = () => {
    if (logincode === '123@123') {
      return navigation.reset({
        index: 0,
        routes: [{name: 'Discover'}],
      });
    }
  };

  return (
    <GradientScreen>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={handleLogout}>
          <Text
            style={{
              color: 'black',
              fontSize: 20,
            }}>
            Logout
          </Text>
        </TouchableOpacity>

        <GradientInput style={styles.gradientborder}>
          <View style={styles.inputcontainer}>
            <TextInput
              placeholder="Code:"
              keyboardType="default"
              value={logincode}
              placeholderTextColor={colors.login.headingtext2}
              cursorColor={colors.login.headingtext2}
              style={{color: colors.login.headingtext2, flex: 1}}
              onChangeText={text => setLoginCode(text)}
            />
          </View>
        </GradientInput>
        <TouchableOpacity onPress={handleSubmit} style={{marginTop: 20}}>
          <GradientButton style={styles.submitbutton}>
            <Text style={styles.submittext}>Submit</Text>
          </GradientButton>
        </TouchableOpacity>
      </View>
    </GradientScreen>
  );
};

export default Temp;

const styles = StyleSheet.create({
  headingtext2: {
    fontFamily: 'Lexend',
    color: colors.login.headingtext2,
    fontWeight: '900',
    fontSize: 14,
    lineHeight: 22.4,
  },
  gradientborder: {
    marginTop: 20,
    padding: 2,
    borderRadius: 30,
    overflow: 'hidden',
    width: '80%',
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
