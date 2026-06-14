import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { toast, type ToastOptions } from 'react-toastify';

import type { RootState } from '.';
import baseQuery from './base-query';
import { setCredentials, logout } from './slices/auth-slice';

const options: ToastOptions = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  type: 'error',
};

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError | null
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 400) {
    toast('400 Bad Request ', options);
  } else if (result.error && result.error.status === 401) {
    const { isAuthenticated } = (api.getState() as RootState).auth;

    if (!isAuthenticated) {
      api.dispatch(logout());
      return result;
    }

    const refreshResult = await baseQuery({ url: '/auth/refresh', method: 'POST' }, api, extraOptions);

    if (refreshResult.data) {
      const { accessToken } = refreshResult.data as { accessToken: string };

      api.dispatch(setCredentials({ accessToken }));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  } else if (result.error && result.error.status === 404) {
    toast('404', options);
  } else if (result.error && result.error.status === 500) {
    toast('500 Internal Server Error', options);
  }

  return result;
};

export default baseQueryWithReauth;
