import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import User from '../user';

import { useAppSelector } from '../../hooks';
import { usersSelector } from '../../store';

import style from './users.module.css';

export default function Users() {
  const users = useAppSelector(usersSelector);

  return (
    <ul className={style.list}>
      {users.map((u: User) => <User key={uuidv4()} user={u} />)}
    </ul>
  );
}
