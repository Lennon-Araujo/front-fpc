import { Plus } from 'phosphor-react';
import { TransactionCard } from './TransactionCard';
import { TransactionModal } from './TransactionModal';
import { createContext, useCallback, useEffect, useState } from 'react';
import { TransactionsHttpHelper } from '../helpers/transactionsHttp';
import DatePicker from "react-datepicker";
import * as myToast from "../helpers/toast";
import { formatToBRL } from '../helpers/formatToBRL';

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

interface TransactionSummary {
  cost: number | null
}

interface CategorySummary {
  categoryId: string | null
  _sum: TransactionSummary
}

export interface SummaryResult {
  generalSummary: { _sum: TransactionSummary }
  categorySummary: CategorySummary[]
}

export const TransactionContext = createContext({} as TransactionContextType)
export function Transactions() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactions, setTransactions] = useState<TransactionsType[]>([])
  const [updatingTransaction, setUpdatingTransaction] = useState<TransactionsType | null>(null)
  const [filterPeriod, setFilterPeriod] = useState<Date | null>(new Date())
  const [summary, setSummary] = useState<SummaryResult | null>(null)

  const memoizedPopulateTransactions = useCallback(() => {
    const fetchTransactions = async () => {
    const loading = myToast.loading("Carregando transações")

      try {
        const { data, status } = await TransactionsHttpHelper.getAll(filterPeriod)
        if (status === 200) {
          if (data.transactions.length > 0) {
            setTransactions([...data.transactions])
            setSummary(data.summaries)
          } else {
            setTransactions([])
            setSummary(null)
          }
          myToast.updateSuccessToast(loading as number)
        }
      } catch (error) {
        myToast.updateErrorToast(loading as number)
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
          <div>
            <h1
              className="text-center font-serif text-3xl text-secondary inline"
            >
              Transações
            </h1>
            <span className='block text-xs text-left font-sans text-secondary'>
              {summary?.generalSummary._sum.cost && `Total: ${formatToBRL(summary?.generalSummary._sum.cost)}`}
            </span>
          </div>
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
        <div className={`grid grid-cols-1 p-2 ${transactions.length > 1  && "sm:grid-cols-2 lg:grid-cols-3 gap-2"}`}>
        {
          transactions.length > 0
          ? transactions.map(transaction => {
            return (
              <TransactionCard key={transaction.id} transaction={transaction} populateTransactions={memoizedPopulateTransactions} />
              )
            })
          : <div className='flex flex-col items-center justify-center w-full bg-primary rounded-2xl h-auto p-6 text-center'>
              <p className='text-basic font-sans'>Não encontramos nada &#128517;</p>
              <p className='text-basic font-sans text-sm'>Por favor selecione outro período ou tente criar uma nova transação.</p>
            </div>
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