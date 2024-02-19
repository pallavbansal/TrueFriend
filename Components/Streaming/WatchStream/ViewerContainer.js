import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Video from 'react-native-video';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import {useMeeting} from '@videosdk.live/react-native-sdk';
import BottomSheet from '../common/BottomSheet';
import ChatViewer from '../common/ChatViewer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../../../Styles/ColorData';
import Ionicons from 'react-native-vector-icons/Ionicons';
import StreamLoading from './StreamLoading';

const ViewerContainer = () => {
  const {changeMode, leave, hlsState, hlsUrls, participants} = useMeeting();
  const videoPlayer = useRef(null);
  const bottomSheetRef = useRef();
  const [bottomSheetView, setBottomSheetView] = useState('CHAT');

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
          />
        </View>
      ) : (
        <StreamLoading />
      )}

      <View style={styles.bottomcontainer}>
        <TouchableOpacity
          style={{
            width: 50,
            backgroundColor: 'rgba(0,0,0,0.1)',
            padding: 5,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 8,
          }}>
          <MaterialIcons
            name="chat"
            size={24}
            color="black"
            onPress={() => {
              setBottomSheetView('CHAT');
              bottomSheetRef.current.show();
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={leave}
          style={{
            backgroundColor: 'white',
            borderRadius: 50,
            padding: 15,
          }}>
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
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.1)',
            padding: 5,
            gap: 5,
            borderRadius: 8,
            width: 50,
          }}>
          <AntDesign name="eye" size={24} color="black" />
          <Text
            style={{
              fontSize: 12,
              color: 'black',
              fontWeight: 'bold',
            }}>
            {participants ? [...participants.keys()].length : 1}
          </Text>
        </View>
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
    justifyContent: 'center',
    gap: 20,
    alignItems: 'center',
    padding: 5,
    marginBottom: 15,
    borderRadius: 50,
    marginHorizontal: 5,
    backgroundColor: 'white',
    marginVertical: 15,
    height: 75,
  },
  gradienticon: {
    height: 60,
    width: 60,
    borderRadius: 42.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calliconcontainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 50,
    borderRadius: 40,
  },
});
