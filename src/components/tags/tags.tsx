import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import Tag from '../tag';

import style from './tags.module.css';

type TagsPropsType = { tags: Tag[] | undefined; }

export default function Tags({ tags }: TagsPropsType) {
  return (
    <ul className={style.tags}>
      {tags?.map((tag) => <Tag key={uuidv4()} tag={tag} />)}
    </ul>
  );
}
