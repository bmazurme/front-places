import React from 'react';
import { Link } from 'react-router-dom';

import { BiArrowRight } from '../../utils/icons/bi';
import { BASE_API_URL, Urls } from '../../utils/constants';

import style from './user.module.css';

type UserPropsType = { user: User; index: number; }

export default function User({ user, index }: UserPropsType) {
  return (
    <li>
      <Link to={`${Urls.USER.INDEX}/${user.id}`} className={style.row}>
        <span className={style.rank}>{String(index + 1).padStart(2, '0')}</span>
        <span
          className={style.avatar}
          style={{ backgroundImage: `url(${BASE_API_URL}/files/avatar/${user.avatar})` }}
        />
        <span className={style.id}>
          <span className={style.name}>{user.name}</span>
          {user.about && <span className={style.about}>{user.about}</span>}
        </span>
        <span className={style.count}>
          <span className={style.countN}>{String(user.count).padStart(2, '0')}</span>
          <span className={style.label}>places</span>
        </span>
        <span className={style.go}>
          <BiArrowRight />
        </span>
      </Link>
    </li>
  );
}
