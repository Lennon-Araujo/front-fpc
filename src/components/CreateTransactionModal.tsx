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
  const isDisabled = !!transactionsFormData.name && !!transactionsFormData.cost && !!transactionsFormData.categoryId && !!transactionsFormData.when
  console.log(!isDisabled);
  

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
      className="h-[75vh] w-[80vw] mx-auto my-[10vh] bg-primary rounded-2xl flex items-center justify-start flex-col overflow-hidden"
      overlayClassName="modal_overlay"
      isOpen={isOpen}
      onRequestClose={closeModal}
    >
      <header className="p-5 bg-primary w-full flex justify-between">
        <h2 className="font-serif text-secondary text-3xl">Nova Transação</h2>
        <X onClick={closeModal} size={38} className="text-secondary hover:text-primary hover:bg-secondary transition cursor-pointer rounded-sm " />
      </header>

      <div className="p-5 h-full w-full flex items-center justify-center bg-basic">
        <form onSubmit={handleCreateTransaction} className="flex flex-col items-center gap-3 w-full max-w-sm">
          <h2 className="w-full max-w-xs p-0.5 text-primary text-center text-lg">Preencha o formulário para criar uma nova transação</h2>
          <div className="w-full max-w-xs p-0.5 flex flex-col gap-1">
            <label htmlFor="name" className="text-primary">Transação</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Ex: Aluguel..."
              className={`
                p-3
                text-left
                rounded
                w-full
                h-10
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

          <div className="w-full max-w-xs p-0.5 flex flex-col gap-1">
            <label htmlFor="datepicker" className="text-primary">Data da transação</label>
            <DatePicker
              selected={transactionsFormData.when}
              onChange={(valor) => setTransactionsFormData((prevState) => ({...prevState, when: valor}))}
              locale="ptBr"
              dateFormat="dd/MM/yyyy"
              id='datepicker'
              className="
              text-left
              p-3
              rounded
              w-full
              h-10
              text-primary
              text-lg
              font-serif
              truncate
              "
            />
          </div>

          <div className="w-full max-w-xs p-0.5 flex items-center justify-center gap-4">
            <div className="w-full p-0.5 flex flex-col gap-1">
              <label htmlFor="cost" className="text-primary">Custo</label>
              <input
                type="number"
                name="cost"
                id="cost"
                placeholder="1200,00"
                value={transactionsFormData.cost || ""}
                onChange={(event) => setTransactionsFormData((prevState) => ({...prevState, cost: Number(event.target.value)}))}
                className={`
                p-3
                text-left
                rounded
                w-full
                h-10
                text-secondary
                text-lg
                font-serif
                placeholder:text-primary/30
                shadow-sm
                ${transactionsFormData.cost && 'bg-primary'}
              `}
              />
            </div>

            <div className="w-full p-0.5 flex gap-2 items-center pt-7">
              <input
                type="checkbox"
                name="shared"
                id="shared"
                checked={transactionsFormData.shared}
                className="selection:bg-slate-500"
                onChange={(event) => setTransactionsFormData((prevState) => ({...prevState, shared: event.target.checked}))}
              />
              <label htmlFor="shared" className="text-primary text-xs">Este custo será compartilhado?</label>
            </div>
          </div>

          <div className="w-full max-w-xs p-0.5 flex flex-col gap-1">
            <label htmlFor="categoryId" className="text-primary">Categoria</label>
            <select
              name="categoryId"
              id="categoryId"
              placeholder="CategoryIs"
              value={transactionsFormData.categoryId}
              className={`
                p-3
                text-left
                rounded
                w-full
                h-10
                text-secondary
                text-lg
                font-serif
                placeholder:text-primary/30
                shadow-sm
                ${transactionsFormData.categoryId && 'bg-primary'}`
              }
              onChange={(event) => setTransactionsFormData((prevState) => ({...prevState, categoryId: Number(event.target.value)}))}
            >
              <option value="">Selecione...</option>
              <option value={1}>Teste</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={!isDisabled}
            className="
              w-full
              max-w-xs
              p-3
              mt-7
              rounded
              bg-secondary
              text-primary
              font-serif
              text-xl
              hover:bg-secondary/80
              hover:text-primary/80
              transition
              disabled:bg-secondary/90
              disabled:text-primary/80
              disabled:cursor-not-allowed
            "
          >
            Criar Transação
          </button>
        </form>

      </div>
    </Modal>
  )
}