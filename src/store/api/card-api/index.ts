import { createApi, retry } from '@reduxjs/toolkit/query/react';

import baseQuery from '../../base-query';

export const baseQueryWithRetry = retry(baseQuery, { maxRetries: 0 });

// Define a service using a base URL and expected endpoints
const cardsApi = createApi({
  reducerPath: 'cardsApi',
  baseQuery: baseQueryWithRetry,
  tagTypes: ['Cards'],
  endpoints: () => ({}),
});

export default cardsApi;
