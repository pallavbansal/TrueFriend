import React, { useRef, useEffect } from "react";
import { View, StyleSheet, Animated, Easing, ScrollView } from "react-native";

const DetailsSkeleton = ({ cardCount = 1 }) => {
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
            <View style={styles.horizontalimageContainer}>
              <View style={styles.imageContainer2} />
              <View style={styles.imageContainer2} />
            </View>
            <View style={styles.title} />
            <View style={styles.title2} />
            <View style={styles.subtitle} />
            <View style={styles.horizontalimageContainer}>
              <View style={styles.imageContainer2} />
              <View style={styles.imageContainer2} />
            </View>
          </View>
        </Animated.View>
      ))}
    </View>
  );
};

export default DetailsSkeleton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "black",
    padding: 10,
    alignItems: "center",
  },
  skeletonCard: {
    width: "98%",
    flex: 1,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: "#f0f0f0",
    padding: 15,
    elevation: 2,
    marginBottom: 70,
  },
  imageContainer: {
    width: "100%",
    height: 200,
    backgroundColor: "#d9d9d9",
    borderRadius: 5,
    marginBottom: 15,
  },
  horizontalimageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  imageContainer2: {
    width: "48%",
    height: 100,
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
  title2: {
    width: "60%",
    height: 15,
    backgroundColor: "#d9d9d9",
    borderRadius: 5,
    marginBottom: 8,
  },
  subtitle: {
    width: "40%",
    height: 12,
    backgroundColor: "#d9d9d9",
    borderRadius: 5,
    marginBottom: 8,
  },
  subtitle2: {
    width: "50%",
    height: 12,
    backgroundColor: "#d9d9d9",
    borderRadius: 5,
    marginBottom: 8,
  },
});
