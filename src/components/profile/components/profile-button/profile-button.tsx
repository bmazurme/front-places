import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { BiPencil } from '../../../../utils/icons/bi';
import { Urls } from '../../../../utils/constants';

import style from './profile-button.module.css';

type ProfileProps = { info: User | null; };

export default function ProfileButton({ info }: ProfileProps) {
  const { pathname } = useLocation();

  return (
    <Link
      to={`${Urls.USER.INDEX}/${info?.id}/edit`}
      state={{ pathname }}
      className={style.edit}
    >
      <BiPencil size={14} />
    </Link>
  );
}
