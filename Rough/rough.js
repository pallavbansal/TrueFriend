// async function geolocation() {
//   try {
//     const granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//       {
//         title: 'Location Permission',
//         message: 'This app needs access to your location',
//         buttonNeutral: 'Ask Me Later',
//         buttonNegative: 'Cancel',
//         buttonPositive: 'OK',
//       },
//     );
//     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//       Geolocation.getCurrentPosition(
//         position => {
//           const {latitude, longitude} = position.coords;
//           console.log(latitude, longitude);
//         },
//         error => {
//           console.error(error);
//         },
//         {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
//       );
//     } else {
//       console.log('Location permission denied');
//     }
//   } catch (err) {
//     console.warn(err);
//   }
// }
