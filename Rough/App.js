import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Record from './Screen/Record';
import Recordings from './Screen/Recordings';
import RecordingDetails from './Screen/RecordingDetails';
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Recordings"
          component={Recordings}
          options={{title: 'Audio Recordings'}}
        />
        <Stack.Screen
          name="Record"
          component={Record}
          options={{title: 'Record Audio'}}
        />
        <Stack.Screen
          name="RecordingDetails"
          component={RecordingDetails}
          options={{title: 'Recording Details'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
