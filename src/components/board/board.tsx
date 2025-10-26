import React, { memo, PropsWithChildren } from 'react';
import classNames from 'classnames';

import { Title } from '../../ui';

import style from './board.module.css';

interface BoardProps extends PropsWithChildren {
  title?: string;
}

const Board = memo(({
  children, title,
}: BoardProps) => {
  const containerClasses = classNames(
    style.container,
  );

  return (
    <div className={containerClasses}>
      {title && (
        <div className={style.titleContainer}>
          <Title text={title} />
        </div>
      )}
      <div className={style.content}>{children}</div>
    </div>
  );
});

export default Board;
