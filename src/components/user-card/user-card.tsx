/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useErrorHandler } from 'react-error-boundary';

import { useUpdateCardMutation } from '../../store';

import Image from '../image';
import LikeButton from '../like-button';
import RemoveButton from './components/remove-button';

import useUser from '../../hooks/use-user';
import { Urls } from '../../utils/constants';

import style from '../card/card.module.css';
import inputstyle from './user-card.module.css';

type FormPayload = { name: string; };
type CardPropsType = { card: Card; index: number; };

export default function UserCard({ card, index }: CardPropsType) {
  const user = useUser();
  const errorHandler = useErrorHandler();
  const [updateCard] = useUpdateCardMutation();
  const { register, reset, handleSubmit } = useForm<FormPayload>({
    defaultValues: { name: card.name },
  });
  const onSubmit = handleSubmit(async ({ name }: FormPayload) => {
    try {
      if (user?.id === card.userid) {
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
    <div className={style.card}>
      {user && <RemoveButton card={card} user={user} />}
      <Image card={card} index={index} />
      <div className={style.group}>
        <form className={style.box} onSubmit={onSubmit}>
          {user?.id === card.userid
            ? (
              <>
                <label
                  htmlFor="text"
                  className={inputstyle.label}
                >
                  Title:
                </label>
                <input
                  id="text"
                  type="text"
                  className={inputstyle.input}
                  readOnly={user?.id !== card.userid}
                  {...register('name')}
                  onBlur={onSubmit}
                />
              </>
            )
            : <h2 className={style.name}>{card.name}</h2>}
          <Link to={`${Urls.USER.INDEX}/${card.userid}`} className={style.user}>
            {card.username}
          </Link>
        </form>
        <LikeButton card={card} user={user} />
      </div>
    </div>
  );
}
