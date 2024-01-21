import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../../Styles/ColorData';

const SingleUser = ({item}) => {
  return (
    <LinearGradient
      colors={colors.gradients.buttongradient}
      style={styles.gradientcontainer}>
      <View style={styles.container}>
        <Image
          source={{uri: item.imageUrl}}
          style={{height: '100%', width: '100%', borderRadius: 10}}
        />
      </View>
    </LinearGradient>
  );
};

export default SingleUser;

const styles = StyleSheet.create({
  gradientcontainer: {
    height: 100,
    width: 81,
    margin: 3,
    padding: 1,
    marginBottom: 10,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  container: {
    position: 'relative',
    height: '100%',
    width: '100%',
    backgroundColor: 'black',
    borderRadius: 11,
  },
});
