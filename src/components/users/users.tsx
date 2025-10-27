import React, { useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';

import User from '../user';

import { useAppSelector } from '../../hooks';
import { usersSelector } from '../../store';

import style from './users.module.css';

export default function Users() {
  const users = useAppSelector(usersSelector);

  const renderedUsers = useMemo(() => users.map((user: User) => (
    <User
      key={user.id || uuidv4()} // Лучше использовать уникальный идентификатор
      user={user}
    />
  )), [users]);

  return (
    <ul className={style.list}>
      {renderedUsers}
    </ul>
  );
}
