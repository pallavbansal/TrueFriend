import {
  CreatePost,
  getSocialFeedPosts,
  likePost,
  dislikePost,
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
