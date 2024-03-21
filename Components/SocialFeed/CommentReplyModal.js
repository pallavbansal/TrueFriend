import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import GradientInput from '../Common/GradientInput';
import {colors} from '../../Styles/ColorData';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SingleCommentReply from './SingleCommentReply';
import {useSelector} from 'react-redux';
import {useCreateCommentReply} from '../../Hooks/Query/FeedQuery';

const CommentReplyModal = ({data, commentid}) => {
  const userinitaldata = useSelector(state => state.Auth.userinitaldata);
  const {mutate, reset} = useCreateCommentReply();
  const [replyinput, setReplyInput] = useState('');
  const [replydata, setReplyData] = useState(data.replies);

  const handleaddreply = () => {
    if (replyinput) {
      const finalData = {
        comment_id: commentid,
        content: replyinput,
      };

      mutate(
        {data: finalData},
        {
          onSuccess: data => {
            if (data.status_code == '1') {
              setReplyData(prev => {
                return [
                  {
                    id: prev.length + 1 + Math.random(),
                    content: replyinput,
                    created_at: new Date().toISOString(),
                    user: {
                      id: userinitaldata.id,
                      name: userinitaldata.name,
                      profile_picture: userinitaldata.profile_picture,
                    },
                  },
                  ...prev,
                ];
              });
            }
          },
        },
      );
      setReplyInput('');
    }
  };

  return (
    <View style={styles.replycontainer}>
      <View
        style={[
          styles.innerconatiner,
          {
            height: replydata.length > 2 ? 400 : 250,
          },
        ]}>
        <ScrollView
          style={{flex: 1, marginTop: 10}}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}>
          {replydata.length > 0 ? (
            <FlatList
              data={replydata}
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => <SingleCommentReply data={item} />}
              showsVerticalScrollIndicator={false}
              numColumns={1}
              contentContainerStyle={{paddingBottom: 100}}
            />
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 30,
              }}>
              <Text
                style={{
                  color: colors.login.headingtext2,
                  fontSize: 18,
                  fontWeight: 'bold',
                }}>
                No Replies
              </Text>
            </View>
          )}
        </ScrollView>
        <View style={styles.headingsearchcontainer}>
          <GradientInput style={styles.gradientborder}>
            <View style={styles.inputcontainer}>
              <TextInput
                placeholder="Reply"
                keyboardType="email-address"
                placeholderTextColor={colors.login.headingtext2}
                onChangeText={text => setReplyInput(text)}
                value={replyinput}
                cursorColor={colors.login.headingtext2}
                style={{color: colors.login.headingtext2, flex: 1}}
                autoFocus={true}
              />
              <Ionicons
                name="send"
                size={18}
                color={colors.text.secondary}
                onPress={handleaddreply}
              />
            </View>
          </GradientInput>
        </View>
      </View>
    </View>
  );
};

export default CommentReplyModal;

const styles = StyleSheet.create({
  replycontainer: {
    padding: 2,
    borderRadius: 30,
    overflow: 'hidden',
    marginVertical: 10,
    marginLeft: 20,
  },
  innerconatiner: {
    borderRadius: 28,
    backgroundColor: 'rgba(0,0,0,0.1)',
    padding: 10,
  },
  headingsearchcontainer: {
    marginTop: 10,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  gradientborder: {
    padding: 2,
    borderRadius: 30,
    overflow: 'hidden',
    width: '100%',
  },

  inputcontainer: {
    height: 47,
    backgroundColor: colors.text.primary,
    width: '100%',
    borderRadius: 28,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
});
