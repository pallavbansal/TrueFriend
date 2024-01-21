import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../../Styles/ColorData';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

const list = [
  'It’s spam',
  'Nudity or sexual activity',
  'Hate speech or symbols',
  'Violence or dangerous organosation',
  'Scam or fraud',
  'I just don’t like it',
];

const ReportUser = ({close}) => {
  const navigation = useNavigation();
  const handleclose = () => {
    close();
  };

  const handleattach = () => {
    return navigation.navigate('UploadScreenshot');
  };

  return (
    <Pressable style={styles.container} onPress={handleclose}>
      <LinearGradient
        colors={colors.gradients.buttongradient}
        style={styles.reportcontainer}>
        <Pressable style={styles.reportinsidecontainer}>
          <View style={styles.headercontainer}>
            <MaterialIcons
              name="report-gmailerrorred"
              size={36}
              color={colors.text.primary}
            />
            <Text style={styles.headingtext}>Report User</Text>
          </View>
          <View style={styles.textcontainer}>
            <Text style={styles.headingtext3}>
              Why are you reporting this person?
            </Text>
            <Text style={styles.headingtext3}>
              Your report is anonymous, except if you’re reporting an
              intellectual property infringement.
            </Text>
          </View>
          <View style={styles.listcontainer}>
            {list.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                }}>
                <Text style={styles.headingtext2}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.uploadcontainer}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 5,
                width: '90%',
                borderRadius: 20,
                paddingHorizontal: 10,
                borderWidth: 1,
                borderColor: colors.text.primary,
              }}>
              <TextInput
                placeholder="Upload Screenshots"
                placeholderTextColor={colors.text.primary}
                cursorColor={colors.text.primary}
                style={{
                  color: colors.text.primary,
                  fontWeight: '900',
                  flex: 1,
                  borderRadius: 20,
                  margin: 5,
                }}
              />
              <TouchableOpacity onPress={handleattach}>
                <Entypo
                  name="attachment"
                  size={24}
                  color={colors.text.primary}
                />
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      </LinearGradient>
    </Pressable>
  );
};

export default ReportUser;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
    zIndex: 100,
    opacity: 0.9,
  },
  reportcontainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    borderBottomLeftRadius: 30,
    width: '85%',
    backgroundColor: 'white',
    zIndex: 101,
    alignItems: 'center',
    padding: 20,
    paddingVertical: 10,
  },

  reportinsidecontainer: {
    alignItems: 'center',
    gap: 10,
  },

  headercontainer: {
    alignItems: 'center',
  },
  textcontainer: {
    alignItems: 'center',
  },
  listcontainer: {
    marginRight: 'auto',
  },
  uploadcontainer: {
    marginTop: 15,
  },
  headingtext: {
    fontFamily: 'Lexend',
    color: colors.text.primary,
    fontWeight: '900',
    fontSize: 28,
    lineHeight: 36,
  },

  headingtext2: {
    fontFamily: 'Lexend',
    color: colors.text.primary,
    fontWeight: '900',
    fontSize: 16,
    lineHeight: 22,
  },
  headingtext3: {
    fontFamily: 'Lexend',
    color: colors.text.primary,
    fontWeight: '900',
    fontSize: 12,
    lineHeight: 20,
  },
});
