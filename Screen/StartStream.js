import {RTCView, mediaDevices} from '@videosdk.live/react-native-sdk';
import GradientScreen from '../Layouts/GradientScreen';
import GradientButton from '../Components/Common/GradientButton';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Clipboard,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Copy, MicOff, MicOn, VideoOff, VideoOn} from '../assets/icons2';
import React, {useState, useEffect, useCallback} from 'react';
import {createMeeting, getToken} from '../Components/LiveStreaming/api';
import {useNavigation} from '@react-navigation/native';
import {useFocusEffect} from '@react-navigation/native';
import {colors} from '../Styles/ColorData';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';

const StartStream = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {name} = useSelector(state => state.Auth.userinitaldata);
  const [tracks, setTrack] = useState('');
  const [micOn, setMicon] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [meetingId, setMeetingId] = useState('');
  const [token, setToken] = useState('');

  const isCreator = route.params.isCreator;

  console.log('isCreator', isCreator);
  console.log('data', name);

  useEffect(() => {
    async function fetchData() {
      const token = await getToken();
      setToken(token);
      if (isCreator) {
        const _meetingId = await createMeeting({token});
        console.log('_meetingId', _meetingId);
        setMeetingId(_meetingId);
      }
    }
    fetchData();
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      mediaDevices
        .getUserMedia({audio: false, video: true})
        .then(stream => {
          setTrack(stream);
        })
        .catch(e => {
          console.log(e);
        });
    }, []),
  );

  const disposeVideoTrack = () => {
    setTrack(stream => {
      stream.getTracks().forEach(track => {
        track.enabled = false;
        return track;
      });
    });
  };

  const naviagateToSpeaker = () => {
    disposeVideoTrack();
    navigation.navigate('LiveStream', {
      name: name.trim(),
      token: token,
      meetingId: meetingId,
      micEnabled: micOn,
      webcamEnabled: videoOn,
      mode: 'CONFERENCE',
    });
  };

  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      colors={colors.gradients.discovergradient}
      style={{flex: 1}}>
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <MaterialIcons
            name="arrow-back"
            size={24}
            color="white"
            style={{marginLeft: 20, marginTop: 10}}
          />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.startstreamheader}>
            <View
              style={{
                height: 250,
                width: 200,
                borderRadius: 12,
                backgroundColor: '#202427',
                overflow: 'hidden',
              }}>
              {videoOn && tracks ? (
                <RTCView
                  streamURL={tracks.toURL()}
                  objectFit={'cover'}
                  mirror={true}
                  style={{
                    flex: 1,
                    borderRadius: 20,
                  }}
                />
              ) : (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#202427',
                  }}>
                  <Text
                    style={{
                      color: '#ffff',
                      fontWeight: 'bold',
                      fontSize: 20,
                    }}>
                    Camera Off
                  </Text>
                </View>
              )}
            </View>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: 'transparent',
                justifyContent: 'space-evenly',
                position: 'absolute',
                bottom: 10,
                right: 0,
                left: 0,
              }}>
              <TouchableOpacity
                onPress={() => {
                  setMicon(!micOn);
                }}
                style={{
                  height: 50,
                  aspectRatio: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 10,
                  borderRadius: 100,
                }}>
                {micOn ? (
                  <View style={styles.iconon}>
                    <Feather name="mic" size={24} color="black" />
                  </View>
                ) : (
                  <View style={styles.iconoff}>
                    <Feather name="mic-off" size={24} color="white" />
                  </View>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setVideoOn(!videoOn);
                }}
                style={{
                  height: 50,
                  aspectRatio: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 10,
                  borderRadius: 100,
                }}>
                {videoOn ? (
                  <View style={styles.iconon}>
                    <Feather name="camera" size={24} color="black" />
                  </View>
                ) : (
                  <View style={styles.iconoff}>
                    <Feather name="camera-off" size={24} color="white" />
                  </View>
                )}
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.startstreambottom}>
            <TouchableOpacity
              style={{marginTop: 20}}
              onPress={naviagateToSpeaker}>
              <GradientButton style={styles.submitbutton}>
                <Text style={styles.submittext}>Start Live Stream</Text>
              </GradientButton>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

export default StartStream;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startstreamheader: {
    marginTop: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  startstreambottom: {
    marginTop: 20,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconon: {
    height: 50,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: 'white',
  },
  iconoff: {
    height: 50,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: 'red',
  },
  submitbutton: {
    paddingHorizontal: 20,
    height: 55,
    borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },

  submittext: {
    fontFamily: 'Lexend',
    color: colors.text.primary,
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 22.5,
  },
});
