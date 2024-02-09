import React, {useRef, useEffect} from 'react';
import {View, StyleSheet, Animated, Easing} from 'react-native';
import GradientScreen from '../Layouts/GradientScreen';

const LoadingSKeletion = ({type, cardCount = 4}) => {
  const animatedValues = useRef(
    Array.from({length: cardCount}, (_, index) => new Animated.Value(0)),
  ).current;

  const startShimmerAnimation = index => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValues[index], {
          toValue: 1,
          duration: 1000,
          easing: Easing.ease,
          useNativeDriver: false,
        }),
        Animated.timing(animatedValues[index], {
          toValue: 0,
          duration: 1000,
          easing: Easing.ease,
          useNativeDriver: false,
        }),
      ]),
    ).start();
  };

  useEffect(() => {
    animatedValues.forEach((_, index) => startShimmerAnimation(index));
  }, []);

  if (type === 'socialfeeds') {
    return (
      <GradientScreen>
        <View style={styles.container}>
          {animatedValues.map((animatedValue, index) => (
            <Animated.View
              key={index}
              style={[
                styles.skeletonCard,
                {
                  opacity: animatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.5, 1],
                  }),
                },
              ]}>
              <View style={styles.textContainer}>
                <View style={styles.profile} />
                <View style={styles.title} />
              </View>
              <View style={styles.imageContainer} />
            </Animated.View>
          ))}
        </View>
      </GradientScreen>
    );
  }

  return (
    <View style={styles.container}>
      {animatedValues.map((animatedValue, index) => (
        <Animated.View
          key={index}
          style={[
            styles.skeletonCard,
            {
              opacity: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0.5, 1],
              }),
            },
          ]}>
          <View style={styles.imageContainer} />
          <View style={styles.textContainer}>
            <View style={styles.title} />
            <View style={styles.subtitle} />
          </View>
        </Animated.View>
      ))}
    </View>
  );
};

export default LoadingSKeletion;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
  },
  skeletonCard: {
    width: '90%',
    gap: 50,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: 'white',
    padding: 15,
    elevation: 2,
  },
  imageContainer: {
    width: '100%',
    height: 300,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 5,
    marginBottom: 15,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: -10,
  },
  title: {
    width: '30%',
    height: 15,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 5,
  },
  profile: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 50,
  },
});
