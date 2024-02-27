import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from '../../Styles/ColorData';
import React, {useState} from 'react';
import CommentReplyModal from './CommentReplyModal';

const SingleComment = ({data}) => {
  const [showreplymodal, setShowReplyModal] = useState(false);
  const [replydata, setReplyData] = useState(data.replies);

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
                color: colors.text.primary,
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              {data.user.name}
            </Text>
            <Text
              style={{
                color: colors.text.tertiary,
                fontSize: 8,
              }}>
              {data.created_at.split('T')[0]}
            </Text>
          </View>

          <Text
            style={{
              color: colors.text.primary,
              fontSize: 12,
              fontWeight: 'bold',
            }}>
            {data.content}
          </Text>

          <TouchableOpacity
            onPress={() => setShowReplyModal(prev => !prev)}
            style={{
              marginTop: 10,
            }}>
            <Text
              style={{
                color: colors.text.tertiary,
                fontSize: 10,
              }}>
              {showreplymodal ? 'Hide Replies' : 'View Replies'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {showreplymodal && (
        <CommentReplyModal
          data={replydata}
          commentid={data.id}
          setReplyData={setReplyData}
        />
      )}
      <LinearGradient
        colors={colors.gradients.buttongradient}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={{
          height: 1,
          width: '90%',
          marginVertical: 10,
          borderRadius: 10,
          alignSelf: 'center',
        }}></LinearGradient>
    </View>
  );
};

export default SingleComment;

const styles = StyleSheet.create({
  container: {
    // marginVertical: 10,
  },
});
