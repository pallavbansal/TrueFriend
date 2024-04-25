import React, {useRef, useEffect} from 'react';
import {View, StyleSheet, Animated, Easing} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../Styles/ColorData';
// const skeletonBackgroundColor = '#f5f5f5';
// const skeletonComponentColor = '#e0e0e0';
// const skeletonBackgroundColor = 'rgba(0,0,0,0.7)';
// const skeletonComponentColor = 'rgba(0,0,0,0.3)';

const RectangleSkeleton = ({
  cardCount = 1,
  containerStyle,
  skeletonCardStyle,
  skeletonBackgroundColor = 'rgba(0,0,0,0.7)',
  skeletonComponentColor = 'rgba(0,0,0,0.3)',
}) => {
  const containerWidth = 400;

  const animatedValues = useRef(
    Array.from({length: cardCount}, (_, index) => new Animated.Value(0)),
  ).current;

  const startShimmerAnimation = index => {
    animatedValues[index].setValue(0);
    Animated.loop(
      Animated.timing(animatedValues[index], {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  };

  useEffect(() => {
    animatedValues.forEach((_, index) => startShimmerAnimation(index));
  }, []);

  return (
    <LinearGradient
      colors={colors.gradients.buttongradient}
      style={[styles.container, containerStyle]}>
      {animatedValues.map((animatedValue, index) => (
        <Animated.View
          key={index}
          style={[
            styles.skeletonCard,
            skeletonCardStyle,
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
            <View
              style={[
                styles.gradient,
                {
                  backgroundColor: skeletonComponentColor,
                },
              ]}
            />
          </Animated.View>
        </Animated.View>
      ))}
    </LinearGradient>
  );
};

export default RectangleSkeleton;

const styles = StyleSheet.create({
  container: {
    height: 134,
    width: 109,
    margin: 3,
    padding: 2,
    marginBottom: 10,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: 'red',
  },
  skeletonCard: {
    width: '100%',
    flex: 1,
    borderRadius: 10,
    padding: 5,
    elevation: 2,
    justifyContent: 'center',
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
    // backgroundColor: skeletonComponentColor,
    opacity: 0.4,
  },
});
