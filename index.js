import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import notifee, {EventType} from '@notifee/react-native';
import {register} from '@videosdk.live/react-native-sdk';

notifee.onBackgroundEvent(async ({type, detail}) => {
  const {notification, pressAction} = detail;
  console.log('notification---------------------', notification);
  console.log('pressAction----------------------', pressAction);
});

register();

AppRegistry.registerComponent(appName, () => App);
