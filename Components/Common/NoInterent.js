import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import GradientScreen from '../../Layouts/GradientScreen';
import GradientButton from './GradientButton';
import React from 'react';
import {colors} from '../../Styles/ColorData';
import {useNetInfoInstance} from '@react-native-community/netinfo';

const NoInterent = () => {
  const {
    netInfo: {type, isConnected},
    refresh,
  } = useNetInfoInstance();

  return (
    <GradientScreen>
      <View style={styles.container}>
        <Image
          source={require('../../assets/images/no_internet.png')}
          style={{height: 250, width: 250}}
        />
        <Text
          style={{
            fontSize: 28,
            fontWeight: 'bold',
            marginTop: 10,
            color: colors.arrow.primary,
          }}>
          Whoops!
        </Text>
        <Text
          style={{
            fontSize: 15,
            marginTop: 10,
            textAlign: 'center',
            fontWeight: 'bold',
            color: colors.socialfeed.actionicons,
          }}>
          No internet connection is found. Check your connection or try again.
        </Text>

        <TouchableOpacity onPress={refresh} style={{marginTop: 30}}>
          <GradientButton style={styles.submitbutton}>
            <Text style={styles.submittext}>Refresh</Text>
          </GradientButton>
        </TouchableOpacity>
      </View>
    </GradientScreen>
  );
};

export default NoInterent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  submitbutton: {
    backgroundColor: colors.arrow.primary,
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
