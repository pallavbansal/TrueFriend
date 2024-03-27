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
import {colors} from '../../Styles/ColorData';
import GradientInput from '../Common/GradientInput';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {LogoutRed} from '../../Store/Auth';
import {useFetchProfile} from '../../Hooks/Query/ProfileQuery';
import Loading from '../../Screen/Loading';
import socket from '../../Socket/Socket';

const DiscoverHeader = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {data: UserProfileData, isPending, error, isError} = useFetchProfile();
  const [showsearch, setshowsearch] = useState(false);
  const handlenotification = () => {
    return navigation.navigate('Notification');
  };
  const handleLogout = () => {
    dispatch(LogoutRed());
    // socket.disconnect();
    return navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
  };

  const handleprofile = () => {
    return navigation.navigate('Profile');
  };

  if (isPending) {
    return <Loading />;
  }

  return (
    <View style={styles.headercontainer}>
      <View style={styles.headertopcontainer}>
        <TouchableOpacity
          style={styles.headerimagecontainer}
          onPress={handleprofile}>
          <Image
            style={{
              width: 75,
              height: 75,
              borderRadius: 50,
              borderWidth: 3,
              borderColor: 'white',
            }}
            source={{
              uri: UserProfileData?.data?.profile.profile_picture,
            }}
          />
        </TouchableOpacity>
        <View style={styles.headerdetailcontainer}>
          <Text style={{color: 'white', fontSize: 20, fontWeight: 900}}>
            {UserProfileData.data.profile?.name}
          </Text>
        </View>
        <View style={styles.headericoncontainer}>
          <TouchableOpacity onPress={handleLogout}>
            <MaterialIcons name="logout" size={28} color="white" />
          </TouchableOpacity>

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
                style={{color: colors.login.headingtext2, flex: 1}}
              />
            </View>
          </GradientInput>
        </View>
      )}
    </View>
  );
};

export default DiscoverHeader;

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
    justifyContent: 'center',
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
