import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
  PanResponder,
} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../Styles/ColorData';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Video from 'react-native-video';
import {ActivityIndicator} from 'react-native';
import {
  PinchGestureHandler,
  PanGestureHandler,
  State,
} from 'react-native-gesture-handler';

const SingleFeedProfile = ({
  item,
  setAllPosts,
  isMuted,
  isPaused,
  handleMuteUnmute,
  handlePlayPause,
  viewableItems,
}) => {
  const {name, media_path, id, caption, media_type, like_count, dislike_count} =
    item;
  const [scale, setScale] = useState(1);
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);

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

  const handlelike = () => {
    setAllPosts(prev => {
      return prev.map(post => {
        if (post.id === id) {
          if (post.liked) {
            return {
              ...post,
              like_count: parseInt(post.like_count, 10) - 1,
              liked: false,
            };
          } else {
            return {
              ...post,
              like_count: parseInt(post.like_count, 10) + 1,
              liked: true,
            };
          }
        }
        return post;
      });
    });
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

  const onPinchGestureEvent = event => {
    setScale(event.nativeEvent.scale);
  };

  const onPinchHandlerStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      setScale(1);
    }
  };

  // const onGestureEvent = event => {
  //   if (scale > 1) {
  //     setTranslateX(event.nativeEvent.translationX);
  //     setTranslateY(event.nativeEvent.translationY);
  //   }
  // };

  // const onHandlerStateChange = event => {
  //   if (event.nativeEvent.oldState === State.ACTIVE) {
  //     setTranslateX(0);
  //     setTranslateY(0);
  //   }
  // };

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

      <PinchGestureHandler
        onGestureEvent={onPinchGestureEvent}
        onHandlerStateChange={onPinchHandlerStateChange}>
        <View style={[styles.profilecontainer]}>
          {media_type == '1' ? (
            <Image
              source={{uri: media_path}}
              style={{
                width: '100%',
                aspectRatio: 1,
                transform: [{scale}, {translateX}, {translateY}],
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
                  transform: [{scale}],
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
                  color={colors.profile.edit}
                  style={{
                    position: 'absolute',
                    top: '40%',
                    left: '45%',
                    backgroundColor: 'white',
                    padding: 2,
                    borderRadius: 20,
                  }}
                />
              )}

              {!isLoading &&
                isPaused &&
                viewableItems.includes(id.toString()) && (
                  <TouchableOpacity
                    onPress={handlePlayPausein}
                    style={styles.pausebutton}>
                    <MaterialIcons
                      name={'play-arrow'}
                      size={28}
                      color={colors.profile.edit}
                    />
                  </TouchableOpacity>
                )}

              <TouchableOpacity
                onPress={handleMuteUnmute}
                style={styles.mutebutton}>
                <MaterialIcons
                  name={isMuted ? 'volume-off' : 'volume-up'}
                  size={24}
                  color={colors.profile.edit}
                />
              </TouchableOpacity>
            </Pressable>
          )}
        </View>
      </PinchGestureHandler>
      <View style={styles.actioncontainer}>
        <TouchableOpacity onPress={handlelike}>
          <AntDesign
            name={item.liked ? 'like1' : 'like2'}
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
      <View style={styles.statscontainer}>
        <Text style={styles.headingtext4}>{item.like_count} Likes</Text>
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
    // elevation: 5,
    // backgroundColor: 'white',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 20,
    overflow: 'hidden',
    margin: 5,
  },
  actioncontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    gap: 10,
  },
  statscontainer: {
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
  headingtext4: {
    color: colors.login.headingtext2,
    fontWeight: 'bold',
    fontSize: 14,
    lineHeight: 22.4,
  },
  mutebutton: {
    backgroundColor: 'white',
    borderRadius: 13,
    padding: 2,
    position: 'absolute',
    bottom: 7,
    right: 7,
  },
  pausebutton: {
    backgroundColor: 'white',
    borderRadius: 13,
    padding: 2,
    position: 'absolute',
    top: '40%',
    left: '45%',
  },
});

// <Image
//   source={{uri: media_path}}
//   style={{height: 250, width: '100%'}}
//   resizeMode="contain"
// />
