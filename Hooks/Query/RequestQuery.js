import {
  sendRequest,
  updateRequest,
  fetchFriends,
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

export const useFetchFriends = () => {
  const token = useSelector(state => state.Auth.token);
  const {isPending, error, data, isError} = useQuery({
    queryFn: () => fetchFriends(token),
    queryKey: ['fetchFriends', token],
  });
  return {isPending, error, data, isError};
};
