import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import Modal from '../../components/modal';
import Slide from '../../components/slide';

import { setCard } from '../../store';
import { useAppDispatch } from '../../hooks';
import { useAppLocation } from '../../hooks/use-app-location';

import { Urls } from '../../utils/constants';

export default function CardModalLayout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { state } = useAppLocation();

  const handleClose = useCallback(() => {
    navigate(state?.from || Urls.BASE);
    dispatch(setCard(null));
  }, [state, navigate]);

  return (<Modal children={<Slide />} onClose={handleClose} />);
}
