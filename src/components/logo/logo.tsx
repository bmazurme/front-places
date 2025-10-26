import React from 'react';
import { Link } from 'react-router-dom';

import style from './logo.module.css';

export default function Logo() {
  return (
    <Link className={style.logo} to="/">
      [ntlstl.places]
    </Link>
  );
}
