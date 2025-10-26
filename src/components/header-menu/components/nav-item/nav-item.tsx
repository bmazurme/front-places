import React from 'react';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import style from './nav-item.module.css';

export interface INavItemProps {
  to: string;
  className?: string;
  onClick?: () => void;
  value: string;
}

export default function NavItem({
  to, onClick, className, value,
}: INavItemProps) {
  return (
    <li className={style.item}>
      <NavLink
        to={to}
        onClick={onClick}
        className={({ isActive }) => classNames(
          className,
          style.link,
          { [style.active]: isActive },
        )}
      >
        {value}
      </NavLink>
    </li>
  );
}
