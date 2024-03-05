import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { TransactionContext } from "../../contexts/TransactionContext";
import { CategoryContext } from "../../contexts/CategoryContext";
import * as myToast from '../../helpers/toast';

import { TransactionsHttpHelper } from "../../helpers/transactionsHttp";
import { formatToBRL } from "../../helpers/formatToBRL";

import DatePicker, { registerLocale } from "react-datepicker";
import ptBR from "date-fns/locale/pt-BR";
import "react-datepicker/dist/react-datepicker.css";
registerLocale('ptBr', ptBR)


interface ModalBodyPropType {
  populateTransactions: () => void;
  handleFinishUpdatingTransaction: () => void;
}

export interface TransactionsFormData {
  name: string;
  when: Date | null;
  cost: number | null;
  categoryId: string;
  shared: boolean;
}

const initialFormData = {
  name: '',
  when: new Date(),
  cost: null,
  categoryId: "",
  shared: false
} as TransactionsFormData

export function ModalBody({ populateTransactions, handleFinishUpdatingTransaction }: ModalBodyPropType) {
  const {updatingTransaction} = useContext(TransactionContext)
  const { categories } = useContext(CategoryContext);

  const [transactionsFormData, setTransactionsFormData] = useState<TransactionsFormData>(initialFormData)
  const [selectedCategory, setSelectedCategory] = useState("")
  const isDisabled = !!transactionsFormData.name && !!transactionsFormData.cost && !!transactionsFormData.categoryId && !!transactionsFormData.when  

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
      handleFinishUpdatingTransaction()
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
        handleFinishUpdatingTransaction()
      } catch (error) {
        myToast.updateErrorToast(loading as number)
      }
    }
  }

  function handleAmountChange(event: ChangeEvent<HTMLInputElement>) {
    const rawValue = event.target.value
    const numericValue = parseFloat(rawValue.replace(/[^\d]/g, ''));
    //Regex remover todos os caracteres não numéricos
    
    setTransactionsFormData((prevState) => ({...prevState, cost: numericValue}))
  }

  return (
    <div className="px-2 sm:px-5 h-full w-full flex items-start justify-center bg-basic overflow-y-scroll">
      <form onSubmit={ updatingTransaction ? onUpdateTransaction: handleCreateTransaction } className="flex flex-col w-full max-w-sm py-3 md gap-3">
        <h2 className="w-full p-0.5 text-primary text-center text-lg">Confirme os dados da transação</h2>
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
            closeOnScroll
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
            onFocus={e => e.currentTarget.blur()}
          />
        </div>
    
        <div className="w-full p-0.5 flex items-center justify-between gap-4">
          <div className="w-2/3 p-0.5 flex flex-col gap-1">
            <label htmlFor="cost" className="text-primary">Custo</label>
            <input
              type="text"
              name="cost"
              id="cost"
              placeholder="1200,00"
              value={transactionsFormData.cost !== null ? formatToBRL(transactionsFormData.cost) : ""}
              onChange={handleAmountChange}
              maxLength={16}
              inputMode='numeric'
              className={`
              p-3
              text-right
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
          {updatingTransaction ? "Atualizar Transação" : "Criar Transação"}
        </button>
      </form>
    </div>
  )
}