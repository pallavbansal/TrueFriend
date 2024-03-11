import {CreateReport} from '../../Services/ReportServices';
import {useMutation} from '@tanstack/react-query';
import {useSelector} from 'react-redux';

export const useCreateReport = () => {
  const token = useSelector(state => state.Auth.token);
  const {isPending, error, mutate, reset} = useMutation({
    mutationFn: ({data}) => CreateReport(data, token),
  });
  return {isPending, error, mutate, reset};
};
