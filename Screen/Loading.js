import {View, Text, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../Styles/ColorData';

const Loading = () => {
  return (
    <LinearGradient
      colors={colors.gradients.buttongradient}
      style={styles.container}>
      <View style={styles.container}>
        <AntDesign
          name="heart"
          size={18}
          color="white"
          style={{
            transform: [{rotate: '-10deg'}],
          }}
        />
        <Text style={styles.headingtext2}>Wooing</Text>
        <Text style={styles.headingtext3}>Online Dating App</Text>
      </View>
    </LinearGradient>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    zIndex: 100,
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
    color: 'white',
    fontWeight: '900',
    fontSize: 32,
    lineHeight: 32,
  },
  headingtext3: {
    fontFamily: 'Lexend',
    color: 'white',
    fontWeight: '900',
    fontSize: 18,
    lineHeight: 22.4,
  },
});
