import tagsApi from '..';

const tagsApiEndpoints = tagsApi
  .enhanceEndpoints({
    addTagTypes: ['Tags'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getTags: builder.query<Tag[], void>({
        query: () => ({
          url: '/tags',
        }),
        providesTags: ['Tags'],
      }),
      getTagsCount: builder.query<{ count: number; }, string>({
        query: (userId) => ({
          url: `/tags/count/${userId}`,
          method: 'GET',
        }),
        providesTags: ['Tags'],
      }),
    }),
  });

export const { useGetTagsQuery, useGetTagsCountQuery } = tagsApiEndpoints;
export { tagsApiEndpoints };
