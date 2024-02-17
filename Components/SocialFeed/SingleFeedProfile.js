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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Video from 'react-native-video';
import {ActivityIndicator} from 'react-native';
import {PinchGestureHandler, State} from 'react-native-gesture-handler';
import {useLikePost, useDislikePost} from '../../Hooks/Query/FeedQuery';

const SingleFeedProfile = ({
  item,
  setAllPosts,
  isMuted,
  isPaused,
  handleMuteUnmute,
  handlePlayPause,
  viewableItems,
  setShowDetailFeed,
}) => {
  const {name, media_path, id, caption, media_type} = item;
  const {mutate: likePost} = useLikePost();
  const {mutate: dislikePost} = useDislikePost();
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
          if (post.reaction === 'like') {
            return {
              ...post,
              like_count: parseInt(post.like_count, 10) - 1,
              reaction: null,
            };
          } else if (post.reaction === 'dislike') {
            return {
              ...post,
              like_count: parseInt(post.like_count, 10) + 1,
              dislike_count: parseInt(post.dislike_count, 10) - 1,
              reaction: 'like',
            };
          } else {
            return {
              ...post,
              like_count: parseInt(post.like_count, 10) + 1,
              reaction: 'like',
            };
          }
        }
        return post;
      });
    });
    likePost(
      {postid: id},
      {
        onSuccess: data => {
          console.log('liked', data);
        },
      },
    );
  };

  const handledislike = () => {
    setAllPosts(prev => {
      return prev.map(post => {
        if (post.id === id) {
          if (post.reaction === 'dislike') {
            return {
              ...post,
              dislike_count: parseInt(post.dislike_count, 10) - 1,
              reaction: null,
            };
          } else if (post.reaction === 'like') {
            return {
              ...post,
              dislike_count: parseInt(post.dislike_count, 10) + 1,
              like_count: parseInt(post.like_count, 10) - 1,
              reaction: 'dislike',
            };
          } else {
            return {
              ...post,
              dislike_count: parseInt(post.dislike_count, 10) + 1,
              reaction: 'dislike',
            };
          }
        }
        return post;
      });
    });
    dislikePost(
      {postid: id},
      {
        onSuccess: data => {
          console.log('disliked', data);
        },
      },
    );
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
            <View>
              <Image
                source={{uri: media_path}}
                style={{
                  width: '100%',
                  aspectRatio: 1,
                  transform: [{scale}, {translateX}, {translateY}],
                }}
                resizeMode="contain"
              />
              <TouchableOpacity
                style={styles.expandbutton}
                onPress={() =>
                  setShowDetailFeed({
                    show: true,
                    data: item,
                  })
                }>
                <FontAwesome5
                  name={'expand'}
                  size={18}
                  color={colors.profile.edit}
                />
              </TouchableOpacity>
            </View>
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

              <TouchableOpacity
                style={styles.expandbutton}
                onPress={() =>
                  setShowDetailFeed({
                    show: true,
                    data: item,
                  })
                }>
                <FontAwesome5
                  name={'expand'}
                  size={18}
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
            name={item.reaction === 'like' ? 'like1' : 'like2'}
            size={24}
            color={colors.socialfeed.actionicons}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handledislike}>
          <AntDesign
            name={item.reaction === 'dislike' ? 'dislike1' : 'dislike2'}
            size={24}
            color={colors.socialfeed.actionicons}
          />
        </TouchableOpacity>
        {/* <TouchableOpacity>
          <Ionicons
            name="chatbubble-outline"
            size={24}
            color={colors.socialfeed.actionicons}
          />
        </TouchableOpacity> */}
        {/* <TouchableOpacity
          style={{
            marginLeft: 'auto',
          }}>
          <AntDesign
            name="download"
            size={24}
            color={colors.socialfeed.actionicons}
          />
        </TouchableOpacity> */}
      </View>
      <View style={styles.statscontainer}>
        <Text style={styles.headingtext4}>{item.like_count} Likes</Text>
        <Text style={styles.headingtext4}>{item.dislike_count} Dislikes</Text>
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
  expandbutton: {
    // backgroundColor: 'white',
    borderRadius: 13,
    padding: 2,
    position: 'absolute',
    top: 7,
    right: 7,
  },
});

// <Image
//   source={{uri: media_path}}
//   style={{height: 250, width: '100%'}}
//   resizeMode="contain"
// />
