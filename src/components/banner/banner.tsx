import React from 'react';
import type { PropsWithChildren } from 'react';

import style from './banner.module.css';

export default function Banner({ children }: PropsWithChildren) {
  return (
    <div className={style.banner}>
      {children}
    </div>
  );
}
