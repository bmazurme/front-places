import React, { useEffect, type ComponentType } from 'react';
import { Navigate } from 'react-router-dom';

import { Preloader } from '../components';

import useUser from '../hooks/use-user';
import { useIsAuthenticated } from '../hooks/use-is-authenticated';
import { useAppLocation } from '../hooks/use-app-location';
import { useGetUserMeMutation } from '../store';

export default function withUser<P extends Record<string, unknown>>(
  Page: ComponentType<P>,
  shouldBeAuthorized = true,
) {
  return function WithUser(pageProps: P & { user?: User }) {
    const location = useAppLocation();
    const { isAuthenticated, isChecking } = useIsAuthenticated();
    const userData: User | null = useUser();
    const [getUser] = useGetUserMeMutation();

    useEffect(() => {
      if (isAuthenticated && !userData) {
        getUser();
      }
    }, [getUser, isAuthenticated, userData]);

    if (isChecking) {
      return <Preloader />;
    }

    if (!isAuthenticated) {
      if (shouldBeAuthorized) {
        return <Navigate to="/signin" state={{ from: location.pathname }} />;
      }

      return <Page {...pageProps} />;
    }

    if (!userData) {
      return <Preloader />;
    }

    return <Page {...pageProps} user={userData} />;
  };
}
