import React, { useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

import Board from '../../components/board';
import Profile from '../../components/profile';
import UserCards from '../../components/user-cards';

import { useAppSelector, useAppDispatch } from '../../hooks';
import {
  useGetCardsByUserMutation, useGetUserByIdQuery, cardsSelector, setCards,
} from '../../store';

export default function UserLayout() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cards = useAppSelector(cardsSelector);
  const { data: user, error } = useGetUserByIdQuery(params.id!);
  const [getCards, { isLoading }] = useGetCardsByUserMutation();
  const [nextPageUrl, setNextPageUrl] = useState<number | null>(1);
  const [fetching, setFetching] = useState(false);

  const fetchItems = useCallback(
    async () => {
      if (fetching) {
        return;
      }

      setFetching(true);
      const { data } = await getCards({
        userId: Number(params.id!),
        pageId: nextPageUrl!,
      }) as unknown as { data: Card[] };

      setNextPageUrl(data && data.length > 0 && nextPageUrl ? nextPageUrl + 1 : null);
      setFetching(false);
    },
    [isLoading, nextPageUrl, cards],
  );

  const hasMoreItems = !!nextPageUrl;

  useEffect(() => {
    dispatch(setCards([]));
    setNextPageUrl(1);
  }, [params.id]);

  useEffect(() => {
    if (error && (error as FetchBaseQueryError & { status: number; }).status === 404) {
      navigate('/not-found-page');
    }
  }, [params.id, (error as FetchBaseQueryError & { status: number; })?.status]);

  return (
    <>
      {user && <Profile currentUser={user} />}
      <Board
        children={(
          <UserCards
            fetchItems={fetchItems}
            hasMoreItems={hasMoreItems}
            cards={cards}
          />
        )}
      />
    </>
  );
}
