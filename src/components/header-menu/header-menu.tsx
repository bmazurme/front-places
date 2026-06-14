/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import classNames from 'classnames';

import Button from './components/button';
import NavItem from './components/nav-item';
import ProfilePill from './components/profile-pill';
import ProtectedWrapper from '../protected-wrapper';
import ThemeButton from '../theme-button';

import { Urls } from '../../utils/constants';

import style from './header-menu.module.css';

export default function HeaderMenu({ isOpen, handlerClick }
  : { isOpen: boolean; handlerClick: () => void; }) {
  return (
    <>
      <ul
        onClick={handlerClick}
        className={classNames(style.nav, { [style.opened]: isOpen })}
      >
        <ProtectedWrapper>
          <NavItem to={`${Urls.TAGS.INDEX}`} value="Tags" />
          <NavItem to={`${Urls.USERS.INDEX}`} value="Travellers" />
        </ProtectedWrapper>
      </ul>
      <div className={style.right}>
        <ThemeButton />
        <ProfilePill />
        <Button isOpen={isOpen} handlerClick={handlerClick} />
      </div>
    </>
  );
}
