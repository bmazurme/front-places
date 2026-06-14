import React, { useState } from 'react';

import Logo from '../logo';
import Navbar from '../header-menu';

import style from './header.module.css';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className={style.header}>
      <div className={style.row}>
        <Logo />
        <Navbar handlerClick={() => setIsOpen(!isOpen)} isOpen={isOpen} />
      </div>
    </header>
  );
}
