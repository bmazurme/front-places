import { describe, expect, it } from '@jest/globals';
import fetchMock from 'jest-fetch-mock';

import reducer from './users-slice';
import { usersApiEndpoints } from '../api/user-api/endpoints';

fetchMock.enableMocks();

const initialState = {
  data: [{
    id: 0,
    name: 'name',
    about: 'about',
    avatar: 'avatar',
    email: 'email',
  }],
};

describe('users', () => {
  it('...', async () => {
    const action = {
      type: usersApiEndpoints.endpoints.getUsers.matchFulfilled,
      payload: {},
    };
    expect(reducer(initialState, action)).toEqual(initialState);
  });
});
