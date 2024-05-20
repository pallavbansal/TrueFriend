import {StyleSheet, Text, View} from 'react-native';
import {colorData} from '../utils/colorData';
// import Player from '../Extra/player';
import DetailedPlayer from '../Components/DetailedPlayer';
import React from 'react';

const RecordingDetails = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colorData.back2,
        marginTop: 52,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        marginHorizontal: 0.5,
      }}>
      <View
        style={{
          flex: 1,
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 20,
            fontWeight: 'bold',
            marginTop: 50,
            color: 'white',
          }}>
          RecordingDetails
        </Text>
        <DetailedPlayer />
        {/* <Player /> */}
      </View>
    </View>
  );
};

export default RecordingDetails;

const styles = StyleSheet.create({});
