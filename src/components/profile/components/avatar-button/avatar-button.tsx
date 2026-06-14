import React from 'react';
import { useErrorHandler } from 'react-error-boundary';

import Modal from '../../../modal';
import EditAvatar from '../edit-avatar';
import { useUpdateUserAvatarMutation } from '../../../../store';

import { BASE_API_URL } from '../../../../utils/constants';

import style from './avatar-button.module.css';

export default function AvatarButton({
  info, popup, setPopup, currentUser,
}: AvatarProps) {
  const errorHandler = useErrorHandler();
  const [updateUserAvatar, { isLoading }] = useUpdateUserAvatarMutation();
  const handleOpenEditAvatarPopup = () => setPopup({ ...popup, avatar: true });
  const handleCloseAllPopups = () => setPopup({ avatar: false, place: false });

  const handleUpdateAvatarSubmit = async (data: FormData) => {
    try {
      await updateUserAvatar(data);
      handleCloseAllPopups();
    } catch ({ status, data: { reason } }) {
      errorHandler(new Error(`${status}: ${reason}`));
    }
  };

  return (
    <>
      <div
        className={currentUser?.id === info?.id ? style.ibutton : style.image}
        style={{ backgroundImage: `url(${BASE_API_URL}/files/avatar/${currentUser?.avatar})` }}
        {...((currentUser?.id === info?.id) && { onClick: handleOpenEditAvatarPopup })}
        aria-hidden="true"
      />
      {popup.avatar
        && (
        <Modal
          onClose={handleCloseAllPopups}
          children={(
            <EditAvatar
              isLoading={isLoading}
              info={info}
              updateUserAvatar={handleUpdateAvatarSubmit}
            />
          )}
        />
        )}
    </>
  );
}
