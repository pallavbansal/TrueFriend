import {StyleSheet, Text, View} from 'react-native';
import AnimatedIcon from './Common/AnimatedIcon';
import {colorData} from '../utils/colorData';
import React from 'react';

const NoData = ({isloading}) => {
  return (
    <View style={styles.container}>
      {isloading ? (
        <AnimatedIcon
          source={require('../assets/icons/rotate.json')}
          width={150}
          height={150}
          autoPlay
          loop
        />
      ) : (
        <AnimatedIcon
          source={require('../assets/icons/microphone-recording.json')}
          width={200}
          height={200}
          autoPlay
          loop
        />
      )}

      <Text style={styles.title}>
        {isloading ? 'Loading Recordings...' : 'No Recordings Found'}
      </Text>
    </View>
  );
};

export default NoData;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    marginVertical: 10,
    marginBottom: 100,
    borderRadius: 25,
    backgroundColor: colorData.back1,
    // backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
