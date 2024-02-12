import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const StreamLoading = () => {
  return (
    <View style={styles.container}>
      <MaterialIcons name="play-circle-outline" size={50} color="#4F8EF7" />
      <Text style={styles.text}>Wait</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    borderBottomLeftRadius: 30,
    borderBottomEndRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
    color: '#333333',
  },
});

export default StreamLoading;
