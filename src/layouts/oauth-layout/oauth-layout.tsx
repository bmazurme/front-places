import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useErrorHandler } from 'react-error-boundary';

import { Preloader } from '../../ui';
import Board from '../../components/board';

import { useSignInWitOauthYaMutation } from '../../store/api';

import { Urls } from '../../utils/constants';

import style from './oauth-layout.module.css';

export default function OauthLayout() {
  const navigate = useNavigate();
  const errorHandler = useErrorHandler();
  const [searchParams] = useSearchParams();
  const [signInWitOauthYa, { isLoading }] = useSignInWitOauthYaMutation();
  const code = searchParams.get('code')!;

  useEffect(() => {
    const signIn = async () => {
      try {
        const { data } = await signInWitOauthYa({ code }) as unknown as { data: User };

        if (data) {
          setTimeout(() => navigate(Urls.BASE), 3000);
        }
      } catch (err) {
        errorHandler(err);
      }
    };

    signIn();
  }, [code]);

  return (
    <Board
      children={
        isLoading
          ? <Preloader />
          : (
            <div className={style.container}>
              <h2 className={style.title}>Welcome!</h2>
            </div>
          )
      }
    />
  );
}
