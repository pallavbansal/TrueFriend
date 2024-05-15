import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colorData} from '../../utils/colorData';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const BottomBar = ({activescreen, setActivescreen}) => {
  console.log(activescreen);
  const handlePress = screen => {
    console.log(screen);
    setActivescreen(screen);
  };

  return (
    <View
      style={{
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0,
        marginHorizontal: 10,
        borderRadius: 10,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: colorData.back1,
        elevation: 10,
      }}>
      <TouchableOpacity onPress={() => handlePress('Record')}>
        <Text
          style={activescreen === 'Record' ? styles.activetext : styles.text}>
          Record
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handlePress('Recordings')}>
        <Text
          style={
            activescreen === 'Recordings' ? styles.activetext : styles.text
          }>
          Recordings
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handlePress('RecordingDetails')}>
        <Text
          style={
            activescreen === 'RecordingDetails'
              ? styles.activetext
              : styles.text
          }>
          Details
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BottomBar;

const styles = StyleSheet.create({
  text: {
    color: 'white',
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    fontWeight: 'bold',
  },
  activetext: {
    color: 'white',
    backgroundColor: colorData.back2,
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    fontWeight: 'bold',
  },
});
