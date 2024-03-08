import React, {useRef, useState} from 'react';
import {Animated, ActivityIndicator, View} from 'react-native';
import {PanGestureHandler, State} from 'react-native-gesture-handler';
import {useQueryClient} from '@tanstack/react-query';

const ReLoader = ({children, queryKeys}) => {
  const translateY = useRef(new Animated.Value(0)).current;

  // Create an interpolated translateY value that clamps the translation to a maximum of 50
  const clampedTranslateY = translateY.interpolate({
    inputRange: [-1, 0, 10],
    outputRange: [0, 0, 10],
    extrapolate: 'clamp',
  });
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);

  const onGestureEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationY: translateY,
        },
      },
    ],
    {useNativeDriver: true},
  );

  const onHandlerStateChange = async ({nativeEvent}) => {
    if (nativeEvent.oldState === State.ACTIVE) {
      Animated.spring(translateY, {
        toValue: 0,
        friction: 20, // Adjust this to make the spring more bouncy
        tension: 40, // Adjust this to make the spring more stiff
        useNativeDriver: true,
      }).start();

      if (nativeEvent.translationY > 0 && loading === false) {
        setLoading(true);
        if (queryKeys) {
          await Promise.all(
            queryKeys.map(key => queryClient.invalidateQueries(key)),
          );
          setLoading(false);
        } else {
          setLoading(false);
        }
      }
    }
  };

  return (
    // <PanGestureHandler
    //   onGestureEvent={onGestureEvent}
    //   onHandlerStateChange={onHandlerStateChange}>
    //   <Animated.View
    //     style={{transform: [{translateY: clampedTranslateY}], flex: 1}}>
    //     {loading && (
    //       <View
    //         style={{
    //           position: 'absolute',
    //           top: 10,
    //           width: '100%',
    //           alignItems: 'center',
    //         }}>
    //         <ActivityIndicator size="large" color="#F74581" />
    //       </View>
    //     )}
    //     {children}
    //   </Animated.View>
    // </PanGestureHandler>
    <>{children}</>
  );
};

export default ReLoader;
