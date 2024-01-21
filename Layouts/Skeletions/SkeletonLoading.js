import React, { useRef, useEffect } from "react";
import { View, StyleSheet, Animated, Easing } from "react-native";

const SkeletonLoading = ({ cardCount = 4 }) => {
  // const cardCount = 4;

  const animatedValues = useRef(
    Array.from({ length: cardCount }, (_, index) => new Animated.Value(0))
  ).current;

  const startShimmerAnimation = (index) => {
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
      ])
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
              opacity: animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0.5, 1],
              }),
            },
          ]}
        >
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

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  skeletonCard: {
    width: "48%",
    height: 250,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: "#f0f0f0",
    padding: 15,
    elevation: 2,
  },
  imageContainer: {
    width: "100%",
    height: 120,
    backgroundColor: "#d9d9d9",
    borderRadius: 5,
    marginBottom: 15,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    width: "80%",
    height: 15,
    backgroundColor: "#d9d9d9",
    borderRadius: 5,
    marginBottom: 8,
  },
  subtitle: {
    width: "60%",
    height: 12,
    backgroundColor: "#d9d9d9",
    borderRadius: 5,
  },
});

export default SkeletonLoading;
