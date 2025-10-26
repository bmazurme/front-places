import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { toast, type ToastOptions } from 'react-toastify';

import { BASE_API_URL } from '../utils/constants';

// Create our baseQuery instance
const baseQuery = fetchBaseQuery({
  baseUrl: BASE_API_URL,
  prepareHeaders: (headers) => headers,
  credentials: 'include',
});

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
  const result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 400) {
    toast('400 Bad Request ', options);
  } else if (result.error && result.error.status === 401) {
    // console.log('result', 401);
  } else if (result.error && result.error.status === 404) {
    toast('404', options);
  } else if (result.error && result.error.status === 500) {
    toast('500 Internal Server Error', options);
  }

  return result;
};

export default baseQueryWithReauth;
