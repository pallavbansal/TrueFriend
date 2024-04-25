import {
  getPackages,
  buyPackages,
  getWallet,
  getDiamondTransaction,
  getPaymentTransactions,
  requestPayout,
} from '../../Services/WalletServices';
import {useMutation, useQuery, useInfiniteQuery} from '@tanstack/react-query';
import {useSelector} from 'react-redux';

export const useFetchPackageData = () => {
  const token = useSelector(state => state.Auth.token);
  const {isPending, error, data, isError} = useQuery({
    queryFn: () => getPackages(token),
    queryKey: ['getPackages', token],
  });
  return {isPending, error, data, isError};
};

export const useBuyPackage = () => {
  const token = useSelector(state => state.Auth.token);
  const {mutate, reset, isPending, error} = useMutation({
    mutationFn: ({data}) => buyPackages(token, data),
  });
  return {mutate, reset, isPending, error};
};

export const useRequestPayout = () => {
  const token = useSelector(state => state.Auth.token);
  const {mutate, reset, isPending, error} = useMutation({
    mutationFn: ({data}) => requestPayout(token, data),
  });
  return {mutate, reset, isPending, error};
};

export const useGetWallet = user_id => {
  const token = useSelector(state => state.Auth.token);
  const {isPending, error, data, isError} = useQuery({
    queryFn: () => getWallet(token, user_id),
    queryKey: ['getWallet', token, user_id],
    staleTime: 0,
  });
  return {isPending, error, data, isError};
};

export const useFetchDiamondTransactions = () => {
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
    queryKey: ['diamondtransactions'],
    initialPageParam: 1,
    queryFn: ({pageParam}) => getDiamondTransaction(token, pageParam),
    getNextPageParam: lastPage => {
      if (!lastPage.data.transactions.next_page_url) return undefined;
      const match =
        lastPage.data.transactions.next_page_url.match(/page=(\d+)/);
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

export const useFetchPaymentTransactions = () => {
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
    queryKey: ['paymenttransactions'],
    initialPageParam: 1,
    queryFn: ({pageParam}) => getPaymentTransactions(token, pageParam),
    getNextPageParam: lastPage => {
      if (!lastPage.data.transactions.next_page_url) return undefined;
      const match =
        lastPage.data.transactions.next_page_url.match(/page=(\d+)/);
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
