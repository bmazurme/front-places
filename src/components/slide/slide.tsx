import React, { useEffect } from 'react';
import {
  Link, useLocation, useNavigate, useParams,
} from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { SerializedError } from '@reduxjs/toolkit';
import classNames from 'classnames';

import IconButton from '../../ui/icon-button';
import { BiLogoTelegram } from '../../utils/icons/bi';
import { useGetCardByIdMutation } from '../../store';
import { MODAL_CONFIG } from '../../utils';
import { BASE_API_URL, BASE_HOST_URL, Urls } from '../../utils/constants';

import style from './slide.module.css';

export default function Slide() {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [getCardById, { data: card, isLoading }] = useGetCardByIdMutation();

  const getCard = async () => {
    if (params.id) {
      console.log(params.id);
      const result = await getCardById(params.id);
      const { error } = result as { error: FetchBaseQueryError | SerializedError; };

      if (error && (error as FetchBaseQueryError & { status: number; }).status === 404) {
        navigate('/not-found-page');
      }
    }
  };
  const onShare = () => {
    window.open(`https://telegram.me/share/url?url=${BASE_HOST_URL}${location.pathname}&text=${card?.name}`, '_blank', 'rel=noopener noreferrer');
  };

  useEffect(() => {
    getCard();
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        animate={MODAL_CONFIG.ANIMATE}
        exit={MODAL_CONFIG.EXIT}
        className={style.slide}
        initial={{
          // opacity: 0,
          // scale: 0.175,
        }}
      >
        {card?.link ? (
          <img
            src={`${BASE_API_URL}/files/${card?.link}` ?? ''}
            alt={card?.name ?? ''}
            className={style.image}
            height="100%"
            width="100%"
          />
        )
          : (<div className={style.image} />)}

        <div className={style.footer}>
          <div className={style.info}>
            <p className={classNames(style.name, { [style.loading]: isLoading })}>{card?.name ?? ''}</p>
            <Link to={`${Urls.USERS.INDEX}/${card?.userid}`} className={style.user}>
              {card?.username}
            </Link>
          </div>
          <IconButton component={BiLogoTelegram} onClick={onShare} />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
