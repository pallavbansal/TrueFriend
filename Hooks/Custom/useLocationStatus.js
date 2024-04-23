import {useEffect, useState} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import {
  isLocationEnabled,
  promptForEnableLocationIfNeeded,
} from 'react-native-android-location-enabler';

const useLocationStatus = () => {
  const [isLocationEnabledData, setIsLocationEnabledData] = useState(false);
  const [locationPermissionGranted, setLocationPermissionGranted] =
    useState(false);
  useEffect(() => {
    const checkLocationStatus = async () => {
      if (Platform.OS === 'android') {
        const enabled = await isLocationEnabled();
        setIsLocationEnabledData(enabled);

        // console.log(
        //   'Location enabled:---------------------------------',
        //   enabled,
        // );

        if (enabled) {
          try {
            const granted = await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
              {
                title: 'Location Permission',
                message:
                  'This app requires location access to function properly.',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
              },
            );
            // console.log('Location permission granted:', granted);
            // console.log(
            //   'Location permission granted:',
            //   granted === PermissionsAndroid.RESULTS.GRANTED,
            // );
            setLocationPermissionGranted(
              granted === PermissionsAndroid.RESULTS.GRANTED,
            );
          } catch (err) {
            console.error('Error requesting location permission:', err);
          }
        }
      }
    };

    checkLocationStatus();
    const interval = setInterval(checkLocationStatus, 5000);

    return () => clearInterval(interval);
  }, []);

  const enableLocation = async () => {
    if (Platform.OS === 'android') {
      try {
        const enableResult = await promptForEnableLocationIfNeeded({
          title: 'Enable Location',
          text: 'This app requires location access to function properly.',
          positiveButtonText: 'Enable',
          negativeButtonText: 'Cancel',
        });

        if (enableResult === 'enabled') {
          setIsLocationEnabledData(true);
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Permission',
              message:
                'This app requires location access to function properly.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          setLocationPermissionGranted(
            granted === PermissionsAndroid.RESULTS.GRANTED,
          );
        }
      } catch (err) {
        console.error('Error enabling location:', err);
      }
    }
  };

  return {isLocationEnabledData, locationPermissionGranted, enableLocation};
};

export default useLocationStatus;
