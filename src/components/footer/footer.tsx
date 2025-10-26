import React from 'react';

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
      <p className={style.copyright}>
        &copy;
        {` ${getYear} mesto by `}
        <a className={style.link} href="https://ntlstl.dev/">ntlstl</a>
      </p>
      <FooterMenu links={links} />
    </footer>
  );
}
