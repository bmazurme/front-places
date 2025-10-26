import React, { useMemo } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import Card from '../user-card';
import CardLoader from '../card-loader';

import style from '../cards/cards.module.css';

type UserCardsPropsType = { fetchItems: () => void; hasMoreItems: boolean; cards: Card[]; };

export default function UserCards({ fetchItems, hasMoreItems, cards }: UserCardsPropsType) {
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
      loadMore={fetchItems}
      hasMore={hasMoreItems}
      loader={<CardLoader key="loader" />}
    >
      <section className={style.cards}>
        {memoizedCards}
      </section>
    </InfiniteScroll>
  );
}
