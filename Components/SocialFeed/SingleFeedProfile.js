import {
  View,
  Text,
  StyleSheet,
  Image,
  Modal,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../Styles/ColorData';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Video from 'react-native-video';
import {ActivityIndicator} from 'react-native';
import {PinchGestureHandler, State} from 'react-native-gesture-handler';
import {useLikePost, useDislikePost} from '../../Hooks/Query/FeedQuery';
import CommentModal from './CommentModal';
import {useNavigation} from '@react-navigation/native';
import ProfileNavigator from '../Common/ProfileNavigator';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import {Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;

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
  const navigation = useNavigation();
  const {id, caption} = item;
  const {mutate: likePost} = useLikePost();
  const {mutate: dislikePost} = useDislikePost();
  const [scale, setScale] = useState(1);
  const [showcommentmodal, setShowCommentModal] = useState(false);
  const [currentHorIndex, setCurrentHorIndex] = useState(0);

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

  const handleDetaildata = data => {
    const otherdata = {
      profile_picture: data.user.profile_picture,
      name: data.user.name,
    };
    setShowDetailFeed({
      show: true,
      data: data,
      otherdata: otherdata,
    });
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

  const handleScroll = event => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(scrollPosition / windowWidth);
    setCurrentHorIndex(currentIndex);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topcontainer}>
        <View>
          <ProfileNavigator id={item.user.id}>
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
          </ProfileNavigator>
        </View>
        <View>
          <ProfileNavigator id={item.user.id}>
            <Text style={styles.headingtext2}>{item.user.name}</Text>
          </ProfileNavigator>
          <Text style={styles.headingtext3}>{caption}</Text>
        </View>
      </View>

      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        snapToInterval={windowWidth}
        decelerationRate="fast"
        onScroll={handleScroll}
        scrollEventThrottle={16}>
        {item.post_media.map((media, index) => {
          return (
            <PinchGestureHandler
              key={index}
              onGestureEvent={onPinchGestureEvent}
              onHandlerStateChange={onPinchHandlerStateChange}>
              <View style={[styles.profilecontainer]}>
                {media.media_type == '1' ? (
                  <View>
                    <Image
                      source={{uri: media.media_path}}
                      style={{
                        width: '100%',
                        aspectRatio: 1,
                        transform: [{scale}, {translateX}, {translateY}],
                      }}
                      resizeMode="contain"
                    />
                    <TouchableOpacity
                      style={styles.expandbutton}
                      onPress={() => handleDetaildata(item)}>
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
                      source={{uri: media.media_path}}
                      style={{
                        // height: 250,
                        aspectRatio: 16 / 9,
                        width: '100%',
                        transform: [{scale}],
                      }}
                      resizeMode="contain"
                      // poster="https://www.w3schools.com/w3images/lights.jpg"
                      // posterResizeMode="cover"
                      muted={index !== currentHorIndex ? true : isMuted}
                      paused={
                        !(!isPaused && viewableItems.includes(id.toString()))
                      }
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
                      onPress={() => handleDetaildata(item)}>
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
          );
        })}
      </ScrollView>

      {item.post_media.length > 1 && (
        <View style={styles.scrolldotcontainer}>
          <View
            style={{
              position: 'absolute',
              top: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 5,
              backgroundColor: 'rgba(0,0,0,0.3)',
              padding: 5,
              borderRadius: 20,
            }}>
            {item.post_media.map((media, index) => {
              return (
                <View
                  key={index}
                  style={{
                    width: 8,
                    height: 8,
                    backgroundColor:
                      index === currentHorIndex ? 'white' : colors.profile.edit,
                    borderRadius: 8,
                    opacity: 0.8,
                  }}></View>
              );
            })}
          </View>
        </View>
      )}

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
        <TouchableOpacity onPress={() => setShowCommentModal(true)}>
          <Ionicons
            name="chatbubble-outline"
            size={24}
            color={colors.socialfeed.actionicons}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.statscontainer}>
        <Text style={styles.headingtext4}>{item.like_count} Likes</Text>
        <Text style={styles.headingtext4}>{item.dislike_count} Dislikes</Text>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showcommentmodal}
        onRequestClose={() => {
          setShowCommentModal(false);
        }}>
        <CommentModal feed={item} />
      </Modal>
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
    width: windowWidth - 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrolldotcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  actioncontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    gap: 12,
  },
  statscontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    gap: 5,
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
    fontSize: 12,
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
