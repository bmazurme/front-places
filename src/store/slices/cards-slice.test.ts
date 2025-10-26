import { describe, expect, it } from '@jest/globals';
import fetchMock from 'jest-fetch-mock';

import reducer from './cards-slice';
import { cardsApiEndpoints } from '../api/card-api/endpoints';

fetchMock.enableMocks();

const initialState = {
  data: [{
    id: 0,
    name: 'name',
    link: 'link',
    userid: 0,
    count: 0,
    username: 'string',
    likes: 0,
    isliked: true,
  }],
};

describe('cards', () => {
  it('...', async () => {
    const action = {
      type: cardsApiEndpoints.endpoints.getCardsByPage.matchFulfilled,
      payload: {},
    };
    expect(reducer(initialState, action)).toEqual(initialState);
  });
});
