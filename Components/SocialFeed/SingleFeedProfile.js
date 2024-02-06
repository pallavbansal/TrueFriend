import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../Styles/ColorData';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import Video from 'react-native-video';
import {ActivityIndicator} from 'react-native';

const SingleFeedProfile = ({
  item,
  isMuted,
  isPaused,
  handleMuteUnmute,
  handlePlayPause,
  viewableItems,
}) => {
  const {name, media_path, id, caption, media_type} = item;

  const [isLoading, setIsLoading] = useState(true);

  const handleBuffer = ({isBuffering}) => {
    setIsLoading(isBuffering);
  };

  const handleLoadStart = () => {
    setIsLoading(true);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handlePlayPausein = () => {
    if (viewableItems.includes(id.toString())) {
      handlePlayPause();
    }
    if (!viewableItems.includes(id.toString())) {
      viewableItems[0] = id.toString();
      if (isPaused) {
        handlePlayPause();
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topcontainer}>
        <View>
          <Image
            source={{uri: item.user.profile_picture}}
            style={{
              height: 50,
              width: 50,
              borderRadius: 50,
              borderColor: 'white',
              borderWidth: 2,
            }}
          />
        </View>
        <View>
          <Text style={styles.headingtext2}>{item.user.name}</Text>
          <Text style={styles.headingtext3}>{caption}</Text>
        </View>
      </View>
      <View style={styles.profilecontainer}>
        {media_type == '1' ? (
          // <Image
          //   source={{uri: media_path}}
          //   style={{height: 250, width: '100%'}}
          //   resizeMode="contain"
          // />
          <Image
            source={{uri: media_path}}
            style={{
              width: '100%',
              aspectRatio: 1,
            }}
            resizeMode="contain"
          />
        ) : (
          <Pressable onPress={handlePlayPausein}>
            <Video
              source={{uri: media_path}}
              style={{
                // height: 250,
                aspectRatio: 16 / 9,
                width: '100%',
              }}
              resizeMode="contain"
              // poster="https://www.w3schools.com/w3images/lights.jpg"
              // posterResizeMode="cover"
              muted={isMuted}
              paused={!(!isPaused && viewableItems.includes(id.toString()))}
              repeat={true}
              onBuffer={handleBuffer}
              onLoadStart={handleLoadStart}
              onLoad={handleLoad}
            />

            {isLoading && (
              <ActivityIndicator
                size="large"
                color="black"
                style={{
                  position: 'absolute',
                  top: '45%',
                  left: '45%',
                }}
              />
            )}

            {/* {isLoading && (
              <Image
                source={{uri: 'https://www.w3schools.com/w3images/lights.jpg'}}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  height: 250,
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'black',
                  zIndex: 1,
                }}
              />
            )} */}

            {/* <TouchableOpacity
              onPress={handlePlayPause}
              style={{
                position: 'absolute',
                top: '45%',
                left: '46%',
              }}>
              {isPaused ? (
                <Feather name="pause" size={40} color="black" />
              ) : (
                <Feather name="play" size={40} color="black" />
              )}
            </TouchableOpacity> */}
            <TouchableOpacity
              onPress={handleMuteUnmute}
              style={{
                position: 'absolute',
                bottom: 5,
                right: 5,
                elevation: 5,
              }}>
              {isMuted ? (
                <Feather name="volume-x" size={24} color="black" />
              ) : (
                <Feather name="volume-2" size={24} color="black" />
              )}
            </TouchableOpacity>
          </Pressable>
        )}
      </View>
      <View style={styles.actioncontainer}>
        <TouchableOpacity>
          <AntDesign
            name="like2"
            size={24}
            color={colors.socialfeed.actionicons}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <AntDesign
            name="dislike2"
            size={24}
            color={colors.socialfeed.actionicons}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons
            name="chatbubble-outline"
            size={24}
            color={colors.socialfeed.actionicons}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            marginLeft: 'auto',
          }}>
          <AntDesign
            name="download"
            size={24}
            color={colors.socialfeed.actionicons}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SingleFeedProfile;

const styles = StyleSheet.create({
  container: {
    gap: 5,
    marginTop: 10,
    marginBottom: 10,
  },
  topcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginLeft: 5,
  },
  profilecontainer: {
    elevation: 5,
    backgroundColor: 'white',
  },
  actioncontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    gap: 10,
  },
  headingtext2: {
    fontFamily: 'Lexend',
    color: colors.login.headingtext,
    fontWeight: '900',
    fontSize: 18,
    lineHeight: 26,
  },
  headingtext3: {
    fontFamily: 'Lexend',
    color: colors.login.headingtext2,
    fontWeight: '900',
    fontSize: 14,
    lineHeight: 22.4,
  },
});
