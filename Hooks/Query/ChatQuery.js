import {fetchChatting, createChat} from '../../Services/ChatServices';
import {useMutation, useQuery, useInfiniteQuery} from '@tanstack/react-query';
import {useSelector} from 'react-redux';

// export const useFetchChatting = receiver_id => {
//   const token = useSelector(state => state.Auth.token);
//   const {isPending, error, data, isError} = useQuery({
//     queryFn: () => fetchChatting(token, receiver_id),
//     queryKey: ['fetchChatting', token, receiver_id],
//   });
//   return {isPending, error, data, isError};
// };

export const useCreateChat = () => {
  const token = useSelector(state => state.Auth.token);
  const {isPending, error, mutate, reset} = useMutation({
    mutationFn: ({data}) => createChat(token, data),
  });
  return {isPending, error, mutate, reset};
};

export const useFetchChatting = receiver_id => {
  const token = useSelector(state => state.Auth.token);
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    fetchPreviousPage,
    hasPreviousPage,
    isFetchingPreviousPage,
    isPending,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ['fetchChatting', token, receiver_id],
    queryFn: ({pageParam = 1}) => fetchChatting(token, receiver_id, pageParam),
    getNextPageParam: lastPage => {
      if (!lastPage.data.chats.next_page_url) return undefined;
      const match = lastPage.data.chats.next_page_url.match(/page=(\d+)/);
      const page = match ? Number(match[1]) : undefined;
      return page;
    },
    getPreviousPageParam: firstPage => {
      if (!firstPage.data.chats.prev_page_url) return undefined;
      const match = firstPage.data.chats.prev_page_url.match(/page=(\d+)/);
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
    fetchPreviousPage,
    hasPreviousPage,
    isFetchingPreviousPage,
    isPending,
    isFetching,
  };
};
