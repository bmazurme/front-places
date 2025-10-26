import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

import type { ReactNode } from 'react';

import ModalOverlay from './components/modal-overlay';

import { MODAL_CONFIG } from '../../utils';

import style from './modal.module.css';

type PopupType = { children: ReactNode; onClose: () => void }

export default function Popup({ children, onClose }: PopupType) {
  const reactModals = document.getElementById('modals');
  const handleEscape = (e: KeyboardEvent) => {
    if (e.type === 'keydown' && e.code === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  });

  return ReactDOM.createPortal(
    <AnimatePresence>
      <ModalOverlay closeModal={onClose}>
        <motion.div
          className={style.container}
          initial={MODAL_CONFIG.INITIAL}
          animate={MODAL_CONFIG.ANIMATE}
          exit={MODAL_CONFIG.EXIT}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            aria-label="Close"
            className={style.close}
            type="button"
            onClick={onClose}
          />
          {children}
        </motion.div>
      </ModalOverlay>
    </AnimatePresence>,
    reactModals!,
  );
}
