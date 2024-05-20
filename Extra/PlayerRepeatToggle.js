import {colors} from './tokens';
import {useTrackPlayerRepeatMode} from './useTrackPlayerRepeatMode';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {RepeatMode} from 'react-native-track-player';

const repeatOrder = [RepeatMode.Off, RepeatMode.Track, RepeatMode.Queue];

export const PlayerRepeatToggle = props => {
  const {repeatMode, changeRepeatMode} = useTrackPlayerRepeatMode();

  const toggleRepeatMode = () => {
    if (repeatMode == null) return;

    const currentIndex = repeatOrder.indexOf(repeatMode);
    const nextIndex = (currentIndex + 1) % repeatOrder.length;

    changeRepeatMode(repeatOrder[nextIndex]);
  };

  let icon = 'repeat';
  if (repeatMode === RepeatMode.Off) {
    icon = 'repeat-off';
  } else if (repeatMode === RepeatMode.Track) {
    icon = 'repeat-once';
  } else if (repeatMode === RepeatMode.Queue) {
    icon = 'repeat';
  }

  return (
    <MaterialIcons
      name={icon}
      onPress={toggleRepeatMode}
      color={colors.icon}
      {...props}
    />
  );
};
