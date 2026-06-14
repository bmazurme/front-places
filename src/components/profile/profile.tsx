import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { AvatarButton, PlusButton, ProfileButton } from './components';
import { useGetCardsCountQuery, useGetTagsCountQuery } from '../../store';

import useUser from '../../hooks/use-user';

import style from './profile.module.css';

export default function Profile({ currentUser }: { currentUser: User; }) {
  const user = useUser();
  const { id } = useParams();
  const { data } = useGetCardsCountQuery(id!);
  const { data: tags } = useGetTagsCountQuery(id!);
  const [popup, setPopup] = useState({ avatar: false, place: false });
  const isOwner = id === `${user?.id}`;

  return (
    <section className={style.profile}>
      <div className={style.head}>
        <AvatarButton
          info={user}
          popup={popup}
          setPopup={setPopup}
          currentUser={currentUser}
        />
        <div className={style.info}>
          <h1 className={style.name}>{currentUser?.name}</h1>
          {currentUser?.about && <p className={style.bio}>{currentUser.about}</p>}
          <div className={style.stats}>
            <div className={style.stat}>
              <span className={style.statN}>{String(data?.count ?? 0).padStart(2, '0')}</span>
              <span className={style.label}>Places</span>
            </div>
            <div className={style.stat}>
              <span className={style.statN}>{String(tags?.count ?? 0).padStart(2, '0')}</span>
              <span className={style.label}>Tags</span>
            </div>
          </div>
        </div>
        {isOwner && (
          <div className={style.actions}>
            <PlusButton popup={popup} setPopup={setPopup} />
            <ProfileButton info={currentUser} />
          </div>
        )}
      </div>
      <div className={style.secHead}>
        <h2 className={style.moreH}>Index</h2>
        <span className={style.label}>
          {String(data?.count ?? 0).padStart(2, '0')}
          {' '}
          entries
        </span>
      </div>
      <hr className={style.rule} />
    </section>
  );
}
