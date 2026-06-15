import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useErrorHandler } from 'react-error-boundary';
import classNames from 'classnames';

import Modal from '../../../modal';
import AddCard from '../../../profile/components/add-card';

import { BiPlus, BiMapPin, BiLogOut } from '../../../../utils/icons/bi';
import { useAddCardMutation, useSignOutMutation } from '../../../../store';
import useUser from '../../../../hooks/use-user';
import { useIsAuthenticated } from '../../../../hooks/use-is-authenticated';
import { BASE_API_URL, Urls } from '../../../../utils/constants';

import style from './profile-pill.module.css';

export default function ProfilePill() {
  const user = useUser();
  const { isAuthenticated } = useIsAuthenticated();
  const [signOut] = useSignOutMutation();
  const [addCard, { isLoading }] = useAddCardMutation();
  const errorHandler = useErrorHandler();
  const [isOpen, setIsOpen] = useState(false);
  const [isAddPlaceOpen, setIsAddPlaceOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  if (!isAuthenticated) {
    return (
      <Link className={style.signin} to={Urls.SIGNIN}>
        Sign in
      </Link>
    );
  }

  const avatarUrl = `${BASE_API_URL}/files/avatar/${user?.avatar}`;

  const handleAddPlaceSubmit = async (data: { name: string; link: string; tagName: string }) => {
    try {
      await addCard(data);
      setIsAddPlaceOpen(false);
    } catch ({ status, data: { reason } }) {
      errorHandler(new Error(`${status}: ${reason}`));
    }
  };

  const onSignOut = async () => {
    setIsOpen(false);
    await signOut();
  };

  return (
    <div className={style.menuWrap} ref={ref}>
      <button type="button" className={style.me} onClick={() => setIsOpen((open) => !open)}>
        <span className={style.name}>{user?.name}</span>
        <span className={style.ava} style={{ backgroundImage: `url(${avatarUrl})` }} />
      </button>
      {isOpen && (
        <div className={style.acctMenu}>
          <div className={style.acctId}>
            <span className={style.acctAva} style={{ backgroundImage: `url(${avatarUrl})` }} />
            <span className={style.nm}>{user?.name}</span>
          </div>
          <Link
            className={style.acctItem}
            to={`${Urls.USER.INDEX}/${user?.id}`}
            onClick={() => setIsOpen(false)}
          >
            <BiMapPin size={15} />
            View profile
          </Link>
          <button
            type="button"
            className={style.acctItem}
            onClick={() => {
              setIsOpen(false);
              setIsAddPlaceOpen(true);
            }}
          >
            <BiPlus size={15} />
            Add place
          </button>
          <button
            type="button"
            className={classNames(style.acctItem, style.danger)}
            onClick={onSignOut}
          >
            <BiLogOut size={15} />
            Sign Out
          </button>
        </div>
      )}
      {isAddPlaceOpen && (
        <Modal onClose={() => setIsAddPlaceOpen(false)}>
          <AddCard
            isLoading={isLoading}
            onAddPlace={handleAddPlaceSubmit}
            onClose={() => setIsAddPlaceOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
}
