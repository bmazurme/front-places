import React, { useMemo } from 'react';

import User from '../user';

import { useAppSelector } from '../../hooks';
import { usersSelector } from '../../store';

import style from './users.module.css';

export default function Users() {
  const users = useAppSelector(usersSelector);

  const renderedUsers = useMemo(() => users.map((user: User, index: number) => (
    <User
      key={`user_${user.id}`}
      user={user}
      index={index}
    />
  )), [users]);

  return (
    <>
      <section className={style.intro}>
        <h1 className={style.statement}>Travellers.</h1>
        <div className={style.side}>
          <div className={style.label}>
            {users.length}
            {' '}
            keepers of the index
          </div>
          <p className={style.blurb}>The people filling this archive with places.</p>
        </div>
      </section>
      <hr className={style.rule} />
      <ul className={style.list}>
        {renderedUsers}
      </ul>
    </>
  );
}
