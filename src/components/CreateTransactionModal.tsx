// import { useContext, useState } from 'react';
import { FormEvent, useState } from 'react';
import DatePicker from "react-datepicker";
import { registerLocale } from  "react-datepicker";
import ptBr from 'date-fns/locale/pt-BR';
import Modal from 'react-modal';
import { X } from 'phosphor-react';
import { UsersHttpHelper } from '../helpers/transactionsHttp';

import "react-datepicker/dist/react-datepicker.css";
// import { CategoryContext } from '../contexts/CategoryContext';
registerLocale('ptBr', ptBr)

interface CreateTransactionModalPropsType {
  isOpen: boolean;
  closeModal: () => void;
}

export interface TransactionsFormData {
  name: string;
  when: Date | null;
  cost: number | null;
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
    when: new Date(),
    cost: null,
    categoryId: 1,
    shared: false
  } as TransactionsFormData

  const [transactionsFormData, setTransactionsFormData] = useState(initialFormData)


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
      className="h-[80vh] w-[80vw] mx-auto my-[10vh] bg-primary rounded-2xl flex items-center justify-start flex-col overflow-hidden"
      overlayClassName="modal_overlay"
      isOpen={isOpen}
      onRequestClose={closeModal}
    >
      <header className="p-5 bg-primary w-full flex justify-between">
        <h2 className="font-serif text-secondary text-3xl">Nova Transação</h2>
        <X onClick={closeModal} size={38} className="text-secondary hover:text-primary hover:bg-secondary transition cursor-pointer rounded-sm " />
      </header>

      <div className="p-5 h-full w-full flex items-start justify-center bg-basic">
        <form onSubmit={handleCreateTransaction} className="flex flex-col items-center gap-5 w-full">
          <div className="bg-primary w-3/4 p-0.5 rounded-2xl">
            <label htmlFor="name" className="text-primary"></label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Ex: Aluguel..."
              className={`
                border-none
                outline-none
                text-center
                rounded-2xl
                w-full
                h-8
                text-secondary
                text-lg
                font-serif
                truncate
                placeholder:text-primary/30
                ${transactionsFormData.name && 'bg-primary'}
              `}
              value={transactionsFormData.name}
              onChange={(event) => setTransactionsFormData((prevState) => ({...prevState, name: event.target.value}))}
            />
          </div>

          <DatePicker
            selected={transactionsFormData.when}
            onChange={(valor) => setTransactionsFormData((prevState) => ({...prevState, when: valor}))}
            locale="ptBr"
            dateFormat="dd/MM/yyyy"
            className="
            border-none
            outline-none
            text-center
            rounded-2xl
            w-full
            h-8
            text-primary
            text-lg
            font-serif
            truncate
            "
          />

          <div>
            <label htmlFor="cost">Custo</label>
            <input
              type="number"
              name="cost"
              id="cost"
              placeholder="1200,00"
              value={transactionsFormData.cost || ""}
              onChange={(event) => setTransactionsFormData((prevState) => ({...prevState, cost: Number(event.target.value)}))}
            />
          </div>

          <div>
            <label htmlFor="categoryId">Categoria</label>
            <input
              type="number"
              name="categoryId"
              id="categoryId"
              placeholder="CategoryIs"
              value={transactionsFormData.categoryId}
              onChange={(event) => setTransactionsFormData((prevState) => ({...prevState, categoryId: Number(event.target.value)}))}
            />
          </div>

          <div>
            <label htmlFor="shared">Compartilhado</label>
            <input
              type="checkbox"
              name="shared"
              id="shared"
              checked={transactionsFormData.shared}
              onChange={(event) => setTransactionsFormData((prevState) => ({...prevState, shared: event.target.checked}))}
            />
          </div>

          <button type="submit">Criar categoria</button>
        </form>

      </div>
    </Modal>
  )
}