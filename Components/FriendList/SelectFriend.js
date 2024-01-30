import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../Styles/ColorData';

import {CheckBox} from 'react-native-elements';

const SelectFriend = ({data, grouplist, setgrouplist}) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleCheckbox = () => {
    setIsSelected(prev => !prev);
    if (!isSelected) {
      setgrouplist(prev => [...prev, data.id]);
    } else {
      setgrouplist(prev => prev.filter(id => id !== data.id));
    }
  };

  return (
    <View
      style={{
        overflow: 'hidden',
      }}>
      <View style={styles.fricontainer}>
        <CheckBox
          checked={isSelected}
          onPress={handleCheckbox}
          checkedColor={colors.arrow.tertiary}
        />
        <View>
          <Image
            source={{uri: data.imageUrl}}
            style={{
              height: 50,
              width: 50,
              borderRadius: 60,
              borderColor: 'white',
              borderWidth: 2,
            }}
          />
        </View>
        <View style={{flex: 1}}>
          <Text style={styles.text1}>{data.name}</Text>
        </View>
      </View>
      <View style={styles.divider}></View>
    </View>
  );
};

export default SelectFriend;

const styles = StyleSheet.create({
  fricontainer: {
    flexDirection: 'row',
    gap: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    padding: 10,
    alignItems: 'center',
  },

  iconcontainer: {
    height: 65,
    width: 65,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },

  text1: {
    color: 'white',
    fontSize: 16,
    fontWeight: '900',
  },

  divider: {
    height: 1.5,
    backgroundColor: '#DFD2F3',
    marginHorizontal: 10,
    marginBottom: 15,
  },
});
