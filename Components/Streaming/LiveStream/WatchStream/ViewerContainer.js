import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Video from 'react-native-video';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import {usePubSub, useMeeting} from '@videosdk.live/react-native-sdk';
import ControlsOverlay from './ControlsOverlay';
import BottomSheet from '../common/BottomSheet';
import ChatViewer from '../common/ChatViewer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../../../Styles/ColorData';
import Ionicons from 'react-native-vector-icons/Ionicons';
import StreamLoading from './StreamLoading';

const {height} = Dimensions.get('window');

const ViewerContainer = () => {
  const {changeMode, leave, hlsState, hlsUrls, participants} = useMeeting();
  const videoPlayer = useRef(null);
  const [pause, setPause] = useState(false);
  const [progress, setProgrss] = useState(0);
  const [playableDuration, setplayableDuration] = useState(0);
  const bottomSheetRef = useRef();
  const [bottomSheetView, setBottomSheetView] = useState('CHAT');

  const seekTo = sec => {
    videoPlayer &&
      videoPlayer.current &&
      typeof videoPlayer.current.seek === 'function' &&
      videoPlayer.current.seek(sec);
  };
  return (
    <View
      style={{
        flex: 1,
      }}>
      {hlsState == 'HLS_PLAYABLE' ? (
        <View
          style={{
            flex: 1,
          }}>
          <Video
            ref={videoPlayer}
            source={{
              uri: hlsUrls.downstreamUrl,
            }}
            fullscreen={true}
            resizeMode="cover"
            style={{
              flex: 1,
              borderBottomLeftRadius: 30,
              borderBottomRightRadius: 30,
            }}
            onError={e => console.log('error', e)}
            paused={pause}
            onProgress={({currentTime, playableDuration}) => {
              setProgrss(currentTime);
              setplayableDuration(playableDuration);
            }}
            onLoad={data => {
              const {duration} = data;
              setplayableDuration(duration);
            }}
          />
          <ControlsOverlay
            playableDuration={playableDuration}
            setPause={setPause}
            pause={pause}
            progress={progress}
            seekTo={sec => {
              seekTo(sec);
            }}
          />
        </View>
      ) : (
        <StreamLoading />
      )}

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          position: 'absolute',
          bottom: 250,
          right: 10,
          zIndex: 100,
          backgroundColor: 'rgba(0,0,0,0.5)',
          padding: 5,
          borderRadius: 8,
        }}>
        <AntDesign name="eyeo" size={24} color="white" />
        <Text
          style={{
            fontSize: 12,
            color: 'white',
            marginLeft: 4,
            marginRight: 4,
            fontWeight: 'bold',
          }}>
          {participants ? [...participants.keys()].length : 1}
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          position: 'absolute',
          bottom: 210,
          right: 10,
          zIndex: 100,
          backgroundColor: '#FF5D5D',
          padding: 5,
          borderRadius: 8,
        }}>
        <Text
          style={{
            fontSize: 12,
            color: 'white',
            marginLeft: 4,
            marginRight: 4,
            fontWeight: 'bold',
          }}>
          Live
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          position: 'absolute',
          bottom: 210,
          left: 10,
          zIndex: 100,
          backgroundColor: 'rgba(0,0,0,0.5)',
          padding: 5,
          borderRadius: 8,
        }}>
        <TouchableOpacity>
          <MaterialIcons
            name="chat"
            size={28}
            color="white"
            onPress={() => {
              setBottomSheetView('CHAT');
              bottomSheetRef.current.show();
            }}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.bottomcontainer}>
        {/* <TouchableOpacity>
          <MaterialIcons
            name="chat"
            size={24}
            color="white"
            onPress={() => {
              setBottomSheetView('CHAT');
              bottomSheetRef.current.show();
            }}
          />
        </TouchableOpacity> */}
        <TouchableOpacity onPress={leave}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            colors={colors.gradients.calloutergradient}
            style={styles.gradienticon}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              colors={colors.gradients.callinnergradient}
              style={styles.calliconcontainer}>
              <Ionicons name="call" size={28} color="white" />
            </LinearGradient>
          </LinearGradient>
        </TouchableOpacity>
        {/* <TouchableOpacity>
          <MaterialIcons
            name="chat"
            size={24}
            color="white"
            onPress={() => {}}
          />
        </TouchableOpacity> */}
      </View>

      <BottomSheet
        sheetBackgroundColor={'#2B3034'}
        draggable={false}
        radius={12}
        hasDraggableIcon
        closeFunction={() => {
          setBottomSheetView('');
        }}
        ref={bottomSheetRef}
        height={Dimensions.get('window').height * 0.5}>
        {bottomSheetView === 'CHAT' ? (
          <ChatViewer raiseHandVisible={false} />
        ) : null}
      </BottomSheet>
    </View>
  );
};

export default ViewerContainer;
const styles = StyleSheet.create({
  bottomcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 5,
    marginBottom: 5,
    borderRadius: 50,
    marginHorizontal: 5,
  },
  gradienticon: {
    height: 85,
    width: 85,
    borderRadius: 42.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calliconcontainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 75,
    width: 75,
    borderRadius: 40,
  },
});
