import usersApi from '..';

const usersApiEndpoints = usersApi
  .enhanceEndpoints({
    addTagTypes: ['Users'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getUserMe: builder.mutation<User, void>({
        query: () => ({
          url: '/users/me',
          method: 'GET',
        }),
        invalidatesTags: ['Users'],
      }),
      getUserById: builder.query<User, string>({
        query: (id) => ({
          url: `/users/${id}`,
          method: 'GET',
        }),
        providesTags: ['Users'],
      }),
      updateUser: builder.mutation({
        query: (user: Record<string, string>) => ({
          url: '/users/me',
          method: 'PATCH',
          body: user,
        }),
        invalidatesTags: ['Users'],
      }),
      updateUserAvatar: builder.mutation({
        query: (formData: FormData) => ({
          url: '/files/me/avatar',
          method: 'PATCH',
          body: formData,
        }),
        invalidatesTags: ['Users'],
      }),
      getUsers: builder.query<User[], void>({
        query: () => ({
          url: '/users',
          method: 'GET',
        }),
        providesTags: ['Users'],
      }),
    }),
  });

export const {
  useGetUserMeMutation,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useUpdateUserAvatarMutation,
  useGetUsersQuery,
} = usersApiEndpoints;
export { usersApiEndpoints };
