import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {colors} from '../../Styles/ColorData';
import React, {useState} from 'react';
import CommentReplyModal from './CommentReplyModal';
import {formatDistanceStrict, parseISO} from 'date-fns';

const SingleComment = ({
  data,
  showreplymodal,
  setShowReplyModal,
  feed,
  addreplyincomment,
}) => {
  const timeAgo = formatDistanceStrict(parseISO(data.created_at), new Date());

  const handlesetreplymodal = () => {
    if (showreplymodal.status && showreplymodal.id == data.id) {
      setShowReplyModal({
        status: false,
        id: null,
      });
    } else {
      setShowReplyModal({
        status: true,
        id: data.id,
      });
    }
  };

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
          <View
            style={{
              flexDirection: 'row',
              gap: 10,
            }}>
            <TouchableOpacity
              onPress={handlesetreplymodal}
              style={{
                marginTop: 10,
              }}>
              <Text
                style={{
                  color: colors.text.secondary,
                  fontSize: 10,
                }}>
                {showreplymodal.status && showreplymodal.id == data.id
                  ? 'Hide Replies'
                  : 'View Replies'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {showreplymodal.status === true && showreplymodal.id == data.id && (
        <CommentReplyModal
          data={data}
          commentid={data.id}
          postid={data.post_id}
          addreplyincomment={addreplyincomment}
        />
      )}
      <View
        style={{
          height: 0,
          width: '90%',
          marginVertical: 10,
          borderRadius: 10,
          alignSelf: 'center',
          backgroundColor: colors.text.secondary,
        }}></View>
    </View>
  );
};

export default SingleComment;

const styles = StyleSheet.create({
  container: {
    // marginVertical: 10,
  },
});
