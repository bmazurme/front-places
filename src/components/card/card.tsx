import React, { memo, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Image from '../image';
import LikeButton from '../like-button';

import useUser from '../../hooks/use-user';
import { Urls } from '../../utils/constants';

import style from './card.module.css';

interface CardProps {
  card: Card;
  index: number;
}

const Card = memo(({ card, index }: CardProps) => {
  const user = useUser();
  const navigate = useNavigate();

  const handleUserProfileClick = useCallback(() => {
    navigate(`${Urls.USER.INDEX}/${card.userid}`);
  }, [navigate, card.userid]);

  return (
    <div className={style.card} key={card.id}>
      <Image card={card} index={index} />
      <div className={style.group}>
        <div className={style.box}>
          <h2 className={style.name}>{card.name}</h2>
          <Link
            to={`${Urls.USER.INDEX}/${card.userid}`}
            className={style.user}
            onClick={handleUserProfileClick}
          >
            {card.username}
          </Link>
        </div>
        <LikeButton card={card} user={user} />
      </div>
    </div>
  );
});

export default Card;
