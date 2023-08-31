// import { useContext, useState } from 'react';
import Modal from 'react-modal';
// import { CategoryContext } from '../contexts/CategoryContext';

interface CreateTransactionModalPropsType {
  isOpen: boolean;
  closeModal: () => void;
}

Modal.setAppElement('#root');
export function CreateTransactionModal({isOpen, closeModal}: CreateTransactionModalPropsType) {

  // const { categories } = useContext(CategoryContext);

  return (
    <Modal
      // className={style.modal}
      // overlayClassName={style.modal_overlay}
      isOpen={isOpen}
      onRequestClose={closeModal}
    >
      <header>
        <h2>Tem certeza que deseja excluir o funcionário?</h2>
      </header>
      <button onClick={closeModal}>Cliq</button>

    </Modal>
  )
}