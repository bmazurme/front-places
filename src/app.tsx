import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import MainPage from './pages/main-page';
import CardPage from './pages/card-page';
import TagPage from './pages/tag-page';
import TagsPage from './pages/tags-page';
import UserPage from './pages/user-page';
import UsersPage from './pages/users-page';
import SignInPage from './pages/signin-page';
import CardModalPage from './pages/card-modal-page';
import UserEditModalPage from './pages/user-edit-modal-page';

import { useAppLocation } from './hooks/use-app-location';
import { ThemeProvider } from './providers';
import ErrorBoundaryWrapper from './components/error-boundary-wrapper';
import { Urls } from './utils/constants';

const NotFoundPage = lazy(() => import('./pages/404'));

export default function App() {
  const location = useAppLocation();
  const background = location.state?.pathname;

  return (
    <ThemeProvider>
      <ErrorBoundaryWrapper>
        <Suspense>
          <Routes location={background || location}>
            <Route path={Urls.BASE} element={(<MainPage />)} />
            <Route path={Urls.CARDS.CURRENT} element={(<CardPage />)} />
            <Route path={Urls.SIGNIN} element={(<SignInPage />)} />
            <Route path={Urls.TAGS.INDEX} element={(<TagsPage />)} />
            <Route path={Urls.TAGS.CURRENT} element={(<TagPage />)} />
            <Route path={Urls.USERS.INDEX} element={(<UsersPage />)} />
            <Route path={Urls.USERS.CURRENT} element={(<UserPage />)} />
            <Route path={Urls[404]} element={(<NotFoundPage />)} />
          </Routes>
          {background && (
          <Routes>
            <Route path={Urls.USERS.CURRENT_EDIT} element={(<UserEditModalPage />)} />
            <Route path={Urls.CARDS.CURRENT} element={(<CardModalPage />)} />
          </Routes>
          )}
        </Suspense>
      </ErrorBoundaryWrapper>
    </ThemeProvider>
  );
}
