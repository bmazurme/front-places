/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import { useErrorHandler } from 'react-error-boundary';

import Modal from '../../../../ui/modal';
import AddCard from '../add-card';
import MoreButton from '../../../more-button';
import { BiPlus } from '../../../../utils/icons/bi';
import { useAddCardMutation } from '../../../../store';

import style from './plus-button.module.css';

type PlusProps = {
  disabled?: boolean;
  extraClass?: CSSImportRule;
  popup: { avatar: boolean; place: boolean; };
  setPopup: (p: { avatar: boolean; place: boolean; }) => void;
};

export default function PlusButton({ popup, setPopup }: PlusProps) {
  const errorHandler = useErrorHandler();
  const [addCard, { isLoading }] = useAddCardMutation();
  const handleOpenAddPlacePopup = () => setPopup({ ...popup, place: true });
  const handleCloseAllPopups = () => setPopup({ avatar: false, place: false });

  const handleAddPlaceSubmit = async (data: { name: string; link: string; tagName: string }) => {
    try {
      await addCard(data);
      handleCloseAllPopups();
    } catch ({ status, data: { reason } }) {
      errorHandler(new Error(`${status}: ${reason}`));
    }
  };

  return (
    <>
      <MoreButton children={BiPlus} handler={handleOpenAddPlacePopup} extraClass={style.button} />
      {popup.place
        && (
          <Modal
            onClose={handleCloseAllPopups}
            children={<AddCard isLoading={isLoading} onAddPlace={handleAddPlaceSubmit} />}
          />
        )}
    </>
  );
}
