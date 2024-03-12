import {View, Text, Image, StyleSheet} from 'react-native';
import {colors} from '../../Styles/ColorData';
import React from 'react';
import {parseISO, formatDistanceStrict} from 'date-fns';

const SingleCommentReply = ({data}) => {
  const timeAgo = formatDistanceStrict(parseISO(data.created_at), new Date());

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
            source={{uri: data.user.profile_picture}}
            style={{width: 40, height: 40, borderRadius: 20}}
          />
        </View>
        <View style={{flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                // color: colors.text.primary,
                color: 'black',
                fontSize: 12,
                fontWeight: 'bold',
              }}>
              {data.user.name}
            </Text>

            <Text
              style={{
                color: colors.text.secondary,
                fontSize: 8,
              }}>
              {timeAgo} ago
            </Text>
          </View>

          <Text
            style={{
              color: 'black',
              fontSize: 12,
            }}>
            {data.content}
          </Text>
        </View>
      </View>
      <View
        style={{
          height: 0,
          width: '90%',
          marginVertical: 20,
          borderRadius: 10,
          alignSelf: 'center',
          backgroundColor: colors.text.secondary,
        }}></View>
      <View></View>
    </View>
  );
};

export default SingleCommentReply;

const styles = StyleSheet.create({
  container: {
    // marginVertical: 10,
  },
});
