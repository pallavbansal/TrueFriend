import {useLayoutEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import LoginSkeletion from '../Layouts/Skeletions/LoginSkeleton';

const Protect = ({Route, Component}) => {
  const navigation = useNavigation();
  const token = true;
  const data = true;
  const error = false;

  useLayoutEffect(() => {
    if (!token || error) {
      navigation.reset({
        index: 0,
        routes: [{name: 'Login', params: {Route}}],
      });
    }
  }, [navigation, error, token]);

  return data ? <Component /> : <LoginSkeletion />;
};

export default Protect;
