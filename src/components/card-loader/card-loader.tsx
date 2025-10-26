import React from 'react';

import classNames from 'classnames';
import style from './card-loader.module.css';

export default function CardLoader() {
  return (
    <div className={classNames(style.loader, style.loading)}>
      <span className={style.span} />
      <span className={style.span} />
      <span className={style.span} />
    </div>
  );
}
