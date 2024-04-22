import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import React, {useState, useRef, useEffect, useCallback} from 'react';
import GradientText from '../Components/Common/GradientText';
import BottomBar from '../Layouts/BottomBar';
import GradientScreen from '../Layouts/GradientScreen';
import FeedHeader from '../Components/SocialFeed/FeedHeader';
import Feather from 'react-native-vector-icons/Feather';
import SingleFeedProfile from '../Components/SocialFeed/SingleFeedProfile';
import {colors} from '../Styles/ColorData';
import {useNavigation} from '@react-navigation/native';
import {useFetchSocialFeedPosts} from '../Hooks/Query/FeedQuery';
import Loading from './Loading';
import DetailFeed from '../Components/SocialFeed/DetailFeed';
// import {useQueryClient} from '@tanstack/react-query';
import {useRefreshData} from '../Hooks/Custom/useRefreshData';
import MyLoadingIndicator from '../Components/Common/MyLoadingIndicator';
import SocialFeedSkeleton from '../Skeletons/SocialFeedSkeleton';

const SocialFeed = () => {
  const navigation = useNavigation();
  const {refreshing, onRefresh} = useRefreshData();
  // const queryClient = useQueryClient();
  const [isMuted, setIsMuted] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [allPosts, setAllPosts] = useState([]);
  // const [refreshing, setRefreshing] = useState(false);
  const [showdetailfeed, setShowDetailFeed] = useState({
    show: false,
    data: {},
  });
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    isFetching,
  } = useFetchSocialFeedPosts();
  const [viewableItems, setViewableItems] = useState([]);
  const viewabilityConfig = useRef({viewAreaCoveragePercentThreshold: 50});
  const onViewableItemsChanged = useRef(({viewableItems}) => {
    // setViewableItems(viewableItems.map(item => item.key));
    setViewableItems([viewableItems[0].key]);
  });

  const handleCreatePost = () => {
    return navigation.navigate('CreatePost');
  };

  const closeDetailFeed = () => {
    setShowDetailFeed({show: false, data: {}});
  };

  const handleMuteUnmute = useCallback(() => {
    setIsMuted(prev => !prev);
  }, []);

  const handlePlayPause = useCallback(() => {
    setIsPaused(prev => !prev);
  }, []);

  useEffect(() => {
    if (data) {
      const newData = data.pages.flatMap(page => page.data.posts.data);
      setAllPosts(prevData => {
        let combinedData = [...prevData, ...newData];
        return combinedData.filter(
          (value, index, self) =>
            self.findIndex(v => v.id === value.id) === index,
        );
      });
    }
  }, [data]);

  if (isPending) {
    // return <Loading />;
    return <SocialFeedSkeleton />;
  }

  return (
    <GradientScreen>
      <View style={styles.container}>
        {/* <FeedHeader /> */}
        <MyLoadingIndicator isRefreshing={refreshing} />
        <View style={styles.feedscontainer}>
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => onRefresh(['socialfeedposts'])}
                progressViewOffset={-1000}
              />
            }
            data={allPosts}
            keyExtractor={item => item.id.toString()}
            viewabilityConfig={viewabilityConfig.current}
            onViewableItemsChanged={onViewableItemsChanged.current}
            renderItem={({item, index}) => (
              <SingleFeedProfile
                item={item}
                setAllPosts={setAllPosts}
                index={index}
                isMuted={isMuted}
                isPaused={isPaused}
                viewableItems={viewableItems}
                handleMuteUnmute={handleMuteUnmute}
                handlePlayPause={handlePlayPause}
                setShowDetailFeed={setShowDetailFeed}
              />
            )}
            onEndReachedThreshold={0.5}
            onEndReached={fetchNextPage}
            showsVerticalScrollIndicator={false}
            numColumns={1}
            removeClippedSubviews={true} // Unloads offscreen items
            initialNumToRender={10}
            updateCellsBatchingPeriod={50} // Increase this number to reduce rendering times
            maxToRenderPerBatch={10} // Increase this number if you have a high-end device
            contentContainerStyle={{paddingBottom: 120}}
          />
        </View>
        {isFetching || isFetchingNextPage ? (
          <View
            style={{
              position: 'absolute',
              bottom: 60,
              width: '100%',
              backgroundColor: 'transparent',
              alignItems: 'center',
            }}>
            <View
              style={{
                paddingHorizontal: 20,
                paddingVertical: 5,
                borderRadius: 20,
                backgroundColor: colors.text.primary,
              }}>
              <GradientText style={styles.headingtext2}>
                Fetching...
              </GradientText>
            </View>
          </View>
        ) : null}

        <View
          style={{
            position: 'absolute',
            bottom: 75,
            right: 20,
            padding: 6,
            borderRadius: 48,
            backgroundColor: colors.text.primarylight,
            elevation: 50,
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

      {showdetailfeed.show && (
        <DetailFeed data={showdetailfeed.data} close={closeDetailFeed} />
      )}
    </GradientScreen>
  );
};

export default SocialFeed;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  feedscontainer: {},
  submitbutton: {
    width: 170,
    height: 55,
    borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },

  submittext: {
    fontFamily: 'Lexend',
    color: colors.text.primary,
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 22.5,
  },
  headingtext2: {
    fontFamily: 'Lexend',
    color: colors.login.headingtext2,
    fontWeight: '900',
    fontSize: 14,
    lineHeight: 22.4,
  },
});
