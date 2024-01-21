import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../Styles/ColorData';
import GradientInput from '../Components/Common/GradientInput';
import {useNavigation} from '@react-navigation/native';

const Header = () => {
  const navigation = useNavigation();
  const [showsearch, setshowsearch] = useState(false);

  const handlenotification = () => {
    return navigation.navigate('Notification');
  };

  return (
    <View style={styles.headercontainer}>
      <View style={styles.headertopcontainer}>
        <View style={styles.headerimagecontainer}>
          <Image
            style={{
              width: 75,
              height: 75,
              borderRadius: 50,
              borderWidth: 3,
              borderColor: 'white',
            }}
            source={require('../assets/favicon.png')}
          />
        </View>
        <View style={styles.headerdetailcontainer}>
          <Text style={{color: 'white', fontSize: 20, fontWeight: 900}}>
            Geet Singhania
          </Text>
          <Text style={{color: 'white', fontSize: 16, fontWeight: 800}}>
            User Id
          </Text>
        </View>
        <View style={styles.headericoncontainer}>
          <TouchableOpacity onPress={handlenotification}>
            <MaterialIcons name="notifications" size={28} color="white" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setshowsearch(!showsearch)}>
            <MaterialIcons name="search" size={28} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      {showsearch && (
        <View style={styles.headerbottomcontainer}>
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
                style={{color: colors.login.headingtext2}}
              />
            </View>
          </GradientInput>
        </View>
      )}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headercontainer: {
    paddingTop: 10,
    paddingHorizontal: 15,
    paddingBottom: 5,
  },
  headertopcontainer: {
    flexDirection: 'row',
    gap: 10,
  },

  headerimagecontainer: {},
  headerdetailcontainer: {
    flex: 1,
    padding: 10,
  },
  headericoncontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  headerbottomcontainer: {
    padding: 10,
    paddingBottom: 0,
  },
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
});
