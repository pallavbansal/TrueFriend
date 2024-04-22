import React, {useRef, useEffect} from 'react';
import {View, StyleSheet, Animated, Easing} from 'react-native';

const skeletonBackgroundColor = '#f5f5f5';
const shimmerColor = '#f5f5f5';

const DiscoverSkeleton = ({cardCount = 1}) => {
  const containerWidth = 400;
  const animatedValues = useRef(
    Array.from({length: cardCount}, () => new Animated.Value(0)),
  ).current;

  const startShimmerAnimation = index => {
    animatedValues[index].setValue(0);
    Animated.loop(
      Animated.timing(animatedValues[index], {
        toValue: 1,
        duration: 1200,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  };

  useEffect(() => {
    animatedValues.forEach((_, index) => startShimmerAnimation(index));
  }, []);

  return (
    <View style={styles.container}>
      {animatedValues.map((animatedValue, index) => (
        <Animated.View
          key={index}
          style={[
            styles.skeletonCard,
            {
              backgroundColor: skeletonBackgroundColor,
              overflow: 'hidden',
            },
          ]}>
          <Animated.View
            style={[
              styles.gradientContainer,
              {
                transform: [
                  {
                    translateX: animatedValue.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-containerWidth, containerWidth],
                    }),
                  },
                ],
              },
            ]}>
            <View style={styles.gradient} />
          </Animated.View>
          <Animated.View
            style={[
              styles.profileImage,
              {
                opacity: animatedValue.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [0.5, 1, 0.5],
                }),
              },
            ]}
          />
        </Animated.View>
      ))}
    </View>
  );
};

export default DiscoverSkeleton;

const styles = StyleSheet.create({
  container: {
    height: 134,
    width: 109,
    margin: 3,
  },
  skeletonCard: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    padding: 5,
    elevation: 2,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    borderRadius: 10,
  },
  gradientContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  gradient: {
    flex: 1,
    backgroundColor: shimmerColor,
    opacity: 1,
  },
});
