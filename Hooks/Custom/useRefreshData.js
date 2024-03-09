// useRefreshData.js
import {useState, useCallback} from 'react';
import {useQueryClient} from '@tanstack/react-query';

export const useRefreshData = () => {
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(
    queryKeys => {
      setRefreshing(true);
      queryClient.invalidateQueries(queryKeys);
      setTimeout(() => setRefreshing(false), 2000);
    },
    [queryClient],
  );

  return {refreshing, onRefresh};
};
