import {View, Text, StyleSheet, TextInput, FlatList} from 'react-native';
import GradientInput from '../Common/GradientInput';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, {useState} from 'react';
import SingleComment from './SingleComment';
import {colors} from '../../Styles/ColorData';

const Data = [
  {
    id: 1,
    name: 'John Doe',
    comment: 'Nice Post',
    image_url: 'https://picsum.photos/id/237/200/300',
  },
  {
    id: 2,
    name: 'Peter parker',
    comment:
      'Hey, I like this post.Hey, I like this post dnidnod dnnfk Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.',
    image_url: 'https://picsum.photos/id/238/200/300',
  },
  {
    id: 3,
    name: 'John Doe',
    comment:
      'Nice Post Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    image_url: 'https://picsum.photos/id/239/200/300',
  },
  {
    id: 4,
    name: 'Peter parker',
    comment: 'Hey, I like this post',
    image_url: 'https://picsum.photos/id/240/200/300',
  },
  {
    id: 5,
    name: 'John Doe',
    comment: 'Nice Post',
    image_url: 'https://picsum.photos/id/241/200/300',
  },
  {
    id: 6,
    name: 'Peter parker',
    comment: 'Hey, I like this post',
    image_url: 'https://picsum.photos/id/242/200/300',
  },
  {
    id: 7,
    name: 'John Doe',
    comment: 'Nice Post',
    image_url: 'https://picsum.photos/id/237/200/300',
  },
  {
    id: 8,
    name: 'Peter parker',
    comment: 'Hey, I like this post',
    image_url: 'https://picsum.photos/id/238/200/300',
  },
  {
    id: 9,
    name: 'John Doe',
    comment: 'Nice Post',
    image_url: 'https://picsum.photos/id/239/200/300',
  },
  {
    id: 10,
    name: 'Peter parker',
    comment: 'Hey, I like this post',
    image_url: 'https://picsum.photos/id/240/200/300',
  },
  {
    id: 11,
    name: 'John Doe',
    comment: 'Nice Post',
    image_url: 'https://picsum.photos/id/241/200/300',
  },
  {
    id: 12,
    name: 'Peter parker',
    comment: 'Hey, I like this post',
    image_url: 'https://picsum.photos/id/242/200/300',
  },
];

const CommentModal = ({feed}) => {
  console.log(feed);
  const [CommentsData, setCommentsData] = useState(Data);
  const [commentinput, setCommentInput] = useState('');

  function handleaddcomment() {
    if (commentinput) {
      setCommentsData(prev => {
        return [
          {
            id: prev.length + 1,
            name: 'John Doe',
            comment: commentinput,
            image_url: 'https://picsum.photos/id/237/200/300',
          },
          ...prev,
        ];
      });
      setCommentInput('');
    }
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
          data={CommentsData}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => <SingleComment data={item} />}
          showsVerticalScrollIndicator={false}
          numColumns={1}
          contentContainerStyle={{paddingBottom: 100}}
        />
      </View>
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
});
