'use client';
import { useState, useContext } from 'react';
import AccessModal from './partials/AccessModal';
import AccessSlide from './partials/AccessSlide';
import ActionButtons from './partials/ActionButtons';
import { AppContext } from '@/context/AppContext';

const Accessibility = () => {
  const contextInfo = useContext(AppContext);
  const [slideState, setSlideState] = useState(false);
  const [modalState, setModalState] = useState(false);
  const [mouseTrailState, setMouseTrailState] = useState(false);

  const handleSlidePanelOpen = () => {
    setSlideState(true);
  };

  const handleSlidePanelClose = () => {
    setSlideState(false);
  };

  const handleOpenModal = () => {
    setModalState(true);
  };
  const handleCloseModal = () => {
    setModalState(false);
  };

  const audioHandler = () => {
    contextInfo.setAudioState((prev) => !prev);
  };

  const mouseHandler = () => {
    setMouseTrailState((prev) => !prev);
  };

  return (
    <>
      <ActionButtons
        handleOpenModal={handleOpenModal}
        handleSlidePanelOpen={handleSlidePanelOpen}
      />
      <AccessSlide
        audioHandler={audioHandler}
        mouseHandler={mouseHandler}
        audioState={contextInfo.audioState}
        mouseTrailState={mouseTrailState}
        slideState={slideState}
        handleSlidePanelClose={handleSlidePanelClose}
      />
      <AccessModal
        audioHandler={audioHandler}
        mouseHandler={mouseHandler}
        audioState={contextInfo.audioState}
        mouseTrailState={mouseTrailState}
        open={modalState}
        closeModal={handleCloseModal}
      />
    </>
  );
};

export default Accessibility;
