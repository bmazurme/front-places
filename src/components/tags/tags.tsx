import React, { useMemo } from 'react';

import Tag from '../tag';

import style from './tags.module.css';

type TagsPropsType = { tags: Tag[] | undefined; }

export default function Tags({ tags }: TagsPropsType) {
  const processedTags = tags || [];
  const renderedTags = useMemo(() => processedTags.map((tag, index) => (
    <Tag
      key={`tag_${tag.id}`}
      tag={tag}
      index={index}
    />
  )), [processedTags]);

  return (
    <>
      <section className={style.intro}>
        <h1 className={style.statement}>Tags.</h1>
        <div className={style.side}>
          <div className={style.label}>
            {processedTags.length}
            {' '}
            threads through the index
          </div>
          <p className={style.blurb}>
            Every place is filed under a few words. Follow one to pull a
            thread of related entries across the whole archive.
          </p>
        </div>
      </section>
      <hr className={style.rule} />
      <ol className={style.list}>
        {renderedTags}
      </ol>
    </>
  );
}
