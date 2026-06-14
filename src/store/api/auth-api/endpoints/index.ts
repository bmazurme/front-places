import oauthApi from '..';

type RefreshResponse = {
  accessToken: string;
  expiresIn: number;
};

type CheckAuthResponse = {
  accessToken: string;
  isAuthenticated: boolean;
};

const authApiEndpoints = oauthApi
  .enhanceEndpoints({
    addTagTypes: ['User'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      signInWitOauthYa: builder.mutation({
        query: (body) => ({
          url: '/oauth',
          method: 'POST',
          body,
        }),
      }),
      refresh: builder.mutation<RefreshResponse, void>({
        query: () => ({
          url: '/auth/refresh',
          method: 'POST',
        }),
      }),
      checkAuth: builder.query<CheckAuthResponse, void>({
        query: () => ({
          url: '/auth/check',
          method: 'GET',
        }),
        providesTags: ['User'],
        keepUnusedDataFor: 0,
      }),
      signOut: builder.mutation<void, void>({
        query: () => ({
          url: '/auth/logout',
          method: 'POST',
        }),
      }),
    }),
  });

export const {
  useSignOutMutation,
  useSignInWitOauthYaMutation,
  useRefreshMutation,
  useCheckAuthQuery,
} = authApiEndpoints;
export { authApiEndpoints };
