import React, {act} from 'react';
import {colorData} from '../../utils/colorData';
import AnimatedIcon from './AnimatedIcon';
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
        marginHorizontal: 5,
        borderRadius: 10,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'white',
        elevation: 10,
      }}>
      <TouchableOpacity
        onPress={() => handlePress('Record')}
        style={activescreen === 'Record' ? styles.activeoption : styles.option}>
        <Text
          style={activescreen === 'Record' ? styles.activetext : styles.text}>
          Record
        </Text>
        <AnimatedIcon
          source={require('../../assets/icons/add-song.json')}
          width={25}
          height={25}
          autoPlay={activescreen === 'Record' ? true : false}
          loop={activescreen === 'Record' ? true : false}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handlePress('Recordings')}
        style={
          activescreen === 'Recordings' ? styles.activeoption : styles.option
        }>
        <Text
          style={
            activescreen === 'Recordings' ? styles.activetext : styles.text
          }>
          Recordings
        </Text>
        <AnimatedIcon
          source={require('../../assets/icons/microphone-recording.json')}
          width={25}
          height={25}
          autoPlay={activescreen === 'Recordings' ? true : false}
          loop={activescreen === 'Recordings' ? true : false}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => handlePress('Settings')}
        style={
          activescreen === 'Settings' ? styles.activeoption : styles.option
        }>
        <Text
          style={activescreen === 'Settings' ? styles.activetext : styles.text}>
          Settings
        </Text>
        <AnimatedIcon
          source={require('../../assets/icons/tool.json')}
          width={25}
          height={25}
          autoPlay={activescreen === 'Settings' ? true : false}
          loop={activescreen === 'Settings' ? true : false}
        />
      </TouchableOpacity>
    </View>
  );
};

export default BottomBar;

const styles = StyleSheet.create({
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
  },

  activeoption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: colorData.back2,
  },

  text: {
    color: colorData.back2,
    fontWeight: 'bold',
  },
  activetext: {
    color: 'white',
  },
});
