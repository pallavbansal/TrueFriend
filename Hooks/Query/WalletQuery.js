import {
  getPackages,
  buyPackages,
  getOrderId,
  getWallet,
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
  const {mutate, reset} = useMutation({
    mutationFn: ({data}) => buyPackages(token, data),
  });
  return {mutate, reset};
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

export const useGetOrderId = () => {
  const token = useSelector(state => state.Auth.token);
  const {isPending, error, data, isError} = useQuery({
    queryFn: () => getOrderId(token),
    queryKey: ['getOrderId', token],
  });
  return {isPending, error, data, isError};
};
