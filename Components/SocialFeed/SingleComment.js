import {View, Text, Image, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../../Styles/ColorData';
import React from 'react';

const SingleComment = ({data}) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
        }}>
        <View
          style={{
            marginBottom: 'auto',
          }}>
          <Image
            source={{uri: data.image_url}}
            style={{width: 40, height: 40, borderRadius: 20}}
          />
        </View>
        <View style={{flex: 1}}>
          <Text
            style={{
              color: colors.text.primary,
              fontSize: 16,
              fontWeight: 'bold',
            }}>
            {data.name}
          </Text>
          <Text
            style={{
              color: colors.text.primary,
              fontSize: 12,
              fontWeight: 'bold',
            }}>
            {data.comment}
          </Text>
        </View>
      </View>
      <LinearGradient
        colors={colors.gradients.buttongradient}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={{
          height: 1,
          width: '90%',
          marginVertical: 20,
          borderRadius: 10,
          alignSelf: 'center',
        }}></LinearGradient>
      <View></View>
    </View>
  );
};

export default SingleComment;

const styles = StyleSheet.create({
  container: {
    // marginVertical: 10,
  },
});
