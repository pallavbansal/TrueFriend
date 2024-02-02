import {CreatePost, getSocialFeedPosts} from '../../Services/FeedServices';
import {useMutation, useQuery, useInfiniteQuery} from '@tanstack/react-query';
import {useSelector} from 'react-redux';

export const useCreatePost = () => {
  const token = useSelector(state => state.Auth.token);
  const {isPending, error, mutate, reset} = useMutation({
    mutationFn: ({data}) => CreatePost(data, token),
  });
  return {isPending, error, mutate, reset};
};

// export const useFetchSocialFeedPosts = () => {
//   const token = useSelector(state => state.Auth.token);
//   const {isPending, error, data, isError} = useQuery({
//     queryFn: () => getSocialFeedPosts(token),
//     queryKey: ['socialfeedposts'],
//   });
//   return {isPending, error, data, isError};
// };

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
    queryFn: ({pageParam = 1}) => getSocialFeedPosts(token, pageParam),
    getNextPageParam: lastPage => {
      // console.log('lastPage in hook', lastPage.data.posts.next_page_url);
      if (!lastPage.data.posts.next_page_url) return undefined;
      const match = lastPage.data.posts.next_page_url.match(/page=(\d+)/);
      const page = match ? Number(match[1]) : undefined;
      // console.log('page in hook', page);
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
