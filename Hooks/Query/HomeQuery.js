import {locationUpdate, getDiscoverProfiles} from '../../Services/HomeServices';
import {useMutation, useQuery} from '@tanstack/react-query';
import {useSelector} from 'react-redux';

export const useLocationUpdate = () => {
  const token = useSelector(state => state.Auth.token);
  const {isPending, error, mutate, reset} = useMutation({
    mutationFn: ({data}) => locationUpdate(data, token),
  });
  return {isPending, error, mutate, reset};
};

export const useFetchDiscoverProfile = (distance = 1) => {
  const token = useSelector(state => state.Auth.token);
  const {isPending, error, data, isError} = useQuery({
    queryFn: () => getDiscoverProfiles(token, distance),
    queryKey: ['discoverprofiles', distance],
  });
  return {isPending, error, data, isError};
};
