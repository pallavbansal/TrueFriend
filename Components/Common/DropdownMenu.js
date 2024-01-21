import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {colors} from '../../Styles/ColorData';

const DropdownMenu = ({selectedValue, onValueChange, items}) => {
  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        style={styles.picker}>
        {items.map((item, index) => (
          <Picker.Item
            key={index}
            label={item.label}
            value={item.value}
            style={styles.picketitem}
          />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.text.primary,
    borderRadius: 28,
    padding: 2,
    width: '100%',
    justifyContent: 'center',
    gap: 10,
    height: 47,
  },
  picker: {
    color: colors.login.headingtext2,
  },
  picketitem: {
    color: colors.login.headingtext2,
  },
});

export default DropdownMenu;
