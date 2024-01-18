// import { useContext, useState } from 'react';
import { FormEvent, useContext, useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import { registerLocale } from  "react-datepicker";
import ptBr from 'date-fns/locale/pt-BR';
import Modal from 'react-modal';
import { X } from 'phosphor-react';
import { TransactionsHttpHelper } from '../helpers/transactionsHttp';

import "react-datepicker/dist/react-datepicker.css";
import { CategoryContext } from '../contexts/CategoryContext';
import * as myToast from '../helpers/toast';
import { TransactionContext } from './Transactions';
registerLocale('ptBr', ptBr)

interface TransactionModalPropsType {
  isOpen: boolean;
  transactionToUpdate?: TransactionsFormData;
  toUpdateModal?: boolean;
  closeModal: () => void;
  populateTransactions: () => void;
}

export interface TransactionsFormData {
  name: string;
  when: Date | null;
  cost: number | null;
  categoryId: string;
  shared: boolean;
}

// type TransactionToUpdate = Partial<TransactionsType>

const initialFormData = {
  name: '',
  when: new Date(),
  cost: null,
  categoryId: "",
  shared: false
} as TransactionsFormData

Modal.setAppElement('#root');
export function TransactionModal({isOpen, closeModal, populateTransactions }: TransactionModalPropsType) {

  const {updatingTransaction, onFinishUpdatingTransaction} = useContext(TransactionContext)
  
  const [transactionsFormData, setTransactionsFormData] = useState<TransactionsFormData>(initialFormData)
  const [selectedCategory, setSelectedCategory] = useState("")
  const isDisabled = !!transactionsFormData.name && !!transactionsFormData.cost && !!transactionsFormData.categoryId && !!transactionsFormData.when
  const { categories } = useContext(CategoryContext);

  useEffect(() => {
    setTransactionsFormData(initialFormData)

    if(updatingTransaction) {
      const { name, when, cost, shared, categoryId } = updatingTransaction;
      setTransactionsFormData({
        name,
        when: new Date(when),
        cost,
        shared,
        categoryId
      })
      
      if(updatingTransaction.categoryId) {
        setSelectedCategory(updatingTransaction.categoryId)
      }
    }

  }, [updatingTransaction])


  async function handleCreateTransaction(event: FormEvent) {
    event.preventDefault()
    const payload = {
      ...transactionsFormData
    }
    const loading = myToast.loading()
    try {
      await TransactionsHttpHelper.createTransaction(payload)
      populateTransactions()
      myToast.updateSuccessToast(loading as number)
      setTransactionsFormData(initialFormData)
    } catch (error) {
      myToast.updateErrorToast(loading as number)
    }
  }

  async function onUpdateTransaction(event: FormEvent) {
    event.preventDefault()
    const payload = {
      ...transactionsFormData
    }
    const loading = myToast.loading()

    if(updatingTransaction?.id) {
      try {
        await TransactionsHttpHelper.updateTransaction(updatingTransaction.id ,payload)
        populateTransactions()
        myToast.updateSuccessToast(loading as number)
        setTransactionsFormData(initialFormData)
        onFinishUpdatingTransaction()
      } catch (error) {
        myToast.updateErrorToast(loading as number)
      }
    }
  }

  return (
    updatingTransaction ? (
      <Modal
      className="h-[80vh] w-[80vw] lg:w-[50vw] mx-auto my-[10vh] bg-primary rounded-2xl flex items-center justify-start flex-col overflow-hidden"
      overlayClassName="modal_overlay"
      isOpen={isOpen}
      onRequestClose={closeModal}
    >

      <header className="p-5 bg-primary w-full flex justify-between">
        <h2 className="font-serif text-secondary text-3xl">
          Atualizar Transação
        </h2>
        <X onClick={onFinishUpdatingTransaction} size={38} className="text-secondary hover:text-primary hover:bg-secondary transition cursor-pointer rounded-sm" />
      </header>

      <div className="px-2 sm:px-5 h-full w-full flex items-start justify-center bg-basic overflow-y-scroll">
        <form onSubmit={onUpdateTransaction} className="flex flex-col w-full max-w-sm py-3 md gap-3">
          <h2 className="w-full p-0.5 text-primary text-center text-lg">Preencha o formulário para editar transação</h2>
          <div className="w-full p-0.5 flex flex-col gap-1">
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
                font-sans
                truncate
                placeholder:text-primary/30
                ${transactionsFormData.name && 'bg-primary'}
              `}
              value={transactionsFormData.name}
              onChange={(event) => setTransactionsFormData((prevState) => ({...prevState, name: event.target.value}))}
            />
          </div>

          <div className="w-full p-0.5 flex flex-col gap-1">
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
              font-sans
              truncate
              "
            />
          </div>

          <div className="w-full p-0.5 flex items-center justify-between gap-4">
            <div className="w-2/3 p-0.5 flex flex-col gap-1">
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
                font-sans
                placeholder:text-primary/30
                ${transactionsFormData.cost && 'bg-primary'}
              `}
              />
            </div>

            <div className="w-1/2 p-0.5 flex pl-2 items-center pt-7">
              <input
                type="checkbox"
                name="shared"
                id="shared"
                checked={transactionsFormData.shared}
                onChange={(event) => setTransactionsFormData((prevState) => ({...prevState, shared: event.target.checked}))}
              />
              <label htmlFor="shared" className="text-primary text-xs md:text-sm pl-3">Este custo será compartilhado?</label>
            </div>
          </div>

          <div className="w-full p-0.5 flex flex-col gap-1">
            <label htmlFor="categoryId" className="text-primary">Categoria</label>
            <select
              name="categoryId"
              id="categoryId"
              placeholder="CategoryIs"
              value={transactionsFormData.categoryId}
              className={`
                p-2
                text-left
                rounded
                w-full
                h-10
                text-secondary
                font-sans
                placeholder:text-primary/30
                ${transactionsFormData.categoryId && 'bg-primary'}`
              }
              onChange={(event) => setTransactionsFormData((prevState) => ({...prevState, categoryId: event.target.value}))}
            >
              <option aria-selected={!!selectedCategory} value={0}>Selecione...</option>
              {                
                categories.map((category) => {
                  return (
                    <option
                      key={category.id}
                      value={category.id}
                      aria-selected={category.id === selectedCategory ?? true}
                    >
                      {category.name}
                    </option>
                  )
                })
              }
            </select>
          </div>

          <button
            type="submit"
            disabled={!isDisabled}
            className="
              w-full
              p-3
              mt-7
              rounded
              bg-secondary
              text-primary
              font-sans font-semibold
              text-lg
              hover:bg-secondary/80
              hover:text-primary/80
              transition
              disabled:bg-secondary/90
              disabled:text-primary/80
              disabled:cursor-not-allowed
            "
          >
            Atualizar Transação
          </button>
        </form>

      </div>
    </Modal>
    ) : (
      <Modal
      className="h-[80vh] w-[80vw] lg:w-[50vw] mx-auto my-[10vh] bg-primary rounded-2xl flex items-center justify-start flex-col overflow-hidden"
      overlayClassName="modal_overlay"
      isOpen={isOpen}
      onRequestClose={closeModal}
    >

      <header className="p-5 bg-primary w-full flex justify-between">
        <h2 className="font-serif text-secondary text-3xl">
          Nova Transação
        </h2>
        <X onClick={closeModal} size={38} className="text-secondary hover:text-primary hover:bg-secondary transition cursor-pointer rounded-sm" />
      </header>

      <div className="px-2 sm:px-5 h-full w-full flex items-start justify-center bg-basic overflow-y-scroll">
        <form onSubmit={handleCreateTransaction} className="flex flex-col w-full max-w-sm py-3 md gap-3">
          <h2 className="w-full p-0.5 text-primary text-center text-lg">Preencha o formulário para criar uma nova transação</h2>
          <div className="w-full p-0.5 flex flex-col gap-1">
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
                font-sans
                truncate
                placeholder:text-primary/30
                ${transactionsFormData.name && 'bg-primary'}
              `}
              value={transactionsFormData.name}
              onChange={(event) => setTransactionsFormData((prevState) => ({...prevState, name: event.target.value}))}
            />
          </div>

          <div className="w-full p-0.5 flex flex-col gap-1">
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
              font-sans
              truncate
              "
            />
          </div>

          <div className="w-full p-0.5 flex items-center justify-between gap-4">
            <div className="w-2/3 p-0.5 flex flex-col gap-1">
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
                font-sans
                placeholder:text-primary/30
                ${transactionsFormData.cost && 'bg-primary'}
              `}
              />
            </div>

            <div className="w-1/2 p-0.5 flex pl-2 items-center pt-7">
              <input
                type="checkbox"
                name="shared"
                id="shared"
                checked={transactionsFormData.shared}
                onChange={(event) => setTransactionsFormData((prevState) => ({...prevState, shared: event.target.checked}))}
              />
              <label htmlFor="shared" className="text-primary text-xs md:text-sm pl-3">Este custo será compartilhado?</label>
            </div>
          </div>

          <div className="w-full p-0.5 flex flex-col gap-1">
            <label htmlFor="categoryId" className="text-primary">Categoria</label>
            <select
              name="categoryId"
              id="categoryId"
              placeholder="CategoryIs"
              value={transactionsFormData.categoryId}
              className={`
                p-2
                text-left
                rounded
                w-full
                h-10
                text-secondary
                font-sans
                placeholder:text-primary/30
                ${transactionsFormData.categoryId && 'bg-primary'}`
              }
              onChange={(event) => setTransactionsFormData((prevState) => ({...prevState, categoryId: event.target.value}))}
            >
              <option value={0}>Selecione...</option>
              {
                categories.map((category) => {
                  return (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  )
                })
              }
            </select>
          </div>

          <button
            type="submit"
            disabled={!isDisabled}
            className="
              w-full
              p-3
              mt-7
              rounded
              bg-secondary
              text-primary
              font-sans font-semibold
              text-lg
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

  )
}