import React from 'react';
import Modal from 'react-modal';
import { AppState } from "../interfaces";

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
    overlay: {
      background: 'rgba(255,255,255,.8)',
      border: 'none',
    },
    content: {
      borderRadius: '10px',
      width: '30em',
      border: 'none',
      background: '#d7f6f4', //'#baf4dd',

      // top: '40px',
      // right: '40px',
      // bottom: '40px',
      // left: '40px',
      // marginRight: '-50%',
      transform: 'translate(50%, 50%)',
    },
  };



  function afterOpenModal() {
    console.log(`modal is open`)
  }

  function closeModal() {
    setAppState((oldState: AppState) => ({
      ...oldState,
      modalMessage: "",
      modalAction: () => { },
      modalIsOpen: false,
    }));
    ;
  }
  async function doAction() {
    const memberId = getAppState().memberId;
    console.log(`drop ${memberId}? `)
    await Promise.resolve(getAppState().modalAction())
    setAppState((oldState: AppState) => ({
      ...oldState,
      modalMessage: "",
      modalAction: () => { },
      modalIsOpen: false,
    }));
  }

  Modal.setAppElement('#root');

  return (
    <div
      className='modal-fm--wrapper'
    >
      <Modal
        className='modal-fm--body'
        isOpen={getAppState().modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="FM Modal"
        data={{ "member-id": getAppState().memberId }}
      >
        <div
          className='modal-fm--message'>{getAppState().modalMessage}</div>
        <div
          className='modal-fm--buttons-container'>
          <button
            className='modal-fm--action-btn basic-button'
            onClick={doAction}>Yes</button>
          <button
            onClick={closeModal}
            className='modal-fm--cancel-btn basic-button'
          >No</button>
        </div>
      </Modal>
    </div>
  );
}

