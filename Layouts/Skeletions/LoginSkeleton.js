import React, { useRef, useEffect } from "react";
import { View, StyleSheet, Animated, Easing, ScrollView } from "react-native";

const LoginSkeleton = ({ cardCount = 1 }) => {
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
            <View style={styles.title} />
            <View style={styles.subtitle} />
          </View>
        </Animated.View>
      ))}
    </View>
  );
};

export default LoginSkeleton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
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
    justifyContent: "center",
  },
  imageContainer: {
    width: "100%",
    height: 150,
    backgroundColor: "#d9d9d9",
    borderRadius: 5,
    marginBottom: 15,
  },
  textContainer: {
    // flex: 1,
    width: "100%",
  },
  title: {
    width: "80%",
    height: 40,
    backgroundColor: "#d9d9d9",
    borderRadius: 15,
    marginBottom: 15,
    alignSelf: "center",
  },
  subtitle: {
    width: "50%",
    height: 40,
    backgroundColor: "#d9d9d9",
    borderRadius: 15,
    marginBottom: 15,
    alignSelf: "center",
  },
});
