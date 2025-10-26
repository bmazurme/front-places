/* eslint-disable no-use-before-define */
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';
// import { createReduxHistoryContext } from 'redux-first-history';
// import { createBrowserHistory, createMemoryHistory } from 'history';

import {
  authApi,
  userApi,
  cardsApi,
  filesApi,
  tagsApi,
} from './api';
import userReducer from './slices/user-slice';
import usersReducer from './slices/users-slice';
import cardReducer from './slices/card-slice';
import cardsReducer from './slices/cards-slice';
import userCardsReducer from './slices/user-cards-slice';
// import { isServer } from '../utils';

export * from './api/auth-api/endpoints';
export * from './api/user-api/endpoints';
export * from './api/card-api/endpoints';
export * from './api/file-api/endpoints';
export * from './api/tag-api/endpoints';
export * from './slices';

// global redeclared types
declare global {
  interface Window {
    __INITIAL_STATE__: RootState;
  }
}

// const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
//   history: !isServer ? createBrowserHistory() : createMemoryHistory(),
// });

export const store = configureStore({
  reducer: {
    // router: routerReducer,
    // Add the generated reducer as a specific top-level slice
    user: userReducer,
    users: usersReducer,
    card: cardReducer,
    cards: cardsReducer,
    ucards: userCardsReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [cardsApi.reducerPath]: cardsApi.reducer,
    [filesApi.reducerPath]: filesApi.reducer,
    [tagsApi.reducerPath]: tagsApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(
      authApi.middleware,
      userApi.middleware,
      cardsApi.middleware,
      filesApi.middleware,
      tagsApi.middleware,
      // routerMiddleware,
    ),
});

// export const history = createReduxHistory(store);
// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
