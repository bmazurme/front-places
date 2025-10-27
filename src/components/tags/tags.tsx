import React, { useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Tag from '../tag';

import style from './tags.module.css';

type TagsPropsType = { tags: Tag[] | undefined; }

export default function Tags({ tags }: TagsPropsType) {
  const processedTags = tags || [];
  const renderedTags = useMemo(() => processedTags.map((tag) => (
    <Tag
      key={tag.id || uuidv4()}
      tag={tag}
    />
  )), [processedTags]);
  return (
    <ul className={style.tags}>
      {renderedTags}
    </ul>
  );
}
