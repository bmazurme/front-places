import { createApi, retry } from '@reduxjs/toolkit/query/react';

import baseQuery from '../../base-query';

export const baseQueryWithRetry = retry(baseQuery, { maxRetries: 1 });

// Define a service using a base URL and expected endpoints
const filesApi = createApi({
  reducerPath: 'fileApi',
  baseQuery: baseQueryWithRetry,
  tagTypes: ['Files'],
  endpoints: () => ({}),
});

export default filesApi;
