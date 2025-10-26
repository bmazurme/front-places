import React, { memo } from 'react';
import type { PropsWithChildren } from 'react';

import classNames from 'classnames';
import Header from '../header';
import Footer from '../footer';

import style from './content.module.css';

interface ContentProps extends PropsWithChildren {
  /** Дополнительный класс для стилизации */
  className?: string;
  /** Флаг для отображения только контента без шапки и футера */
  minimal?: boolean;
}

const Content = memo(({ children, className, minimal }: ContentProps) => {
  const contentClasses = classNames(
    style.content,
    className,
  );

  return (
    <main className={contentClasses}>
      {!minimal && <Header />}
      {children}
      {!minimal && <Footer />}
    </main>
  );
});

export default Content;
