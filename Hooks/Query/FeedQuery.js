import {
  CreatePost,
  getSocialFeedPosts,
  likePost,
  dislikePost,
  createPostComment,
  createCommentReply,
  getPostComments,
} from '../../Services/FeedServices';
import {useMutation, useQuery, useInfiniteQuery} from '@tanstack/react-query';
import {useSelector} from 'react-redux';

export const useCreatePost = () => {
  const token = useSelector(state => state.Auth.token);
  const {isPending, error, mutate, reset} = useMutation({
    mutationFn: ({data}) => CreatePost(data, token),
  });
  return {isPending, error, mutate, reset};
};

export const useFetchSocialFeedPosts = () => {
  const token = useSelector(state => state.Auth.token);
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ['socialfeedposts'],
    initialPageParam: 1,
    queryFn: ({pageParam}) => getSocialFeedPosts(token, pageParam),
    getNextPageParam: lastPage => {
      if (!lastPage.data.posts.next_page_url) return undefined;
      const match = lastPage.data.posts.next_page_url.match(/page=(\d+)/);
      const page = match ? Number(match[1]) : undefined;
      return page;
    },
  });

  return {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    isFetching,
  };
};

export const useLikePost = () => {
  const token = useSelector(state => state.Auth.token);
  const {mutate, reset} = useMutation({
    mutationFn: ({postid}) => likePost(token, postid),
  });
  return {mutate, reset};
};

export const useDislikePost = () => {
  const token = useSelector(state => state.Auth.token);
  const {mutate, reset} = useMutation({
    mutationFn: ({postid}) => dislikePost(token, postid),
  });
  return {mutate, reset};
};

export const useFetchPostComments = postid => {
  const token = useSelector(state => state.Auth.token);
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ['postcomments', postid],
    initialPageParam: 1,
    queryFn: ({pageParam}) => getPostComments(token, postid, pageParam),
    getNextPageParam: lastPage => {
      if (!lastPage.data.comments.next_page_url) return undefined;
      const match = lastPage.data.comments.next_page_url.match(/page=(\d+)/);
      const page = match ? Number(match[1]) : undefined;
      return page;
    },
  });
  return {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    isFetching,
  };
};

export const useCreatePostComment = () => {
  const token = useSelector(state => state.Auth.token);
  const {isPending, error, mutate, reset} = useMutation({
    mutationFn: ({data}) => createPostComment(token, data),
  });
  return {isPending, error, mutate, reset};
};

export const useCreateCommentReply = () => {
  const token = useSelector(state => state.Auth.token);
  const {isPending, error, mutate, reset} = useMutation({
    mutationFn: ({data}) => createCommentReply(token, data),
  });
  return {isPending, error, mutate, reset};
};
