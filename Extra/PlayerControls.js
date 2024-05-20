import {colors} from './tokens';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import TrackPlayer, {useIsPlaying} from 'react-native-track-player';

export const PlayerControls = ({style}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.row}>
        <SkipToPreviousButton />

        <PlayPauseButton />

        <SkipToNextButton />
      </View>
    </View>
  );
};

export const PlayPauseButton = ({style, iconSize = 48}) => {
  const {playing} = useIsPlaying();

  return (
    <View style={[{height: iconSize}, style]}>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={playing ? TrackPlayer.pause : TrackPlayer.play}>
        <MaterialIcons
          name={playing ? 'pause' : 'play'}
          size={iconSize}
          color={colors.text}
        />
      </TouchableOpacity>
    </View>
  );
};

export const SkipToNextButton = ({iconSize = 30}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => TrackPlayer.skipToNext()}>
      <MaterialIcons name="forward" size={iconSize} color={colors.text} />
    </TouchableOpacity>
  );
};

export const SkipToPreviousButton = ({iconSize = 30}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => TrackPlayer.skipToPrevious()}>
      <MaterialIcons name={'backward'} size={iconSize} color={colors.text} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});
