import React, { useState } from 'react';
import classNames from 'classnames';

import Logo from '../logo';
import Navbar from '../header-menu';

import style from './header.module.css';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className={classNames(style.header, { [style.opened]: isOpen })}>
      <Logo />
      <Navbar handlerClick={() => setIsOpen(!isOpen)} isOpen={isOpen} />
    </header>
  );
}
