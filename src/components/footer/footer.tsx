import React from 'react';
import classNames from 'classnames';

import { BiLogoTelegram, BiLogoLinkedin } from '../../utils/icons/bi';
import FooterMenu from '../footer-menu';
import { getCurrentYear } from '../../utils/get-current-year';

import style from './footer.module.css';

export default function Footer() {
  const getYear = getCurrentYear();
  const links = [
    {
      icon: BiLogoTelegram,
      label: 'Telegram',
      url: 'https://t.me/ntlstl',
    },
    {
      icon: BiLogoLinkedin,
      label: 'LinkedIn',
      url: 'https://www.linkedin.com/in/bogdan-mazur-aba74287',
    },
  ];

  return (
    <footer className={style.footer}>
      <div className={style.row}>
        <span className={style.label}>
          [ntlstl
          <b>.places</b>
          ] — a personal index of places
        </span>
        <FooterMenu links={links} />
        <span className={classNames(style.label, style.mono)}>
          &copy;
          {` ${getYear}`}
        </span>
      </div>
    </footer>
  );
}
