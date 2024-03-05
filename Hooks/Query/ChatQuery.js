import {
  fetchChatting,
  createChat,
  createGroup,
  fetchGroupData,
  leaveGroup,
  addUserToGroup,
  removeUserFromGroup,
  editGroupName,
} from '../../Services/ChatServices';
import {useMutation, useQuery, useInfiniteQuery} from '@tanstack/react-query';
import {useSelector} from 'react-redux';

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

export const useCreateGroup = () => {
  const token = useSelector(state => state.Auth.token);
  const {isPending, error, mutate, reset} = useMutation({
    mutationFn: ({data}) => createGroup(token, data),
  });
  return {isPending, error, mutate, reset};
};

export const useFetchGroupData = group_id => {
  const token = useSelector(state => state.Auth.token);
  const {isPending, error, data, isError} = useQuery({
    queryFn: () => fetchGroupData(token, group_id),
    queryKey: ['fetchGroupData', token, group_id],
  });
  return {isPending, error, data, isError};
};

export const useLeaveGroup = () => {
  const token = useSelector(state => state.Auth.token);
  const {isPending, error, mutate, reset} = useMutation({
    mutationFn: ({data}) => leaveGroup(token, data),
  });
  return {isPending, error, mutate, reset};
};

export const useAddUserToGroup = () => {
  const token = useSelector(state => state.Auth.token);
  const {isPending, error, mutate, reset} = useMutation({
    mutationFn: ({data}) => addUserToGroup(token, data),
  });
  return {isPending, error, mutate, reset};
};

export const useRemoveUserFromGroup = () => {
  const token = useSelector(state => state.Auth.token);
  const {isPending, error, mutate, reset} = useMutation({
    mutationFn: ({data}) => removeUserFromGroup(token, data),
  });
  return {isPending, error, mutate, reset};
};

export const useEditGroupName = () => {
  const token = useSelector(state => state.Auth.token);
  const {isPending, error, mutate, reset} = useMutation({
    mutationFn: ({data}) => editGroupName(token, data),
  });
  return {isPending, error, mutate, reset};
};
