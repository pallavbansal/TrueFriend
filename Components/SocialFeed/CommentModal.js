import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  ScrollView,
} from 'react-native';
import GradientInput from '../Common/GradientInput';
import GradientScreen from '../../Layouts/GradientScreen';
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

const CommentModal = ({feed}) => {
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
              setCommentsData2(prev => {
                return [
                  {
                    id: prev.length + 1,
                    replies: [],
                    content: commentinput,
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
      setCommentInput('');
    }
  }

  useEffect(() => {
    if (data) {
      const newData = data.pages.flatMap(page => page.data.comments.data);
      setCommentsData2(prevData => {
        let combinedData = [...prevData, ...newData];
        return combinedData.filter(
          (value, index, self) =>
            self.findIndex(v => v.id === value.id) === index,
        );
      });
    }
  }, [data]);

  if (isPending) {
    return <Loading />;
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.9)',
        marginTop: 2,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginHorizontal: 2,
      }}>
      <View style={styles.headingsearchcontainer}>
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
      <View style={{paddingBottom: 100, paddingHorizontal: 10}}>
        <FlatList
          data={CommentsData2}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <SingleComment data={item} />}
          showsVerticalScrollIndicator={false}
          numColumns={1}
          contentContainerStyle={{paddingBottom: 100}}
          onEndReachedThreshold={0.5}
          onEndReached={fetchNextPage}
          removeClippedSubviews={true} // Unloads offscreen items
          initialNumToRender={10}
          updateCellsBatchingPeriod={30}
          maxToRenderPerBatch={10}
        />
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
    </View>
  );
};

export default CommentModal;

const styles = StyleSheet.create({
  headingsearchcontainer: {
    marginTop: 10,
    marginHorizontal: 30,
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
  headingtext2: {
    fontFamily: 'Lexend',
    color: colors.login.headingtext2,
    fontWeight: '900',
    fontSize: 14,
    lineHeight: 22.4,
  },
});
