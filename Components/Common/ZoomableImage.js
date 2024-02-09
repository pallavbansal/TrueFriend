import React from 'react';
import {Animated} from 'react-native';
import {PinchGestureHandler, State} from 'react-native-gesture-handler';

const ZoomableImage = ({source}) => {
  const scale = new Animated.Value(1);

  const onZoomEvent = Animated.event(
    [
      {
        nativeEvent: {scale: scale},
      },
    ],
    {
      useNativeDriver: true,
    },
  );

  const onZoomStateChange = event => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <PinchGestureHandler
      onGestureEvent={onZoomEvent}
      onHandlerStateChange={onZoomStateChange}>
      <Animated.Image
        source={source}
        style={{width: '100%', aspectRatio: 1, transform: [{scale: scale}]}}
        resizeMode="contain"
      />
    </PinchGestureHandler>
  );
};

export default ZoomableImage;
