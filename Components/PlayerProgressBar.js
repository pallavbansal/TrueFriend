import {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Slider} from 'react-native-awesome-slider';
import TrackPlayer, {useProgress} from 'react-native-track-player';

const formatSecondsToMinutes = seconds => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};

export const PlayerProgressBar = () => {
  const {duration, position} = useProgress(250);
  const [isSliding, setIsSliding] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isSliding) {
      setProgress(duration > 0 ? position / duration : 0);
    }
  }, [duration, position, isSliding]);

  const trackElapsedTime = formatSecondsToMinutes(position);
  const trackRemainingTime = formatSecondsToMinutes(duration - position);

  const handleSlidingStart = () => {
    setIsSliding(true);
  };

  const handleValueChange = async value => {
    await TrackPlayer.seekTo(value * duration);
  };

  const handleSlidingComplete = async value => {
    setIsSliding(false);
    await TrackPlayer.seekTo(value * duration);
  };

  return (
    <View>
      <Slider
        progress={progress}
        minimumValue={0}
        maximumValue={1}
        containerStyle={styles.slider}
        thumbWidth={0}
        renderBubble={() => null}
        theme={{
          minimumTrackTintColor: '#FF4081', // Replace with your desired color
          maximumTrackTintColor: '#BDBDBD', // Replace with your desired color
        }}
        onSlidingStart={handleSlidingStart}
        onValueChange={handleValueChange}
        onSlidingComplete={handleSlidingComplete}
      />
      <View style={styles.timeRow}>
        <Text style={styles.timeText}>{trackElapsedTime}</Text>
        <Text style={styles.timeText}>
          {'-'} {trackRemainingTime}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  slider: {
    marginTop: 10,
    marginBottom: 10,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginTop: 20,
  },
  timeText: {
    fontSize: 12,
    color: '#333333', // Replace with your desired color
    opacity: 0.75,
    letterSpacing: 0.7,
    fontWeight: '500',
  },
});
