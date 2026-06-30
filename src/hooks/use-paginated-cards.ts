import {
  useCallback, useEffect, useRef, useState,
} from 'react';

import { useAppDispatch, useAppSelector } from '.';
import { cardsSelector, setCards } from '../store';

type FetchPage = (pageId: number) => Promise<{ data?: Card[] }>;

export function usePaginatedCards(fetchPage: FetchPage, resetKey: unknown) {
  const dispatch = useAppDispatch();
  const cards = useAppSelector(cardsSelector);
  const [nextPage, setNextPage] = useState<number | null>(1);
  const isFetching = useRef(false);

  const fetchItems = useCallback(async () => {
    if (isFetching.current || nextPage === null) {
      return;
    }

    isFetching.current = true;
    const { data } = await fetchPage(nextPage);
    setNextPage(data && data.length > 0 ? nextPage + 1 : null);
    isFetching.current = false;
  }, [fetchPage, nextPage]);

  useEffect(() => {
    dispatch(setCards([]));
    setNextPage(1);
  }, [resetKey]);

  return { cards, fetchItems, hasMoreItems: nextPage !== null };
}
