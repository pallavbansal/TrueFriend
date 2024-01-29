import React, {useState, useEffect} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import {Provider} from 'react-redux';
import {store} from './Store/store';
import NetInfo from '@react-native-community/netinfo';
import {useNetInfoInstance} from '@react-native-community/netinfo';
import NoInterent from './Components/Common/NoInterent';
import {
  Discover,
  Notification,
  Profile,
  SocialFeed,
  Login,
  Verify,
  ForgotPassword,
  Registration,
  ProfileCreation,
  LiveStream,
  UploadScreenshot,
  FriendsList,
  Payment,
  Recharge,
  Splash,
  Chat,
  Temp,
} from './Screen/index';
import Protect from './Auth/Protect';

const MainNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Temp"
        component={Temp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Discover"
        component={Discover}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Notification"
        component={Notification}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="FriendsList"
        component={FriendsList}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UploadScreenshot"
        component={UploadScreenshot}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Profile" options={{headerShown: false}}>
        {() => <Protect Route="Profile" Component={Profile} />}
      </Stack.Screen>
      <Stack.Screen
        name="SocialFeed"
        component={SocialFeed}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LiveStream"
        component={LiveStream}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Verify"
        component={Verify}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Registration"
        component={Registration}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProfileCreation"
        component={ProfileCreation}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Payment"
        component={Payment}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Recharge"
        component={Recharge}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const queryClient = new QueryClient();

function App() {
  const {
    netInfo: {type, isConnected},
    refresh,
  } = useNetInfoInstance();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {});

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <SafeAreaView style={styles.container}>
            <StatusBar />
            <NavigationContainer>
              {isConnected ? <MainNavigator /> : <NoInterent />}
            </NavigationContainer>
            <Toast autoHide visibilityTime={1000} swipeable />
          </SafeAreaView>
        </Provider>
      </QueryClientProvider>
    </>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
