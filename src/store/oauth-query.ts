import { fetchBaseQuery } from '@reduxjs/toolkit/query';

import { BASE_API_URL } from '../utils/constants';

// Create our baseQuery instance
const oauthQuery = fetchBaseQuery({
  baseUrl: BASE_API_URL,
  prepareHeaders: (headers) => headers,
  credentials: 'include',
});

export default oauthQuery;
