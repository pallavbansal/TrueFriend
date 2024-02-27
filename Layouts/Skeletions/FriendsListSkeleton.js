import React, {useRef, useEffect} from 'react';
import {View, StyleSheet, Animated, Easing} from 'react-native';
import GradientScreen from '../GradientScreen';

const FriendsListSkeleton = ({cardCount = 5}) => {
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

  return (
    <GradientScreen>
      <View style={styles.container}>
        <View style={styles.inputField} />
        <View style={styles.optionsField}>
          <View style={styles.minititle} />
          <View style={styles.minititle} />
        </View>
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
              <View style={styles.minititle} />
            </View>
          </Animated.View>
        ))}
      </View>
    </GradientScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    padding: 10,
  },
  inputField: {
    height: 40,
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 30,
    borderRadius: 25,
    marginBottom: 20,
    backgroundColor: '#d9d9d9',
  },
  optionsField: {
    flexDirection: 'row',
    gap: 10,
  },
  skeletonCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 15,
  },
  imageContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    backgroundColor: '#d9d9d9',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    width: '80%',
    height: 20,
    backgroundColor: '#d9d9d9',
    borderRadius: 15,
  },
  minititle: {
    width: '30%',
    height: 20,
    backgroundColor: '#d9d9d9',
    borderRadius: 15,
    marginVertical: 10,
  },
});

export default FriendsListSkeleton;
