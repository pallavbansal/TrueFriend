import {
  createStream,
  endStream,
  getStreamMeetingId,
  getStream,
  getAdjacentStream,
} from '../../Services/StreamServices';
import {useMutation, useQuery, useInfiniteQuery} from '@tanstack/react-query';
import {useSelector} from 'react-redux';

export const useCreateStream = () => {
  const token = useSelector(state => state.Auth.token);
  const {isPending, error, mutate, reset} = useMutation({
    mutationFn: ({data}) => createStream(data, token),
  });
  return {isPending, error, mutate, reset};
};

export const useGetMeetingId = () => {
  const token = useSelector(state => state.Auth.token);
  const {isPending, error, mutate, reset} = useMutation({
    mutationFn: ({data}) => getStreamMeetingId(data, token),
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

export const useFetchStreams = () => {
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
    queryKey: ['streams', token],
    initialPageParam: 1,
    queryFn: ({pageParam}) => getStream(token, pageParam),
    getNextPageParam: lastPage => {
      if (!lastPage.data.streams.next_page_url) return undefined;
      const match = lastPage.data.streams.next_page_url.match(/page=(\d+)/);
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

export const useFetchAdjacentStream = streamId => {
  const token = useSelector(state => state.Auth.token);
  const {data, error, isPending, isError} = useQuery({
    queryFn: () => getAdjacentStream(token, streamId),
    queryKey: ['adjacentstream', token, streamId],
  });
  return {data, error, isPending, isError};
};
