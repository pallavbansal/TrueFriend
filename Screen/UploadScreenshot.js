import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import GradientScreen from '../Layouts/GradientScreen';
import GradientButton from '../Components/Common/GradientButton';
import GradientText from '../Components/Common/GradientText';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../Styles/ColorData';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import MultipleImagePicker from '@baronha/react-native-multiple-image-picker';
import Toast from 'react-native-toast-message';
import {useCreateReport} from '../Hooks/Query/ReportQuery';
const UploadScreenshot = ({route}) => {
  const {selected, userid} = route.params;
  console.log('selected', selected, userid);

  const {mutate, isPending} = useCreateReport();
  const navigation = useNavigation();
  const [postinputs, setPostInputs] = useState({
    reason: selected,
    reported_user_id: userid,
    Image: [],
  });
  const handlecontinue = () => {
    if (postinputs.Image.length === 0) {
      return Toast.show({
        type: 'error',
        text1: 'Please upload screenshots',
      });
    }
    const finaldata = {
      reason: postinputs.reason,
      reported_user_id: postinputs.reported_user_id,
      media: postinputs.Image,
    };
    console.log('finaldata', finaldata);
    mutate(
      {data: finaldata},
      {
        onSuccess: data => {
          console.log('report success data', data);
          if (data.status_code === 1) {
            Toast.show({
              type: 'success',
              text1: 'Reported Successfully',
            });
            return navigation.navigate('FriendsList');
          }
        },
      },
    );
  };

  const handleImageUpload = async () => {
    try {
      const response = await MultipleImagePicker.openPicker({
        mediaType: 'image',
        maxSelectedAssets: 1,
      });
      if (response && response.length > 0) {
        setPostInputs({...postinputs, Image: response});
      }
    } catch (e) {
      console.log(e);
    }
  };

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
            {postinputs.Image.length > 0 ? (
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                }}>
                {postinputs.Image.map((item, index) => {
                  return (
                    <View
                      key={index}
                      style={{
                        width: '100%',
                        height: '100%',
                        margin: 5,
                        borderRadius: 10,
                        overflow: 'hidden',
                      }}>
                      <Image
                        source={{uri: item.path}}
                        style={{
                          width: '100%',
                          height: '100%',
                        }}
                      />
                    </View>
                  );
                })}
              </View>
            ) : (
              <TouchableOpacity
                onPress={handleImageUpload}
                style={{
                  alignItems: 'center',
                }}>
                <MaterialCommunityIcons
                  name="file-upload"
                  size={100}
                  color="#4C407B"
                />
                <GradientText style={styles.headingtext2}>
                  Upload Screenshots
                </GradientText>
              </TouchableOpacity>
            )}
          </View>
        </LinearGradient>

        <TouchableOpacity
          onPress={() =>
            setPostInputs(prev => {
              return {...prev, Image: []};
            })
          }
          style={{marginTop: 20}}>
          <GradientText style={styles.headingtext2}>
            Clear Screenshots
          </GradientText>
        </TouchableOpacity>

        <TouchableOpacity onPress={handlecontinue} style={{marginTop: 20}}>
          <GradientButton style={styles.submitbutton}>
            <Text style={styles.submittext}>Submit</Text>
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
