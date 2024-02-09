import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import GradientScreen from '../Layouts/GradientScreen';
import LinearGradient from 'react-native-linear-gradient';
import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {LogoutRed, LoginRed} from '../Store/Auth';
import GradientText from '../Components/Common/GradientText';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from './Loading';
import {colors} from '../Styles/ColorData';

const Splash = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [loading, setloading] = useState(true);

  useEffect(() => {
    setloading(true);
    const fetchData = async () => {
      const userid = JSON.parse(await AsyncStorage.getItem('userid'));
      const userinitaldata = JSON.parse(
        await AsyncStorage.getItem('userinitaldata'),
      );
      const token = await AsyncStorage.getItem('token');

      if (token && userid && userinitaldata) {
        dispatch(LoginRed({userid, token, userinitaldata}));
        return navigation.reset({
          index: 0,
          routes: [{name: 'Discover'}],
        });
      } else {
        dispatch(LogoutRed());
      }
      setloading(false);
    };
    fetchData();
  }, []);

  const handlegetstarted = () => {
    return navigation.navigate('Login');
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <GradientScreen>
      <View style={styles.container}>
        <View>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            colors={colors.gradients.buttongradient}
            style={styles.gradientouter}>
            <View style={styles.gradientinner}>
              <AntDesign
                name="heart"
                size={18}
                color={colors.arrow.heart}
                style={{
                  transform: [{rotate: '-10deg'}],
                }}
              />
              <Text style={styles.headingtext2}>Wooing</Text>
              <Text style={styles.headingtext3}>Online Dating App</Text>
            </View>
          </LinearGradient>
        </View>
        <View
          style={{
            position: 'absolute',
            bottom: 20,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
          }}>
          <TouchableOpacity
            onPress={handlegetstarted}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
            }}>
            <GradientText style={styles.headingtext}>Get Started</GradientText>
            <MaterialIcons
              name="arrow-forward"
              size={24}
              color={colors.arrow.primary}
            />
          </TouchableOpacity>
        </View>
      </View>
    </GradientScreen>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headingtext: {
    fontFamily: 'Lexend',
    color: colors.login.headingtext,
    fontWeight: '900',
    fontSize: 24,
    lineHeight: 24,
  },
  headingtext2: {
    fontFamily: 'Lexend',
    color: 'black',
    fontWeight: '900',
    fontSize: 32,
    lineHeight: 32,
  },
  headingtext3: {
    fontFamily: 'Lexend',
    color: colors.arrow.heart,
    fontWeight: '900',
    fontSize: 18,
    lineHeight: 22.4,
  },
  gradientouter: {
    borderRadius: 110,
    padding: 10,
  },
  gradientinner: {
    width: 200,
    height: 200,
    backgroundColor: 'white',
    borderRadius: 100,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
