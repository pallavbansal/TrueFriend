import {fetchNotifications} from '../../Services/NotificationServices';
import {useInfiniteQuery} from '@tanstack/react-query';
import {useSelector} from 'react-redux';

export const useFetchNotifications = () => {
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
    queryKey: ['fetchNotifications', token],
    queryFn: ({pageParam = 1}) => fetchNotifications(token, pageParam),
    getNextPageParam: lastPage => {
      if (!lastPage.data.notifications.next_page_url) return undefined;
      const match =
        lastPage.data.notifications.next_page_url.match(/page=(\d+)/);
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
