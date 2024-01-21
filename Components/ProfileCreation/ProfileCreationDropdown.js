import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import GradientInput from '../Common/GradientInput';
import {colors} from '../../Styles/ColorData';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const ProfileCreationDropdown = ({data, setData, closeall}) => {
  const handledrop = () => {
    closeall();
    setData({
      ...data,
      open: !data.open,
    });
  };

  const handleselect = (value, label) => {
    setData({
      ...data,
      value: value,
      open: !data.open,
    });
  };

  return (
    <View style={{width: '100%', position: 'relative'}}>
      <GradientInput style={styles.gradientborder}>
        <Pressable style={{flex: 1}} onPress={handledrop}>
          <View style={styles.inputcontainer} onPress={handledrop}>
            <TextInput
              placeholder={data.placeholder}
              keyboardType="default"
              value={data.value}
              editable={false}
              placeholderTextColor={colors.login.headingtext2}
              cursorColor={colors.login.headingtext2}
              style={{color: colors.login.headingtext2, flex: 1}}
            />
            {/* <TouchableOpacity onPress={handledrop}> */}
            {data.open ? (
              <MaterialIcons
                name="arrow-drop-up"
                size={24}
                color={colors.arrow.tertiary}
              />
            ) : (
              <MaterialIcons
                name="arrow-drop-down"
                size={24}
                color={colors.arrow.secondary}
              />
            )}
            {/* </TouchableOpacity> */}
          </View>
        </Pressable>
      </GradientInput>

      {data.open && (
        <GradientInput style={styles.gradientborder2}>
          <View style={styles.dropcontainer}>
            {data.items.map((item, index) => (
              <View key={index} style={styles.singleitem}>
                <TouchableOpacity
                  onPress={() => handleselect(item.value, item.label)}>
                  <Text style={styles.itemtext}>{item.label}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </GradientInput>
      )}
    </View>
  );
};

export default ProfileCreationDropdown;

const styles = StyleSheet.create({
  gradientborder: {
    padding: 2,
    borderRadius: 30,
    overflow: 'hidden',
    width: '100%',
  },

  inputcontainer: {
    height: 47,
    backgroundColor: colors.text.primary,
    width: '100%',
    borderRadius: 28,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  gradientborder2: {
    position: 'absolute',
    top: 55,
    right: 0,
    padding: 2,
    borderRadius: 20,
    overflow: 'hidden',
    alignSelf: 'flex-start',
    zIndex: 1,
  },
  dropcontainer: {
    backgroundColor: colors.text.primary,
    borderRadius: 18,
    padding: 10,
    paddingHorizontal: 15,
    gap: 10,
    alignSelf: 'flex-start',
  },
  singleitem: {
    // width: '100%',
  },
  itemtext: {
    color: colors.login.headingtext2,
    fontSize: 14,
  },
});
