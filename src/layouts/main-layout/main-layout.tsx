import React, { useCallback, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Board from '../../components/board';
import Cards from '../../components/cards';

import { useAppSelector, useAppDispatch } from '../../hooks';
import { cardsSelector, setCards, useGetCardsByPageMutation } from '../../store';

export default function MainLayout() {
  const params = useParams();
  const dispatch = useAppDispatch();
  const cards = useAppSelector(cardsSelector);
  const [getCards, { isLoading }] = useGetCardsByPageMutation();
  const [nextPageUrl, setNextPageUrl] = useState<number | null>(1);
  const [fetching, setFetching] = useState(false);

  const fetchItems = useCallback(
    async () => {
      if (fetching) {
        return;
      }

      setFetching(true);
      const { data } = await getCards(`${nextPageUrl}`) as unknown as { data: Card[] };

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

  return (
    <Board
      children={(
        <Cards
          fetchItems={fetchItems}
          hasMoreItems={hasMoreItems}
          cards={cards}
        />
      )}
    />
  );
}
