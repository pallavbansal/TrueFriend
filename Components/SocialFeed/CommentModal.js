import {View, Text, StyleSheet, TextInput, FlatList, Image} from 'react-native';
import GradientInput from '../Common/GradientInput';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, {useState, useEffect} from 'react';
import SingleComment from './SingleComment';
import {colors} from '../../Styles/ColorData';
import {
  useFetchPostComments,
  useCreatePostComment,
} from '../../Hooks/Query/FeedQuery';
import {useSelector} from 'react-redux';
import Loading from '../../Screen/Loading';
import GradientText from '../Common/GradientText';
import {useQueryClient} from '@tanstack/react-query';

const CommentModal = ({feed}) => {
  const queryClient = useQueryClient();
  const userinitaldata = useSelector(state => state.Auth.userinitaldata);
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    isFetching,
  } = useFetchPostComments(feed.id);
  const {mutate, reset} = useCreatePostComment();
  const [CommentsData2, setCommentsData2] = useState([]);
  const [commentinput, setCommentInput] = useState('');
  const [showreplymodal, setShowReplyModal] = useState({
    status: false,
    id: null,
  });

  function handleaddcomment() {
    if (commentinput) {
      const finalData = {
        post_id: feed.id,
        content: commentinput,
      };
      mutate(
        {data: finalData},
        {
          onSuccess: data => {
            if (data.status_code == '1') {
              queryClient.invalidateQueries({
                queryKey: ['postcomments', feed.id],
              });
            }
          },
        },
      );
      setCommentInput('');
    }
  }

  useEffect(() => {
    if (data) {
      let newData = data.pages.map(page => page.data.comments.data).flat();
      setCommentsData2(newData);
    }
  }, [data]);

  const addreplyincomment = ({commentid, data}) => {
    let newdata = CommentsData2.map(item => {
      if (item.id == commentid) {
        return {
          ...item,
          replies: [...item.replies, data],
        };
      }
      return item;
    });
    setCommentsData2(newdata);
    queryClient.invalidateQueries({
      queryKey: ['postcomments', feed.id],
    });
  };

  if (isPending) {
    return <Loading />;
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        marginTop: 2,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginHorizontal: 2,
      }}>
      {CommentsData2.length > 0 && (
        <View
          style={{
            paddingTop: 10,
            paddingHorizontal: 20,
          }}>
          <Text
            style={{
              color: colors.login.headingtext2,
              fontSize: 18,
              fontWeight: 'bold',
            }}>
            Comments
          </Text>
        </View>
      )}
      <View style={{paddingHorizontal: 10, paddingTop: 10, flex: 1}}>
        {CommentsData2.length > 0 ? (
          <FlatList
            data={CommentsData2}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <SingleComment
                data={item}
                addreplyincomment={addreplyincomment}
                showreplymodal={showreplymodal}
                setShowReplyModal={setShowReplyModal}
                feed={feed}
              />
            )}
            showsVerticalScrollIndicator={false}
            numColumns={1}
            contentContainerStyle={{paddingBottom: 100}}
            onEndReachedThreshold={0.5}
            onEndReached={fetchNextPage}
            removeClippedSubviews={true}
            initialNumToRender={10}
            updateCellsBatchingPeriod={30}
            maxToRenderPerBatch={10}
          />
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: colors.login.headingtext2,
                fontSize: 18,
                fontWeight: 'bold',
              }}>
              No Comments
            </Text>
          </View>
        )}
      </View>
      {isFetching || isFetchingNextPage ? (
        <View
          style={{
            position: 'absolute',
            bottom: 60,
            width: '100%',
            backgroundColor: 'transparent',
            alignItems: 'center',
          }}>
          <View
            style={{
              paddingHorizontal: 20,
              paddingVertical: 5,
              borderRadius: 20,
              backgroundColor: colors.text.primary,
            }}>
            <GradientText style={styles.headingtext2}>Loading</GradientText>
          </View>
        </View>
      ) : null}

      <View style={styles.headingsearchcontainer}>
        <Image
          source={{uri: userinitaldata.profile_picture}}
          style={{width: 40, height: 40, borderRadius: 20}}
        />
        <GradientInput style={styles.gradientborder}>
          <View style={styles.inputcontainer}>
            <TextInput
              placeholder="Comment"
              keyboardType="email-address"
              placeholderTextColor={colors.login.headingtext2}
              onChangeText={text => setCommentInput(text)}
              value={commentinput}
              cursorColor={colors.login.headingtext2}
              style={{color: colors.login.headingtext2, flex: 1}}
              autoFocus={true}
            />
            <Ionicons
              name="send"
              size={18}
              color={colors.text.secondary}
              onPress={handleaddcomment}
            />
          </View>
        </GradientInput>
      </View>
    </View>
  );
};

export default CommentModal;

const styles = StyleSheet.create({
  headingsearchcontainer: {
    marginTop: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  gradientborder: {
    padding: 2,
    borderRadius: 30,
    overflow: 'hidden',
    flex: 1,
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
  headingtext2: {
    fontFamily: 'Lexend',
    color: colors.login.headingtext2,
    fontWeight: '900',
    fontSize: 14,
    lineHeight: 22.4,
  },
});
