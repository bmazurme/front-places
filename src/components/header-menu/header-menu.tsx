/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import Button from './components/button';
import NavItem from './components/nav-item';
import ThemeButton from '../theme-button';

import useUser from '../../hooks/use-user';
import { useSignOutMutation } from '../../store';

import { Urls } from '../../utils/constants';

import style from './header-menu.module.css';

export default function HeaderMenu({ isOpen, handlerClick }
  : { isOpen: boolean; handlerClick: () => void; }) {
  const [signOut] = useSignOutMutation();
  const [email, setEmail] = useState('');
  const user = useUser();

  useEffect(() => {
    if (user?.email) {
      setEmail(user.email);
    }
  }, []);

  const onSignOut = async () => {
    await signOut();
  };

  return (
    <>
      <ThemeButton />
      <ul
        onClick={handlerClick}
        className={classNames(style.navbar, { [style.opened]: isOpen })}
      >
        {!user && <NavItem to={Urls.SIGNIN} value="Sign in" />}
        {user?.email && <NavItem to={`${Urls.TAGS.INDEX}`} value="Tags" />}
        {user?.email && <NavItem to={`${Urls.USERS.INDEX}`} value="Users" />}
        {user?.email && <NavItem to={`${Urls.USER.INDEX}/${user.id}`} value={email} />}
        {user?.email && <NavItem to={Urls.SIGNIN} value="Sign Out" onClick={onSignOut} />}
      </ul>
      <Button isOpen={isOpen} handlerClick={handlerClick} />
    </>
  );
}
