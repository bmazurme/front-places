import { describe, expect, it } from '@jest/globals';
import fetchMock from 'jest-fetch-mock';

import reducer from './card-slice';
import { cardsApiEndpoints } from '../api/card-api/endpoints';

fetchMock.enableMocks();

const initialState = {
  data: {
    id: 0,
    name: 'name',
    link: 'link',
    userId: 0,
    count: 1,
    isLiked: false,
    username: 'string',
    tags: [],
  },
};

describe('card', () => {
  it('...', async () => {
    const action = {
      type: cardsApiEndpoints.endpoints.getCard.matchFulfilled,
      payload: {},
    };
    expect(reducer(initialState, action)).toEqual(initialState);
  });
});
