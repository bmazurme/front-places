import React from 'react';
import classNames from 'classnames';
import { useErrorHandler } from 'react-error-boundary';

import { BiSolidHeart, BiHeart } from '../../utils/icons/bi';
import { useChangeLikeMutation } from '../../store';

import style from './like-button.module.css';

interface ILikeProps {
  user: User | null;
  card: Card;
}

export default function LikeButton({ user, card }: ILikeProps) {
  const errorHandler = useErrorHandler();
  const [changeLike] = useChangeLikeMutation();

  const onCardLike = async ({ id: cardId, isliked: value }: Card) => {
    try {
      await changeLike({ cardId, value });
    } catch ({ status, data: { reason } }) {
      errorHandler(new Error(`${status}: ${reason}`));
    }
  };

  return (
    <div className={style.like}>
      <button
        type="button"
        aria-label="Like"
        name="button-like"
        onClick={() => onCardLike(card)}
        className={classNames(style.button, { [style.disabled]: !user })}
        disabled={!user}
      >
        {card.isliked ? <BiSolidHeart size={24} /> : <BiHeart size={24} />}
      </button>
      <p className={style.counter}>{card.count}</p>
    </div>
  );
}
