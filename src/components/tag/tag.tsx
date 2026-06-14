import React from 'react';
import { Link } from 'react-router-dom';

import { BiArrowRight } from '../../utils/icons/bi';
import { Urls } from '../../utils/constants';

import style from './tag.module.css';

type TagPropsType = { tag: Tag; index: number; };

export default function Tag({ tag, index }: TagPropsType) {
  return (
    <li>
      <Link to={`${Urls.TAG.INDEX}/${tag.name}`} className={style.row}>
        <span className={style.rank}>{String(index + 1).padStart(2, '0')}</span>
        <span className={style.name}>{tag.name}</span>
        <span className={style.count}>{String(tag.count).padStart(2, '0')}</span>
        <span className={style.go}>
          <BiArrowRight />
        </span>
      </Link>
    </li>
  );
}
