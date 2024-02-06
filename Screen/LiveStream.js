import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {colors} from '../Styles/ColorData';
import LinearGradient from 'react-native-linear-gradient';
import {
  MeetingProvider,
  MeetingConsumer,
} from '@videosdk.live/react-native-sdk';
import ILSContainer from '../Components/Streaming/LiveStream/ILSContainer';
import {useNavigation} from '@react-navigation/native';

const LiveStream = ({route}) => {
  const navigation = useNavigation();
  const token = route.params.token;
  const meetingId = route.params.meetingId;
  const micEnabled = route.params.micEnabled
    ? route.params.webcamEnabled
    : false;
  const webcamEnabled = route.params.webcamEnabled
    ? route.params.webcamEnabled
    : false;
  const name = route.params.name ? route.params.name : 'Test User';
  const mode = route.params.mode ? route.params.mode : 'CONFERENCE';

  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      colors={colors.gradients.buttongradient}
      style={{flex: 1}}>
      <View
        style={{
          flex: 1,
        }}>
        <MeetingProvider
          config={{
            meetingId,
            micEnabled: micEnabled,
            webcamEnabled: webcamEnabled,
            name,
            mode, // "CONFERENCE" || "VIEWER"
            notification: {
              title: 'Video SDK Meeting',
              message: 'Meeting is running.',
            },
          }}
          token={token}>
          <MeetingConsumer
            {...{
              onMeetingLeft: () => {
                navigation.navigate('Discover');
              },
            }}>
            {() => {
              return <ILSContainer webcamEnabled={webcamEnabled} />;
            }}
          </MeetingConsumer>
        </MeetingProvider>
      </View>
    </LinearGradient>
  );
};

export default LiveStream;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  topcontainer: {
    flex: 1,
    backgroundColor: 'red',
    borderBottomLeftRadius: 75,
    borderBottomRightRadius: 75,
    marginBottom: 100,
    overflow: 'hidden',
  },
  bottomcontainer1: {
    position: 'absolute',
    bottom: 62.5,
    alignSelf: 'center',
    borderRadius: 40,
    zIndex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomcontainer2: {
    height: 100,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  gradienticon: {
    height: 85,
    width: 85,
    borderRadius: 42.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calliconcontainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 75,
    width: 75,
    borderRadius: 40,
  },
  bottomiconcontainer: {
    flexDirection: 'row',
    gap: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsiconcontainer: {
    position: 'absolute',
    bottom: 75,
    right: 26,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  singlestatsicon: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },

  namecontainer: {
    position: 'absolute',
    alignItems: 'center',
    bottom: 100,
    left: 26,
  },
  nametopcontainer: {
    position: 'relative',
    flexDirection: 'row',
    marginRight: 'auto',
    gap: 10,
    backgroundColor: colors.arrow.primary,
    padding: 2,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
});
