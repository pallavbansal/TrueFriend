import React, {useCallback, useRef, useState} from 'react';
import {
  Animated,
  ScrollView,
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {useQueryClient} from '@tanstack/react-query';

const PULL_TO_REFRESH_DISTANCE = 100;

const PullToRefresh = ({children, keys, onRefresh}) => {
  const scrollViewRef = useRef(null);
  const [refreshing, setRefreshing] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const pullAnimValue = useRef(new Animated.Value(0)).current;
  const queryClient = useQueryClient();

  const handleScrollViewScroll = useCallback(
    console.log('handleScrollViewScroll'),
    event => {
      const {contentOffset, contentSize, layoutMeasurement} = event.nativeEvent;
      const distancePulled =
        contentSize.height - layoutMeasurement.height - contentOffset.y;
      setPullDistance(distancePulled);
    },
    [setPullDistance],
  );

  const startRefresh = useCallback(async () => {
    setRefreshing(true);
    await onRefresh();
    keys.forEach(key => queryClient.invalidateQueries(key));
    setRefreshing(false);
  }, [onRefresh, queryClient, keys]);

  const handleScrollViewRelease = useCallback(
    event => {
      const {contentOffset, contentSize, layoutMeasurement} = event.nativeEvent;
      const distancePulled =
        contentSize.height - layoutMeasurement.height - contentOffset.y;

      if (distancePulled >= PULL_TO_REFRESH_DISTANCE) {
        startRefresh();
      } else {
        Animated.spring(pullAnimValue, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    },
    [pullAnimValue, startRefresh],
  );

  const renderRefreshControl = () => {
    const dropHeight = pullAnimValue.interpolate({
      inputRange: [0, PULL_TO_REFRESH_DISTANCE],
      outputRange: [0, PULL_TO_REFRESH_DISTANCE],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View
        style={{
          height: dropHeight,
          backgroundColor: 'transparent',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {refreshing ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <View style={styles.dropContainer}>
            <View style={[styles.drop, {height: dropHeight}]} />
          </View>
        )}
      </Animated.View>
    );
  };

  return (
    <ScrollView
      ref={scrollViewRef}
      onScroll={handleScrollViewScroll}
      onMomentumScrollBegin={() => {
        Animated.spring(pullAnimValue, {
          toValue: pullDistance,
          useNativeDriver: true,
        }).start();
      }}
      onMomentumScrollEnd={handleScrollViewRelease}
      scrollEventThrottle={16}
      refreshControl={renderRefreshControl()}>
      {children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  dropContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#0000ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  drop: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#ffffff',
  },
});

export default PullToRefresh;
