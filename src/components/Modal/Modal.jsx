import React from 'react';
import { useEffect } from 'react';
import { Overlay, Mod } from './Modal.styled';
import PropTypes from 'prop-types';

export default function Modal({ selectedImage, closeModal }) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      closeModal();
    }
  };
  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <Overlay className="overlay" onClick={handleBackdropClick}>
      <Mod className="modal">
        <img src={selectedImage} alt="" />
      </Mod>
    </Overlay>
  );
}

Modal.propTypes = {
  selectedImage: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
