import {View, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import React, {useState} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../../Styles/ColorData';
import GradientInput from '../../Components/Common/GradientInput';
import {useNavigation} from '@react-navigation/native';

const FeedHeader = () => {
  const navigation = useNavigation();
  const [showsearch, setshowsearch] = useState(false);

  const handlenotification = () => {
    return navigation.navigate('Notification');
  };

  return (
    <View style={styles.headercontainer}>
      <View style={styles.headertopcontainer}>
        <View style={styles.headersearchcontainer}>
          {showsearch && (
            <GradientInput style={styles.gradientborder}>
              <View style={styles.inputcontainer}>
                <MaterialIcons
                  name="search"
                  size={24}
                  color={colors.text.secondary}
                />
                <TextInput
                  placeholder="Search"
                  keyboardType="default"
                  placeholderTextColor={colors.login.headingtext2}
                  cursorColor={colors.login.headingtext2}
                  style={{color: colors.login.headingtext2, flex: 1}}
                />
              </View>
            </GradientInput>
          )}
        </View>
        <View style={styles.headericoncontainer}>
          <TouchableOpacity onPress={handlenotification}>
            <MaterialIcons
              name="notifications"
              size={28}
              color={colors.arrow.primary}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setshowsearch(!showsearch)}>
            <MaterialIcons
              name="search"
              size={28}
              color={colors.arrow.primary}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default FeedHeader;

const styles = StyleSheet.create({
  headercontainer: {
    paddingTop: 3,
    paddingHorizontal: 10,
    paddingBottom: 3,
  },
  headertopcontainer: {
    flexDirection: 'row',
    gap: 5,
  },

  headersearchcontainer: {
    flex: 1,
  },
  headericoncontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    height: 40,
  },

  gradientborder: {
    padding: 2,
    borderRadius: 30,
    overflow: 'hidden',
    width: '100%',
  },

  inputcontainer: {
    height: 40,
    backgroundColor: colors.text.primary,
    width: '100%',
    borderRadius: 28,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});
