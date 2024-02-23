import BackgroundService from 'react-native-background-actions';
import Geolocation from '@react-native-community/geolocation';

const sendLocationToServer = async (latitude, longitude, token) => {
  console.log('sendLocationToServer token:', token);
  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      // Add any additional headers required for your API
    },
    body: JSON.stringify({
      latitude,
      longitude,
      // Add any additional data you want to send to the server
    }),
  };
  const response = await fetch(
    'https://e-stat.boxinallsoftech.com/public/api/v1/location/update',
    config,
  );
  try {
    // console.log('sendLocationToServer Response Data 2 :', response);
    if (response.ok) {
      const responseData = await response.json();
      console.log('Response Data:', responseData);
      // Handle the response data here
    }
    // Handle the response here, such as checking for success or processing the data
  } catch (error) {
    //   console.error('Fetch Error:', error);
    // Handle any errors that occur during the fetch request
  }
};
const fetchLocationInBackground = async token => {
  try {
    const options = {
      enableHighAccuracy: false,
      timeout: 60000, // Adjust timeout as needed
    };

    const fetchLocation = async () => {
      return new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(
          async position => {
            const {latitude, longitude} = position.coords;
            console.log('Background Location:', {latitude, longitude});
            await sendLocationToServer(latitude, longitude, token);
            resolve();
          },
          error => {
            console.error('Background Location Error:', error);
            reject(error);
          },
          options,
        );
      });
    };

    const intervalId = setInterval(async () => {
      try {
        await fetchLocation();
      } catch (error) {
        console.error('Error fetching location:', error);
      }
    }, 60000);

    // Stop fetching location when BackgroundService is stopped
    await new Promise(resolve => {
      BackgroundService.on('stop', () => {
        clearInterval(intervalId);
        resolve();
      });
    });

    console.log('Background location service stopped successfully!');
  } catch (error) {
    console.error('Error in fetchLocationInBackground:', error);
  }
};

const startBackgroundLocationService = async token => {
  if (BackgroundService.isRunning()) {
    console.log('Background socket service is already running');
    return;
  }
  requestLocationPermission(token);
};

const requestLocationPermission = async token => {
  const options = {
    taskName: 'BackgroundLocationTask',
    taskTitle: 'Background Location Task',
    taskDesc: 'Fetches location in the background',
    taskIcon: {
      name: 'ic_launcher',
      type: 'mipmap',
    },
    color: '#ff00ff',
    parameters: {
      delay: 60000, // Adjust the delay as needed
    },
  };

  try {
    await BackgroundService.start(
      taskData => fetchLocationInBackground(token),
      options,
    );
    console.log('Background location service started successfully!');
  } catch (e) {
    console.error('Failed to start background location service:', e);
  }
};

const stopBackgroundLocationService = async () => {
  try {
    await BackgroundService.stop();
    console.log('Background location service stopped successfully!');
  } catch (e) {
    console.error('Failed to stop background location service:', e);
  }
};

export {startBackgroundLocationService, stopBackgroundLocationService};
