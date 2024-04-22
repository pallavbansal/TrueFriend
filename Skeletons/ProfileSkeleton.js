import React, {useRef, useEffect} from 'react';
import {View, StyleSheet, Animated, Easing} from 'react-native';
const skeletonBackgroundColor = '#f5f5f5';
const skeletonComponentColor = '#e0e0e0';

const ProfileSkeleton = ({cardCount = 1}) => {
  const containerWidth = 400; // Adjust this value based on your container width

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
          <View style={styles.profileImage} />
          <View style={styles.buttonContainer}>
            <View style={styles.button} />
            <View style={styles.button} />
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.button2} />
            <View style={styles.button2} />
          </View>
          <View style={styles.rectangleContainer}>
            {[1, 2].map((_, index) => (
              <View key={index} style={styles.rectanglerow}>
                <View style={styles.rectangle} />
                <View style={styles.rectangle} />
                <View style={styles.rectangle} />
              </View>
            ))}
          </View>
        </Animated.View>
      ))}
    </View>
  );
};

export default ProfileSkeleton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 3,
    alignItems: 'center',
  },
  skeletonCard: {
    width: '100%',
    flex: 1,
    borderRadius: 10,
    padding: 5,
    elevation: 2,
    justifyContent: 'center',
  },
  profileImage: {
    width: '100%',
    height: 250,
    borderRadius: 50,
    backgroundColor: skeletonComponentColor,
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 15,
  },
  button: {
    width: '40%',
    height: 35,
    backgroundColor: skeletonComponentColor,
    borderRadius: 15,
  },
  button2: {
    width: '25%',
    height: 25,
    backgroundColor: skeletonComponentColor,
    borderRadius: 15,
  },
  rectangleContainer: {
    justifyContent: 'space-between',
  },
  rectanglerow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  rectangle: {
    width: '32%',
    height: 160,
    backgroundColor: skeletonComponentColor,
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
    backgroundColor: skeletonComponentColor,
    opacity: 0.2,
  },
});
