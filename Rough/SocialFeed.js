import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import React, {useState, useRef} from 'react';
import BottomBar from '../Layouts/BottomBar';
import GradientScreen from '../Layouts/GradientScreen';
import FeedHeader from '../Components/SocialFeed/FeedHeader';
import Feather from 'react-native-vector-icons/Feather';
import SingleFeedProfile from '../Components/SocialFeed/SingleFeedProfile';
import {colors} from '../Styles/ColorData';
import {useNavigation} from '@react-navigation/native';
import {useFetchSocialFeedPosts} from '../Hooks/Query/FeedQuery';
import Loading from './Loading';

const SocialFeed = () => {
  const navigation = useNavigation();
  const [isMuted, setIsMuted] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const {isPending, error, data, isError} = useFetchSocialFeedPosts();
  const [viewableItems, setViewableItems] = useState([]);
  const viewabilityConfig = useRef({viewAreaCoveragePercentThreshold: 50});
  const onViewableItemsChanged = useRef(({viewableItems}) => {
    // setViewableItems(viewableItems.map(item => item.key));
    setViewableItems([viewableItems[0].key]);
  });

  const handleCreatePost = () => {
    return navigation.navigate('CreatePost');
  };

  const handleMuteUnmute = () => {
    setIsMuted(prev => !prev);
  };

  const handlePlayPause = () => {
    setIsPaused(prev => !prev);
  };

  if (isPending) {
    return <Loading />;
  }

  return (
    <GradientScreen>
      <View style={styles.container}>
        <FeedHeader />
        <View style={styles.feedscontainer}>
          <FlatList
            data={data.data.posts.data}
            keyExtractor={item => item.id.toString()}
            viewabilityConfig={viewabilityConfig.current}
            onViewableItemsChanged={onViewableItemsChanged.current}
            renderItem={({item, index}) => (
              <SingleFeedProfile
                item={item}
                index={index}
                isMuted={isMuted}
                isPaused={isPaused}
                viewableItems={viewableItems}
                handleMuteUnmute={handleMuteUnmute}
                handlePlayPause={handlePlayPause}
              />
            )}
            onEndReachedThreshold={0.5}
            onEndReached={() => console.log('end')}
            showsVerticalScrollIndicator={false}
            numColumns={1}
            contentContainerStyle={{paddingBottom: 120}}
          />
        </View>
        <View
          style={{
            position: 'absolute',
            bottom: 75,
            right: 20,
            padding: 6,
            borderRadius: 48,
            backgroundColor: colors.text.primarylight,
            elevation: 10,
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: colors.text.primary,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 40,
              width: 50,
              height: 50,
            }}
            onPress={handleCreatePost}>
            <Feather name="upload" size={28} color={colors.arrow.secondary} />
          </TouchableOpacity>
        </View>
        <BottomBar />
      </View>
    </GradientScreen>
  );
};

export default SocialFeed;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  feedscontainer: {},
});
