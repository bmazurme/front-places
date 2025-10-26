import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { AvatarButton, PlusButton, ProfileButton } from './components';
import { useGetCardsCountQuery } from '../../store';

import useUser from '../../hooks/use-user';

import style from './profile.module.css';

export default function Profile({ currentUser }: { currentUser: User; }) {
  const user = useUser();
  const { id } = useParams();
  const { data } = useGetCardsCountQuery(id!);
  const [popup, setPopup] = useState({ avatar: false, place: false });

  return (
    <section className={style.profile}>
      <AvatarButton
        info={user}
        popup={popup}
        setPopup={setPopup}
        currentUser={currentUser}
      />
      <div className={style.info}>
        <h2 className={style.name}>{currentUser?.name}</h2>
        <p className={style.profession}>{currentUser?.about}</p>
        <p className={style.count}>{`Cards: ${data?.count}`}</p>
        {currentUser?.id === user?.id && <ProfileButton info={currentUser} />}
      </div>
      {/* {(user?.id === 1 || user?.id === 2) &&  */}
      <PlusButton popup={popup} setPopup={setPopup} />
      {/* } */}
    </section>
  );
}
