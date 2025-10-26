/* eslint-disable jsx-a11y/heading-has-content */
import React from 'react';
import classNames from 'classnames';

import style from './card-skeleton.module.css';

export default function CardSkeleton() {
  return (
    <div className={classNames(style.card, style.isloading)}>
      <div className={style.image} />
      <div className={style.group}>
        <div className={style.box}>
          <h2 className={style.name} />
          <span className={style.user} />
        </div>
        <div className={style.like} />
      </div>
    </div>
  );
}
