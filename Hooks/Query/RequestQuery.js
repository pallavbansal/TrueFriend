import {
  sendRequest,
  updateRequest,
  fetchFriends,
  fetchFriendRequests,
  fetchChattingFriends,
  requestCurrentStatus,
} from '../../Services/RequestServices';
import {useMutation, useQuery} from '@tanstack/react-query';
import {useSelector} from 'react-redux';

export const useSendRequest = () => {
  const token = useSelector(state => state.Auth.token);
  const {isPending, error, mutate, reset} = useMutation({
    mutationFn: ({data}) => sendRequest(data, token),
  });
  return {isPending, error, mutate, reset};
};

export const useUpdateRequest = () => {
  const token = useSelector(state => state.Auth.token);
  const {isPending, error, mutate, reset} = useMutation({
    mutationFn: ({data}) => updateRequest(data, token),
  });
  return {isPending, error, mutate, reset};
};

export const useRequestCurrentStatus = id => {
  const token = useSelector(state => state.Auth.token);
  const {isPending, error, data, isError} = useQuery({
    queryFn: () => requestCurrentStatus(id, token),
    queryKey: ['requestCurrentStatus', id, token],
  });

  return {isPending, error, data, isError};
};

export const useFetchFriends = () => {
  const token = useSelector(state => state.Auth.token);
  const {isPending, error, data, isError} = useQuery({
    queryFn: () => fetchFriends(token),
    queryKey: ['fetchFriends', token],
  });

  return {isPending, error, data, isError};
};

export const useFetchFriendRequests = () => {
  const token = useSelector(state => state.Auth.token);
  const {isPending, error, data, isError} = useQuery({
    queryFn: () => fetchFriendRequests(token),
    queryKey: ['fetchFriendRequests', token],
  });
  return {isPending, error, data, isError};
};

const expensiveTransform = data => {
  const tempdata = data.data.map(item => {
    if (item.type === 'SINGLE') {
      const user = item.users[0];
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        profile_picture: user.profile_picture,
        type: 'SINGLE',
        chatfetchid: item.id,
        unseenmsg: 0,
      };
    } else if (item.type === 'GROUP') {
      return {
        id: item.id,
        name: item.name,
        type: 'GROUP',
        grouproomid: item.id,
        profile_picture: item.profile_picture,
        admin_id: item.admin_id,
        chatfetchid: item.id,
        unseenmsg: 0,
      };
    }
  });
  // console.log('Temp data', tempdata);
  return tempdata;
};

export const useFetchChattingFriends = () => {
  const token = useSelector(state => state.Auth.token);
  const {isPending, error, data, isError} = useQuery({
    queryFn: () => fetchChattingFriends(token),
    queryKey: ['fetchChattingFriends', token],
    select: data => expensiveTransform(data),
  });
  return {isPending, error, data, isError};
};
