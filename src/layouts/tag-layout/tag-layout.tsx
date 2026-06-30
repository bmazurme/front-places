import React, { useCallback } from 'react';
import { useParams } from 'react-router-dom';

import Board from '../../components/board';
import Cards from '../../components/cards';

import { useGetCardsByTagMutation } from '../../store';
import { usePaginatedCards } from '../../hooks/use-paginated-cards';

export default function TagLayout() {
  const params = useParams();
  const [getCards] = useGetCardsByTagMutation();

  const fetchPage = useCallback(
    (pageId: number) => getCards({
      tagName: params.id!,
      pageId,
    }) as unknown as Promise<{ data?: Card[] }>,
    [getCards, params.id],
  );

  const { cards, fetchItems, hasMoreItems } = usePaginatedCards(fetchPage, params.id);

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
