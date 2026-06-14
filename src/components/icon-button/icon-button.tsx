import React from 'react';

import style from './icon-button.module.css';

export interface IconBaseProps extends React.SVGAttributes<SVGElement> {
  children?: React.ReactNode;
  size?: string | number;
  color?: string;
  title?: string;
}
export type IconType = (props: IconBaseProps) => JSX.Element;
type IconButtonType = { component: IconType; onClick: () => void; };

export default function IconButton({ component: Component, onClick }: IconButtonType) {
  return (
    <button
      className={style.icon}
      type="button"
      onClick={onClick}
    >
      <Component />
    </button>
  );
}
