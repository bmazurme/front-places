/* eslint-disable jsx-a11y/heading-has-content */
import React from 'react';

import style from './card-skeleton.module.css';

export default function CardSkeleton() {
  return (
    <div className={style.card}>
      <div className={style.image} />
      <div className={style.body}>
        <div className={style.top}>
          <h2 className={style.name} />
          <div className={style.like} />
        </div>
        <div className={style.foot}>
          <span className={style.user} />
        </div>
      </div>
    </div>
  );
}
