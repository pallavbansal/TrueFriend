import {View, Text, Image, StyleSheet} from 'react-native';
import GradientScreen from '../../Layouts/GradientScreen';
import React from 'react';
import {colors} from '../../Styles/ColorData';

const NoData = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/no_data.png')}
        style={{height: 250, width: 250}}
      />
      <Text
        style={{
          fontSize: 28,
          fontWeight: 'bold',
          marginTop: 10,
          color: colors.arrow.primary,
        }}>
        No Data Available
      </Text>
      <Text
        style={{
          fontSize: 15,
          marginTop: 10,
          textAlign: 'center',
          fontWeight: 'bold',
          color: colors.socialfeed.actionicons,
        }}>
        There is no data to show you right now.
      </Text>
    </View>
  );
};

export default NoData;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -50,
    // backgroundColor: 'white',
  },
});
