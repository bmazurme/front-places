import React from 'react';

import style from './title.module.css';

export default function Title({ text }: { text: string; }) {
  return (
    <h2 className={style.title}>
      {text}
    </h2>
  );
}
