import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import GradientScreen from '../Layouts/GradientScreen';
import GradientButton from '../Components/Common/GradientButton';
import GradientText from '../Components/Common/GradientText';
import GradientInput from '../Components/Common/GradientInput';
import React, {useState, useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../Styles/ColorData';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import MultipleImagePicker from '@baronha/react-native-multiple-image-picker';
import {useCreatePost} from '../Hooks/Query/FeedQuery';

const CreatePost = () => {
  const navigation = useNavigation();
  const {mutate, isPending, error, reset} = useCreatePost();
  const [postinputs, setPostInputs] = useState({
    caption: '',
    Image: {},
    valid: false,
    showerror: false,
    error: 'Some fields are missing or invalid. Please check again.',
  });

  useEffect(() => {
    if (postinputs.caption.length > 0 && postinputs.Image?.path) {
      setPostInputs({...postinputs, valid: true, showerror: false});
    } else {
      setPostInputs({...postinputs, valid: false});
    }
  }, [postinputs.caption, postinputs.Image]);

  const handlecontinue = () => {
    if (!postinputs.valid) {
      setPostInputs({...postinputs, showerror: true});
      return;
    }
    const formdata = {
      caption: postinputs.caption,
      media_type: postinputs.Image.type === 'image' ? 1 : 2,
      media: postinputs.Image,
    };
    mutate(
      {data: formdata},
      {
        onSuccess: data => {
          console.log('create post success data', data);
          reset();
          navigation.goBack();
        },
        onError: error => {
          console.log('create post error', error);
        },
      },
    );
  };

  const handleImageUpload = async () => {
    try {
      const response = await MultipleImagePicker.openPicker({
        mediaType: 'all',
        maxSelectedAssets: 1,
      });
      if (response && response.length > 0) {
        console.log('response', response[0]);
        setPostInputs({...postinputs, Image: response[0]});
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <GradientScreen>
      <ScrollView>
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
              Create Post
            </Text>
          </View>

          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            colors={colors.gradients.buttongradient}
            style={styles.gradientsouter}>
            <View style={styles.gradientinner}>
              {postinputs.Image?.path && (
                <Image
                  source={{uri: postinputs.Image.path}}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: 18,
                    position: 'absolute',
                  }}
                />
              )}
              {!postinputs.Image?.path && (
                <TouchableOpacity onPress={handleImageUpload}>
                  <MaterialCommunityIcons
                    name="file-upload"
                    size={100}
                    color="#4C407B"
                  />
                  <GradientText style={styles.headingtext2}>
                    Upload Media
                  </GradientText>
                </TouchableOpacity>
              )}
            </View>
          </LinearGradient>

          {postinputs.Image?.path && (
            <TouchableOpacity onPress={handleImageUpload}>
              <GradientText style={styles.headingtext2}>
                Change Media
              </GradientText>
            </TouchableOpacity>
          )}

          <View style={styles.inputsContainer}>
            <GradientInput style={styles.gradientborder}>
              <View style={styles.inputcontainer}>
                <MaterialIcons
                  name="closed-caption"
                  size={18}
                  color={colors.text.secondary}
                />
                <TextInput
                  placeholder="Caption"
                  keyboardType="default"
                  value={postinputs.caption}
                  placeholderTextColor={colors.login.headingtext2}
                  cursorColor={colors.login.headingtext2}
                  style={{color: colors.login.headingtext2, flex: 1}}
                  onChangeText={text =>
                    setPostInputs({...postinputs, caption: text})
                  }
                />
              </View>
            </GradientInput>
          </View>

          <TouchableOpacity
            onPress={handlecontinue}
            style={{marginTop: 20}}
            disabled={isPending}>
            <GradientButton style={styles.submitbutton}>
              <Text style={styles.submittext}>
                {isPending ? 'Creating Post...' : 'Create Post'}
              </Text>
            </GradientButton>
          </TouchableOpacity>

          {postinputs.showerror && (
            <GradientText
              style={[
                styles.headingtext2,
                {
                  textAlign: 'center',
                  paddingHorizontal: 20,
                },
              ]}>
              {postinputs.error}
            </GradientText>
          )}
        </View>
      </ScrollView>
    </GradientScreen>
  );
};

export default CreatePost;

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
  inputsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    width: '100%',
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
