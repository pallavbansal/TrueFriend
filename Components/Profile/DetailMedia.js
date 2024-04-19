import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../../Styles/ColorData';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Video from 'react-native-video';
import {ActivityIndicator} from 'react-native';
import {PinchGestureHandler, State} from 'react-native-gesture-handler';
import {Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;

const DetailMedia = ({item, otherdata, ismyid, handlepostdelete}) => {
  const {id, caption} = item;
  const [scale, setScale] = useState(1);
  const [playmediaid, setPlaymediaid] = useState('');
  const [mutemediaid, setMutemediaid] = useState('');
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

  const handlePlayPausein = id => {
    setPlaymediaid(prev => (prev === id ? '' : id));
  };

  const handleMuteUnmute = id => {
    setMutemediaid(prev => (prev === id ? '' : id));
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
    setPlaymediaid('');
    setMutemediaid('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.topcontainer}>
        <View>
          <Image
            source={{uri: otherdata.profile_picture}}
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
          <Text style={styles.headingtext2}>{otherdata.name}</Text>
          <Text style={styles.headingtext3}>{caption}</Text>
        </View>
        {ismyid && (
          <TouchableOpacity
            onPress={() => handlepostdelete(id)}
            style={styles.deletebutton}>
            <MaterialIcons
              name={'delete'}
              size={28}
              color={colors.profile.edit}
            />
          </TouchableOpacity>
        )}
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
                  </View>
                ) : (
                  <Pressable onPress={handlePlayPausein}>
                    <Video
                      source={{uri: media.media_path}}
                      style={{
                        aspectRatio: 16 / 9,
                        width: '100%',
                        transform: [{scale}],
                      }}
                      resizeMode="contain"
                      muted={media.id === mutemediaid ? false : true}
                      paused={media.id === playmediaid ? false : true}
                      posterResizeMode="cover"
                      poster="https://www.w3schools.com/w3images/lights.jpg"
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

                    <TouchableOpacity
                      onPress={() => handlePlayPausein(media.id)}
                      style={styles.pausebutton}>
                      <MaterialIcons
                        name={media.id === playmediaid ? 'pause' : 'play-arrow'}
                        size={28}
                        color={colors.profile.edit}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => handleMuteUnmute(media.id)}
                      style={styles.mutebutton}>
                      <MaterialIcons
                        name={
                          media.id === mutemediaid ? 'volume-up' : 'volume-off'
                        }
                        size={28}
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
        <View>
          <AntDesign
            name={item.reaction === 'like' ? 'like1' : 'like2'}
            size={24}
            color={colors.socialfeed.actionicons}
          />
        </View>
        <View>
          <AntDesign
            name={item.reaction === 'dislike' ? 'dislike1' : 'dislike2'}
            size={24}
            color={colors.socialfeed.actionicons}
          />
        </View>
      </View>
      <View style={styles.statscontainer}>
        <Text style={styles.headingtext4}>{item.like_count} Likes</Text>
        <Text style={styles.headingtext4}>{item.dislike_count} Dislikes</Text>
      </View>
    </View>
  );
};

export default DetailMedia;

const styles = StyleSheet.create({
  container: {
    maxHeight: '70%',
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
    bottom: 7,
    left: 7,
  },
  deletebutton: {
    backgroundColor: 'white',
    borderRadius: 13,
    padding: 5,
    position: 'absolute',
    right: 7,
    elevation: 5,
  },
  expandbutton: {
    borderRadius: 13,
    padding: 2,
    position: 'absolute',
    top: 7,
    right: 7,
  },
});
