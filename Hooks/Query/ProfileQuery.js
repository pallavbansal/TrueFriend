import {
  profileCreation,
  fetchProfile,
  updateProfile,
  fetchProfileById,
} from '../../Services/ProfileServices';
import {useMutation, useQuery} from '@tanstack/react-query';
import {useSelector} from 'react-redux';

export const useProfileCreation = () => {
  const token = useSelector(state => state.Auth.token);
  const {isPending, error, mutate, reset} = useMutation({
    mutationFn: ({data}) => profileCreation(data, token),
  });
  return {isPending, error, mutate, reset};
};

export const useFetchProfile = () => {
  const token = useSelector(state => state.Auth.token);
  const {isPending, error, data, isError} = useQuery({
    queryFn: () => fetchProfile(token),
    queryKey: ['fetchProfile', token],
  });
  return {isPending, error, data, isError};
};

export const useFetchProfileById = id => {
  const token = useSelector(state => state.Auth.token);
  const {isPending, error, data, isError} = useQuery({
    queryFn: () => fetchProfileById(id, token),
    queryKey: ['fetchProfileById', id, token],
    enabled: !!id,
  });
  return {isPending, error, data, isError};
};

export const useUpdateProfile = () => {
  const token = useSelector(state => state.Auth.token);
  const {isPending, error, mutate, reset} = useMutation({
    mutationFn: ({data}) => updateProfile(data, token),
  });
  return {isPending, error, mutate, reset};
};
