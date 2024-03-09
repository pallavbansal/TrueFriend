// import {View, ActivityIndicator} from 'react-native';
// import React from 'react';

// const MyLoadingIndicator = ({isRefreshing}) => {
//   return isRefreshing ? (
//     <View
//       style={{
//         position: 'absolute',
//         top: 20,
//         width: '100%',
//         alignItems: 'center',
//         zIndex: 2,
//       }}>
//       <View
//         style={{
//           backgroundColor: 'white',
//           padding: 5,
//           borderRadius: 30,
//         }}>
//         <ActivityIndicator size={30} color="#F74581" />
//       </View>
//     </View>
//   ) : null;
// };

// export default MyLoadingIndicator;
import {View, ActivityIndicator, Animated} from 'react-native';
import React, {useEffect, useRef} from 'react';

const MyLoadingIndicator = ({isRefreshing}) => {
  const position = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(position, {
        toValue: 50,
        duration: 100,
        useNativeDriver: false,
      }),
      Animated.delay(2000),
      Animated.timing(position, {
        toValue: -100,
        duration: 500,
        useNativeDriver: false,
      }),
    ]).start();
  }, [isRefreshing]);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: position,
        width: '100%',
        alignItems: 'center',
        zIndex: 2,
      }}>
      <View
        style={{
          backgroundColor: 'white',
          padding: 5,
          borderRadius: 30,
        }}>
        <ActivityIndicator size={30} color="black" />
      </View>
    </Animated.View>
  );
};

export default MyLoadingIndicator;
