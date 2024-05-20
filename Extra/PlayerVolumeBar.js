import {colors} from './tokens';
import {useTrackPlayerVolume} from './useTrackPlayerVolume';
import {utilsStyles} from './index';
import {View} from 'react-native';
import {Slider} from 'react-native-awesome-slider';
import {useSharedValue} from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const PlayerVolumeBar = props => {
  const {volume, updateVolume} = useTrackPlayerVolume();

  const progress = useSharedValue(0);
  const min = useSharedValue(0);
  const max = useSharedValue(1);

  progress.value = volume ?? 0;

  return (
    <View style={props.style}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Ionicons
          name="volume-low"
          size={20}
          color={colors.icon}
          style={{opacity: 0.8}}
        />

        <View style={{flex: 1, flexDirection: 'row', paddingHorizontal: 10}}>
          <Slider
            progress={progress}
            minimumValue={min}
            containerStyle={utilsStyles.slider}
            onValueChange={value => {
              updateVolume(value);
            }}
            renderBubble={() => null}
            theme={{
              maximumTrackTintColor: colors.maximumTrackTintColor,
              minimumTrackTintColor: colors.minimumTrackTintColor,
            }}
            thumbWidth={0}
            maximumValue={max}
          />
        </View>

        <Ionicons
          name="volume-high"
          size={20}
          color={colors.icon}
          style={{opacity: 0.8}}
        />
      </View>
    </View>
  );
};
