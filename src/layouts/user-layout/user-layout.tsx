import React, { useCallback, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

import Board from '../../components/board';
import Profile from '../../components/profile';
import UserCards from '../../components/user-cards';

import { usePaginatedCards } from '../../hooks/use-paginated-cards';
import { useGetCardsByUserMutation, useGetUserByIdQuery } from '../../store';

export default function UserLayout() {
  const params = useParams();
  const navigate = useNavigate();
  const { data: user, error } = useGetUserByIdQuery(params.id!);
  const [getCards] = useGetCardsByUserMutation();

  const fetchPage = useCallback(
    (pageId: number) => getCards({
      userId: Number(params.id!),
      pageId,
    }) as unknown as Promise<{ data?: Card[] }>,
    [getCards, params.id],
  );

  const { cards, fetchItems, hasMoreItems } = usePaginatedCards(fetchPage, params.id);

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
