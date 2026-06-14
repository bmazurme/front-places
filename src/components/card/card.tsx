import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useErrorHandler } from 'react-error-boundary';

import Image from '../image';
import LikeButton from '../like-button';
import RemoveButton from './components/remove-button';
import ProtectedWrapper from '../protected-wrapper';

import { useUpdateCardMutation } from '../../store';
import useUser from '../../hooks/use-user';
import { Urls } from '../../utils/constants';

import style from './card.module.css';

interface CardProps {
  card: Card;
  index: number;
}

type FormPayload = { name: string; };

const Card = memo(({ card, index }: CardProps) => {
  const user = useUser();
  const errorHandler = useErrorHandler();
  const [updateCard] = useUpdateCardMutation();
  const isOwner = user?.id === card.userid;
  const { register, reset, handleSubmit } = useForm<FormPayload>({
    defaultValues: { name: card.name },
  });
  const onSubmit = handleSubmit(async ({ name }: FormPayload) => {
    try {
      if (isOwner) {
        if (name !== '') {
          await updateCard({ name, id: card.id });
        } else {
          reset({ name: card.name });
        }
      }
    } catch ({ status, data: { reason } }) {
      errorHandler(new Error(`${status}: ${reason}`));
    }
  });

  return (
    <article className={style.card}>
      <div className={style.media}>
        <Image card={card} index={index} />
        <span className={style.num}>{String(index + 1).padStart(2, '0')}</span>
        <ProtectedWrapper>
          {isOwner && <RemoveButton card={card} user={user} />}
        </ProtectedWrapper>
      </div>
      <div className={style.body}>
        <form className={style.top} onSubmit={onSubmit}>
          {isOwner
            ? (
              <input
                type="text"
                aria-label="Title"
                className={style.input}
                {...register('name')}
                onBlur={onSubmit}
              />
            )
            : <h2 className={style.name}>{card.name}</h2>}
          <LikeButton card={card} user={user} />
        </form>
        {card.tags?.length > 0 && (
          <div className={style.tags}>
            {card.tags.map((tag) => (
              <Link key={tag} to={`${Urls.TAG.INDEX}/${tag}`} className={style.tag}>
                {tag}
              </Link>
            ))}
          </div>
        )}
        <div className={style.foot}>
          <Link to={`${Urls.USER.INDEX}/${card.userid}`} className={style.user}>
            {card.username}
          </Link>
        </div>
      </div>
    </article>
  );
});

export default Card;
