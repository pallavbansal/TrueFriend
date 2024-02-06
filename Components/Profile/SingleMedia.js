import {View, Text, StyleSheet, Image, useEffect, useState} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../../Styles/ColorData';
import Video from 'react-native-video';

const SingleUser = ({item}) => {
  return (
    <LinearGradient
      colors={colors.gradients.buttongradient}
      style={styles.gradientcontainer}>
      <View style={styles.container}>
        {item.media_type === '2' ? (
          <Video
            source={{uri: item.media_path}}
            style={{height: '100%', width: '100%', borderRadius: 10}}
            paused={true}
            resizeMode="contain"
            repeat={true}
            muted={true}
            posterResizeMode="cover"
            poster="https://www.w3schools.com/w3images/lights.jpg"
          />
        ) : (
          <Image
            source={{uri: item.media_path}}
            style={{height: '100%', width: '100%', borderRadius: 10}}
          />
        )}
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
