import { fetchBaseQuery } from '@reduxjs/toolkit/query';

import type { RootState } from '.';
import { BASE_API_URL } from '../utils/constants';

// Create our baseQuery instance
const oauthQuery = fetchBaseQuery({
  baseUrl: BASE_API_URL,
  prepareHeaders: (headers, { getState }) => {
    const { accessToken } = (getState() as RootState).auth;

    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }

    return headers;
  },
  credentials: 'include',
});

export default oauthQuery;
