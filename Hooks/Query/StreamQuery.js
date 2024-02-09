import {createStream, endStream} from '../../Services/StreamServices';
import {useMutation, useQuery} from '@tanstack/react-query';
import {useSelector} from 'react-redux';

// [{"key":"meeting_id","value":"1234567","description":"","type":"text"},
// {"key":"type","value":"STREAM","description":"STREAM,VIDEO,AUDIO","type":"text"}]

export const useCreateStream = () => {
  const token = useSelector(state => state.Auth.token);
  const {isPending, error, mutate, reset} = useMutation({
    mutationFn: ({data}) => createStream(data, token),
  });
  return {isPending, error, mutate, reset};
};

export const useEndStream = () => {
  const token = useSelector(state => state.Auth.token);
  const {isPending, error, data, isError} = useQuery({
    queryFn: () => endStream(token),
    queryKey: ['endstream', token],
  });
  return {isPending, error, data, isError};
};
