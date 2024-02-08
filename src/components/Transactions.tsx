import { Plus } from 'phosphor-react';
import { TransactionCard } from './TransactionCard';
import { TransactionModal } from './TransactionModal';
import { createContext, useCallback, useEffect, useState } from 'react';
import { TransactionsHttpHelper } from '../helpers/transactionsHttp';
import DatePicker from "react-datepicker";

export interface TransactionsType {
  id: number;
  name: string;
  when: Date;
  cost: number;
  categoryId: string;
  shared: boolean;
  created_at: string;
  updated_at: string;
}

interface TransactionContextType {
  transactions: TransactionsType[];
  updatingTransaction: TransactionsType | null;
  handleOpenTransactionModal: () => void;
  onUpdatingTransaction: (transaction: TransactionsType) => void;
  onFinishUpdatingTransaction: () => void;
}

export const TransactionContext = createContext({} as TransactionContextType)
export function Transactions() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactions, setTransactions] = useState<TransactionsType[]>([])
  const [updatingTransaction, setUpdatingTransaction] = useState<TransactionsType | null>(null)
  const [filterPeriod, setFilterPeriod] = useState<Date | null>(new Date())

  const memoizedPopulateTransactions = useCallback(() => {
    const fetchTransactions = async () => {
      const { data, status } = await TransactionsHttpHelper.getAll(filterPeriod)
      if (status === 200) {
        if (data.length > 0) {
          setTransactions([...data])
        } else {
          setTransactions([])
        }
      }
    };

    fetchTransactions();
  }, [filterPeriod]);

  useEffect(() => {
    memoizedPopulateTransactions();
  }, [memoizedPopulateTransactions]);

  function handleOpenTransactionModal() {
    setIsModalOpen(true);
  }

  function onCloseTransactionModal() {
    setIsModalOpen(false);
  }
  
  function onUpdatingTransaction(transaction: TransactionsType) {
    setUpdatingTransaction((state) => ({state, ...transaction}));
    handleOpenTransactionModal()
  }

  function onFinishUpdatingTransaction() {
    setUpdatingTransaction(null)
    onCloseTransactionModal()
  }

  return (
    <main className="w-11/12 p-4 flex flex-col gap-5 bg-primary rounded-2xl">
      <header className="flex flex-row items-center justify-between">
        <div className='flex items-center gap-4'>
          <h1
            className="text-center font-serif text-3xl text-secondary inline"
          >
            Transações
          </h1>
          <div className="p-0.5 flex items-center gap-1">
            <label htmlFor="datepicker" className="text-secondary hidden"> Período</label>
            <DatePicker
              selected={filterPeriod}
              onChange={(date) => setFilterPeriod(date)}
              locale="ptBr"
              dateFormat="MMM/yy"
              showMonthYearPicker
              closeOnScroll
              id='datepicker'
              className="
              text-center
              p-3
              rounded
              w-1/2
              h-10
              text-secondary
              font-sans
              truncate
              bg-primary
              border
              cursor-pointer
              hover:opacity-80
              border-secondary
              "
            />
          </div>
        </div>
        <Plus size={38} className="text-secondary hover:text-primary cursor-pointer hover:bg-secondary rounded-sm transition " onClick={handleOpenTransactionModal} />
      </header>
      <TransactionContext.Provider
        value={{
          transactions,
          updatingTransaction,
          handleOpenTransactionModal,
          onUpdatingTransaction,
          onFinishUpdatingTransaction
        }}
      >

      <section className="overflow-auto transition bg-basic w-full h-auto max-h-[80vh] md:max-h-[60vh] rounded-2xl ">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 p-2">
        {
          transactions.map(transaction => {     
            return (
              <TransactionCard key={transaction.id} transaction={transaction} populateTransactions={memoizedPopulateTransactions} />
              )
            })
          }
          
        </div>
      </section>
      <TransactionModal
        isOpen={isModalOpen}
        closeModal={onCloseTransactionModal}
        populateTransactions={memoizedPopulateTransactions}
        />
      </TransactionContext.Provider>
    </main>
  )
}