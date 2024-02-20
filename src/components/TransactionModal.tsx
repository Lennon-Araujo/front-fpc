// import { useContext, useState } from 'react';
import Modal from 'react-modal';

import { ModalTitle } from './TransactionModalSteps/ModalTitle';
import { ModalBody } from './TransactionModalSteps/ModalBody';

interface TransactionModalPropsType {
  isOpen: boolean;
  closeModal: () => void;
  populateTransactions: () => void;
  handleFinishUpdatingTransaction: () => void;
}

Modal.setAppElement('#root');
export function TransactionModal({isOpen, closeModal, populateTransactions, handleFinishUpdatingTransaction }: TransactionModalPropsType) {



  return (
    <Modal
    className="h-full w-full lg:w-[50vw] mx-auto lg:my-[10vh] bg-primary lg:rounded-2xl flex items-center justify-start flex-col overflow-hidden"
    overlayClassName="modal_overlay"
    isOpen={isOpen}
    onRequestClose={closeModal}
  >
    <ModalTitle handleFinishUpdatingTransaction={handleFinishUpdatingTransaction} closeModal={closeModal} />
    <ModalBody populateTransactions={populateTransactions} handleFinishUpdatingTransaction={handleFinishUpdatingTransaction} />

  </Modal>
  )
}