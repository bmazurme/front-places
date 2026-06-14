import React, { useEffect, type PropsWithChildren } from 'react';

import { useAppDispatch } from '../../hooks';
import { useCheckAuthQuery } from '../../store';
import { setCredentials, logout, setChecking } from '../../store/slices/auth-slice';

export default function ContentWrapper({ children }: PropsWithChildren) {
  const dispatch = useAppDispatch();
  const { data, isLoading, error } = useCheckAuthQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (isLoading) {
      dispatch(setChecking());
    } else if (error) {
      dispatch(logout());
    } else if (data?.isAuthenticated && data.accessToken) {
      dispatch(setCredentials({ accessToken: data.accessToken }));
    } else {
      dispatch(logout());
    }
  }, [data, isLoading, error, dispatch]);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
}
