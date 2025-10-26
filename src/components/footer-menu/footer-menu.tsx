import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import style from './footer-menu.module.css';

export interface IconBaseProps extends React.SVGAttributes<SVGElement> {
  children?: React.ReactNode;
  size?: string | number;
  color?: string;
  title?: string;
}
export type IconType = (props: IconBaseProps) => JSX.Element;
export type LinkType = {
  url: string;
  label: string;
  icon: IconType;
};

export default function FooterMenu({ links }: { links: LinkType[]; }) {
  return (
    <ul className={style.items}>
      {links.map(({ url, label, icon: Component }) => (
        <li className={style.item} key={uuidv4()}>
          <a className={style.link} href={url}>
            <span className={style.icon}>
              <Component size={18} />
            </span>
            { label }
          </a>
        </li>
      ))}
    </ul>
  );
}
