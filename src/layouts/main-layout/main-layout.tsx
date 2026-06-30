import React, { useCallback } from 'react';
import { useParams } from 'react-router-dom';

import Board from '../../components/board';
import Cards from '../../components/cards';

import { usePaginatedCards } from '../../hooks/use-paginated-cards';
import { useGetCardsByPageMutation } from '../../store';

export default function MainLayout() {
  const params = useParams();
  const [getCards] = useGetCardsByPageMutation();

  const fetchPage = useCallback(
    (pageId: number) => getCards(`${pageId}`) as unknown as Promise<{ data?: Card[] }>,
    [getCards],
  );

  const { cards, fetchItems, hasMoreItems } = usePaginatedCards(fetchPage, params.id);

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
