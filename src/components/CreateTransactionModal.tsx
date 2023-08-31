import { useContext, useState } from 'react';
import Modal from 'react-modal';
import { CategoryContext } from '../contexts/CategoryContext';

Modal.setAppElement('#root');

export function CreateTransactionModal() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const { categories } = useContext(CategoryContext);

  // function openModal() {
  //   setIsOpen(true);
  // }

  function closeModal() {
    setIsOpen(false);
    console.log(categories);
    
  }

  return (
    <Modal
      // className={style.modal}
      // overlayClassName={style.modal_overlay}
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
    >
      <header>
        <h2>Tem certeza que deseja excluir o funcionário?</h2>
      </header>
      <button onClick={closeModal}>Cliq</button>

    </Modal>
  )
}