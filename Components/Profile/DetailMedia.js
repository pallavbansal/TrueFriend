import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../../Styles/ColorData';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Video from 'react-native-video';

const DetailMedia = ({close, data, ismyid}) => {
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const handleclose = event => {
    event.stopPropagation();
    close();
  };
  const handlePress = event => {
    event.stopPropagation();
    console.log('Pressed', data);
  };

  const handleDelete = () => {
    console.log('Delete', data);
  };

  const handlePause = () => {
    setIsPaused(prev => !prev);
  };
  const handleMuteUnmute = () => {
    setIsMuted(prev => !prev);
  };

  return (
    <Pressable style={styles.container} onPress={handleclose}>
      <LinearGradient
        colors={colors.gradients.buttongradient}
        style={styles.reportcontainer}>
        <Pressable style={styles.reportinsidecontainer} onPress={handlePress}>
          <View style={styles.headercontainer}>
            {data.media_type === '1' ? (
              <Image
                source={{
                  uri: data.media_path,
                }}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 25,
                }}
                resizeMode="contain"
              />
            ) : (
              <Video
                source={{uri: data.media_path}}
                style={{height: '100%', width: '100%', borderRadius: 25}}
                paused={isPaused}
                muted={isMuted}
                resizeMode="contain"
                repeat={true}
                posterResizeMode="cover"
                poster="https://www.w3schools.com/w3images/lights.jpg"
              />
            )}

            {ismyid && (
              <TouchableOpacity
                onPress={handleDelete}
                style={styles.deletebutton}>
                <MaterialIcons
                  name="delete"
                  size={28}
                  color={colors.profile.edit}
                />
              </TouchableOpacity>
            )}
            {data.media_type === '2' && (
              <TouchableOpacity
                onPress={handlePause}
                style={styles.pausebutton}>
                <MaterialIcons
                  name={isPaused ? 'play-arrow' : 'pause'}
                  size={28}
                  color={colors.profile.edit}
                />
              </TouchableOpacity>
            )}
            {data.media_type === '2' && (
              <TouchableOpacity
                onPress={handleMuteUnmute}
                style={styles.mutebutton}>
                <MaterialIcons
                  name={isMuted ? 'volume-off' : 'volume-up'}
                  size={28}
                  color={colors.profile.edit}
                />
              </TouchableOpacity>
            )}
          </View>
        </Pressable>
      </LinearGradient>
    </Pressable>
  );
};

export default DetailMedia;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
    zIndex: 100,
    opacity: 0.9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reportcontainer: {
    borderRadius: 30,
    width: '85%',
    height: '50%',
    backgroundColor: 'white',
    zIndex: 101,
    alignItems: 'center',
    padding: 5,
    // paddingVertical: 10,
  },
  reportinsidecontainer: {
    borderRadius: 25,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    gap: 10,
  },
  headercontainer: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
  },

  deletebutton: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 5,
    position: 'absolute',
    top: 10,
    right: 10,
  },
  pausebutton: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 5,
    position: 'absolute',
    bottom: 10,
    right: 10,
  },
  mutebutton: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 5,
    position: 'absolute',
    bottom: 10,
    left: 10,
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
