// import { useContext, useState } from 'react';
import { FormEvent, useState } from 'react';
import DatePicker from 'react-date-picker';
import Modal from 'react-modal';

import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { UsersHttpHelper } from '../helpers/transactionsHttp';
// import { CategoryContext } from '../contexts/CategoryContext';

interface CreateTransactionModalPropsType {
  isOpen: boolean;
  closeModal: () => void;
}

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];
export interface TransactionsFormData {
  name: string;
  when: Value;
  cost: number;
  categoryId: number;
  shared: boolean;
}

interface StatusCodeApiResponse {
  status: number;
}

Modal.setAppElement('#root');
export function CreateTransactionModal({isOpen, closeModal}: CreateTransactionModalPropsType) {
  const initialFormData = {
    name: '',
    when: null,
    cost: 0,
    categoryId: 1,
    shared: false
  }

  const [transactionsFormData, setTransactionsFormData] = useState(initialFormData as TransactionsFormData)


  // const { categories } = useContext(CategoryContext);

  async function handleCreateTransaction(event: FormEvent) {
    event.preventDefault()
    const payload = {
      ...transactionsFormData
    }
    const response = await UsersHttpHelper.createTransaction(payload) as StatusCodeApiResponse
    if(response.status === 201) {
      await UsersHttpHelper.getAll()
    }
  }

  return (
    <Modal
      className="h-[40vh] w-[35vw] mx-auto my-[20vh] bg-basic rounded-2xl flex items-center justify-between flex-col"
      overlayClassName="modal_overlay"
      isOpen={isOpen}
      onRequestClose={closeModal}
    >
      <header>
        <h2>Tem certeza que deseja excluir o funcionário?</h2>
      </header>

      <form onSubmit={handleCreateTransaction}>
        <label htmlFor="name">Nome</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Digite qual a transação realizada"
          value={transactionsFormData.name}
          onChange={(event) => setTransactionsFormData((prevState) => ({...prevState, name: event.target.value}))}
        />

        <DatePicker value={transactionsFormData.when} onChange={(valor) => setTransactionsFormData((prevState) => ({...prevState, when: valor}))} />

        <label htmlFor="cost">Custo</label>
        <input
          type="number"
          name="cost"
          id="cost"
          placeholder="Valor"
          value={transactionsFormData.cost}
          onChange={(event) => setTransactionsFormData((prevState) => ({...prevState, cost: Number(event.target.value)}))}
        />

        <label htmlFor="categoryId">Categoria</label>
        <input
          type="number"
          name="categoryId"
          id="categoryId"
          placeholder="CategoryIs"
          value={transactionsFormData.categoryId}
          onChange={(event) => setTransactionsFormData((prevState) => ({...prevState, categoryId: Number(event.target.value)}))}
        />

        <label htmlFor="shared">Compartilhado</label>
        <input
          type="checkbox"
          name="shared"
          id="shared"
          checked={transactionsFormData.shared}
          onChange={(event) => setTransactionsFormData((prevState) => ({...prevState, shared: event.target.checked}))}
        />

        <button type="submit">Criar categoria</button>
      </form>
      <button onClick={closeModal}>Cliq</button>

    </Modal>
  )
}