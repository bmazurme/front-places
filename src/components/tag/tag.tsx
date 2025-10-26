import React from 'react';
import { Link } from 'react-router-dom';

import { Urls } from '../../utils/constants';

import style from './tag.module.css';

type TagPropsType = { tag: Tag; };

export default function Tag({ tag }: TagPropsType) {
  return (
    <li className={style.tag}>
      <Link to={`${Urls.TAG.INDEX}/${tag.name}`} className={style.link}>
        {tag.name}
      </Link>
    </li>
  );
}
