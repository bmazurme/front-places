import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Board from '../../components/board';
import Cards from '../../components/cards';

import { cardsSelector, useGetCardsByTagMutation, setCards } from '../../store';
import { useAppSelector, useAppDispatch } from '../../hooks';

export default function TagLayout() {
  const params = useParams();
  const dispatch = useAppDispatch();
  const cards = useAppSelector(cardsSelector);
  const [getCards, { isLoading }] = useGetCardsByTagMutation();
  const [nextPageUrl, setNextPageUrl] = useState<number | null>(1);
  const [fetching, setFetching] = useState(false);

  const fetchItems = useCallback(
    async () => {
      if (fetching) {
        return;
      }

      setFetching(true);
      const { data } = await getCards({
        tagName: params.id!,
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

  return (
    <Board
      title={params.id}
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
