import React, { useCallback, useMemo } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import Card from '../card';
import CardLoader from '../card-loader';

import style from './cards.module.css';

type CardsType = { fetchItems: () => void; hasMoreItems: boolean; cards: Card[]; };

export default function Cards({ fetchItems, hasMoreItems, cards }: CardsType) {
  const handleLoadMore = useCallback(() => {
    fetchItems();
  }, [fetchItems]);

  const memoizedCards = useMemo(() => cards.map((card, index) => {
    const key = `${card.id}-${index}`;
    return (
      <Card
        key={key}
        card={card}
        index={index}
      />
    );
  }), [cards]);

  return (
    <InfiniteScroll
      loadMore={handleLoadMore}
      hasMore={hasMoreItems}
      loader={<CardLoader key="loader" />}
    >
      <section className={style.cards}>
        {memoizedCards}
      </section>
    </InfiniteScroll>
  );
}
