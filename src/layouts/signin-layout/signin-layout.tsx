import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Board from '../../components/board';
import useUser from '../../hooks/use-user';
import ThemeContext from '../../context/theme-context';

import yaOauth from '../../images/ya-oauth.svg';
import yaOauthWhite from '../../images/ya-oauth-white.svg';

import { YA_ENDPOINT } from '../../utils/constants';

import style from './signin-layout.module.css';

export default function SigninLayout() {
  const { isDark } = useContext(ThemeContext);
  const navigate = useNavigate();
  const userData = useUser();

  useEffect(() => {
    if (userData) {
      navigate('/');
    }
  });

  return (
    <Board
      children={(
        <div className={style.form}>
          <h2 className={style.title}>Sign In</h2>
          <a
            className={style.link}
            href={`https://oauth.yandex.ru/authorize?response_type=code&client_id=${YA_ENDPOINT}`}
          >
            <img src={isDark === 'light' ? yaOauth : yaOauthWhite} alt="Sign in with Yandex ID" />
          </a>
        </div>
      )}
    />
  );
}
