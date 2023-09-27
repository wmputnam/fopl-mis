import React from 'react';
import Modal from 'react-modal';
import { AppState } from "../App";

export interface ModalFmProps {
  actionMessage: string;
  actionHandler: () => any;
  setAppState: React.Dispatch<React.SetStateAction<AppState>>;
  getAppState: () => any;

}

export const ModalFM = ({
  getAppState,
  setAppState,
}: ModalFmProps) => {

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };



  function afterOpenModal() {
  }

  function closeModal() {
    setAppState((oldState: AppState) => ({
      ...oldState,
      modalMessage:"",
      modalAction: () => {},
      modalIsOpen: false,
    }));
    ;
  }
  function doAction() {
    getAppState().modalAction()
    setAppState((oldState: AppState) => ({
      ...oldState,
      modalMessage: "",
      modalAction: () => { },
      modalIsOpen: false,
    }));
  }

  return (
    <div>
      <Modal
        isOpen={getAppState().modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="FM Modal"
      >
        <div>{getAppState().modalMessage}</div>
        <button onClick={doAction}>Yes</button>
        <button onClick={closeModal}>No</button>
      </Modal>
    </div>
  );
}

