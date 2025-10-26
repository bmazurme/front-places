import cardsApi from '..';

const cardsApiEndpoints = cardsApi
  .enhanceEndpoints({
    addTagTypes: ['Cards'],
  })
  .injectEndpoints({
    endpoints: (builder) => ({
      getCardsCount: builder.query<{ count: number; }, string>({
        query: (userId) => ({
          url: `/cards/count/${userId}`,
          method: 'GET',
        }),
        providesTags: ['Cards'],
      }),
      getCardsByTag: builder.mutation<Card[], GetCardsByTagPropsType>({
        query: ({ tagName, pageId }) => ({
          url: `/cards/tag/${tagName}/page/${pageId}`,
          method: 'GET',
        }),
        invalidatesTags: ['Cards'],
      }),
      getCardsByUser: builder.mutation<Card[], GetCardsByUserPropsType>({
        query: ({ userId, pageId }) => ({
          url: `/cards/user/${userId}/page/${pageId}`,
          method: 'GET',
        }),
        invalidatesTags: ['Cards'],
      }),
      getCard: builder.mutation<Card, string>({
        query: (cardId) => ({
          url: `/cards/${cardId}`,
          method: 'PATCH',
        }),
        invalidatesTags: ['Cards'],
      }),
      getCardsByPage: builder.mutation<Card[], string>({
        query: (cardId) => ({
          url: `/cards/page/${cardId}`,
          method: 'GET',
        }),
        invalidatesTags: ['Cards'],
      }),
      getCardById: builder.mutation<Card, string>({
        query: (cardId) => ({
          url: `/cards/${cardId}`,
          method: 'GET',
        }),
        invalidatesTags: ['Cards'],
      }),
      addCard: builder.mutation({
        query: (data) => ({
          url: '/cards',
          method: 'POST',
          body: data,
        }),
        invalidatesTags: ['Cards'],
      }),
      deleteCard: builder.mutation({
        query: (data) => ({
          url: `/cards/${data?.id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Cards'],
      }),
      updateCard: builder.mutation({
        query: (data) => ({
          url: `/cards/${data?.id}`,
          method: 'PATCH',
          body: data,
        }),
        invalidatesTags: ['Cards'],
      }),
      changeLike: builder.mutation({
        query: ({ cardId, value }) => ({
          url: `/cards/${cardId}/likes`,
          method: !value ? 'PUT' : 'DELETE',
        }),
        invalidatesTags: ['Cards'],
      }),
      getLikes: builder.query({
        query: ({ cardId }) => ({
          url: `/cards/likes/${cardId}`,
          method: 'GET',
        }),
        providesTags: ['Cards'],
      }),
    }),
  });

export const {
  useGetCardsByTagMutation,
  useGetCardsByUserMutation,
  useGetCardMutation,
  useDeleteCardMutation,
  useChangeLikeMutation,
  useAddCardMutation,
  useGetLikesQuery,
  useUpdateCardMutation,
  useGetCardByIdMutation,
  useGetCardsByPageMutation,
  useGetCardsCountQuery,
} = cardsApiEndpoints;
export { cardsApiEndpoints };
