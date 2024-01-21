import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import GradientScreen from '../Layouts/GradientScreen';
import GradientButton from '../Components/Common/GradientButton';
import GradientText from '../Components/Common/GradientText';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../Styles/ColorData';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

const UploadScreenshot = () => {
  const navigation = useNavigation();
  const handlecontinue = () => {};

  return (
    <GradientScreen>
      <View style={styles.container}>
        <View style={styles.headerbackcontainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <MaterialIcons
              name="arrow-back"
              size={24}
              color={colors.arrow.primary}
              style={{marginLeft: 20}}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.headingContainer}>
          <Text style={[styles.headingtext, {marginBottom: 10}]}>
            Upload Screenshots
          </Text>
          <Text
            style={[
              styles.headingtext2,
              {
                textAlign: 'center',
              },
            ]}>
            We strongly give full freedom to our users, but to avoid any kind of
            mishap & nuisance we reccomend you to provide screenshots for
            report.
          </Text>
        </View>

        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={colors.gradients.buttongradient}
          style={styles.gradientsouter}>
          <View style={styles.gradientinner}>
            <MaterialCommunityIcons
              name="file-upload"
              size={100}
              color="#4C407B"
            />
            <TouchableOpacity>
              <GradientText style={styles.headingtext2}>
                Upload Screenshots
              </GradientText>
            </TouchableOpacity>
          </View>
        </LinearGradient>

        <TouchableOpacity onPress={handlecontinue} style={{marginTop: 20}}>
          <GradientButton style={styles.submitbutton}>
            <Text style={styles.submittext}>Continue</Text>
          </GradientButton>
        </TouchableOpacity>
      </View>
    </GradientScreen>
  );
};

export default UploadScreenshot;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,
    gap: 20,
    padding: 10,
    marginTop: 70,
    alignItems: 'center',
  },
  headerbackcontainer: {
    position: 'absolute',
    top: -40,
    left: -10,
  },

  headingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },

  headingtext: {
    fontFamily: 'Lexend',
    color: colors.login.headingtext,
    fontWeight: '900',
    fontSize: 28,
    lineHeight: 28,
  },

  headingtext2: {
    fontFamily: 'Lexend',
    color: colors.login.headingtext2,
    fontWeight: '900',
    fontSize: 14,
    lineHeight: 18,
  },

  gradientsouter: {
    borderRadius: 20,
    overflow: 'hidden',
    padding: 2,
  },

  gradientinner: {
    width: 300,
    height: 300,
    borderRadius: 18,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },

  submitbutton: {
    width: 170,
    height: 55,
    borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },

  submittext: {
    fontFamily: 'Lexend',
    color: colors.text.primary,
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 22.5,
  },
});
