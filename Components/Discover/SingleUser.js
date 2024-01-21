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
        {item.status && (
          <View
            style={[
              styles.dotcontainer,
              {
                backgroundColor:
                  item.status === 'online'
                    ? colors.dotcolors.online
                    : colors.dotcolors.offline,
              },
            ]}></View>
        )}
      </View>
    </LinearGradient>
  );
};

export default SingleUser;

const styles = StyleSheet.create({
  gradientcontainer: {
    height: 134,
    width: 109,
    margin: 3,
    padding: 2,
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
    borderRadius: 10,
  },
  dotcontainer: {
    position: 'absolute',
    top: -5,
    right: -5,
    height: 15,
    width: 15,
    borderRadius: 10,
    backgroundColor: 'white',
  },
});
