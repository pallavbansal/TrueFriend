import {
  login,
  register,
  verify,
  forgotPassword,
} from '../../Services/AuthServices';
import {useMutation} from '@tanstack/react-query';

export const useLogin = () => {
  const {isPending, error, mutate, reset} = useMutation({
    mutationFn: ({data}) => login(data),
  });
  return {isPending, error, mutate, reset};
};

export const useVerify = () => {
  const {isPending, error, mutate} = useMutation({
    mutationFn: ({data}) => verify(data),
  });
  return {isPending, error, mutate};
};

export const useRegister = () => {
  const {isPending, error, mutate, reset} = useMutation({
    mutationFn: ({data}) => register(data),
  });
  return {isPending, error, mutate, reset};
};

export const useForgotPassword = () => {
  const {isPending, error, mutate} = useMutation({
    mutationFn: ({data}) => forgotPassword(data),
  });
  return {isPending, error, mutate};
};
