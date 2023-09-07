import { Plus } from 'phosphor-react';
import { TransactionCard } from './TransactionCard';
import { TransactionModal } from './TransactionModal';
import { createContext, useEffect, useState } from 'react';
import { TransactionsHttpHelper } from '../helpers/transactionsHttp';

export interface TransactionsType {
  id: number;
  name: string;
  when: Date;
  cost: number;
  categoryId: number;
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

  async function populateTransactions() {
    const { data, status } = await TransactionsHttpHelper.getAll()
    if(status === 200) {
      if(data.length  > 0) {
        setTransactions([...data])
      } else {
        setTransactions([])
      }
    }
  }

  useEffect(() => {
    populateTransactions()
  }, [])

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
        <h1
          className="text-center font-serif text-3xl text-secondary"
        >
          Transações
        </h1>
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
              <TransactionCard key={transaction.id} transaction={transaction} populateTransactions={populateTransactions} />
              )
            })
          }
          
        </div>
      </section>
      <TransactionModal
        isOpen={isModalOpen}
        closeModal={onCloseTransactionModal}
        populateTransactions={populateTransactions}
        />
      </TransactionContext.Provider>
    </main>
  )
}