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
    }),
  });

export const { useGetTagsQuery } = tagsApiEndpoints;
export { tagsApiEndpoints };
