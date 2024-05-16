import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import Record from './Screen/Record';
import Recordings from './Screen/Recordings';
import RecordingDetails from './Screen/RecordingDetails';
import Settings from './Screen/Settings';
import BottomBar from './Components/Common/BottomBar';
import AudioPlayer from './Components/AudioPlayer';
import TrackPlayer, {
  Capability,
  RatingType,
  RepeatMode,
} from 'react-native-track-player';

const App = () => {
  const [activescreen, setActivescreen] = useState('Recordings');

  const renderScreen = () => {
    useEffect(() => {
      const setupPlayer = async () => {
        try {
          await TrackPlayer.setupPlayer({
            maxCacheSize: 1024 * 10,
          });

          await TrackPlayer.updateOptions({
            ratingType: RatingType.Heart,
            capabilities: [
              Capability.Play,
              Capability.Pause,
              Capability.SkipToNext,
              Capability.SkipToPrevious,
              Capability.Stop,
            ],
          });

          await TrackPlayer.setVolume(0.5); // not too loud
          await TrackPlayer.setRepeatMode(RepeatMode.Queue);
        } catch (e) {
          console.error('Error setting up player:', e);
        }
      };

      setupPlayer();
    }, []);

    switch (activescreen) {
      case 'Record':
        return <Record />;
      case 'Recordings':
        return <Recordings />;
      case 'RecordingDetails':
        return <RecordingDetails />;
      case 'Settings':
        return <Settings />;
      default:
        return <Record />;
    }
  };

  return (
    <View style={styles.container}>
      {renderScreen()}
      <View
        style={{
          position: 'absolute',
          bottom: 70,
          left: 0,
          right: 0,
          marginHorizontal: 5,
          elevation: 10,
        }}>
        <AudioPlayer />
      </View>

      <BottomBar
        activescreen={activescreen}
        setActivescreen={setActivescreen}
      />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
