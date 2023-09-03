import { Plus } from 'phosphor-react';
import { TransactionCard } from './TransactionCard';
import { CreateTransactionModal } from './CreateTransactionModal';
import { useEffect, useState } from 'react';
import { TransactionsHttpHelper } from '../helpers/transactionsHttp';

export interface TransactionsType {
  id: number;
  name: string;
  categoryId: number;
  when: string;
  cost: number;
  shared: boolean;
  created_at: string;
  updated_at: string;
}

export function Transactions() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactions, setTransactions] = useState<TransactionsType[]>([])

  async function populateTransactions() {
    const { data } = await TransactionsHttpHelper.getAll()
    if(data.length  > 0) {
      setTransactions([...data])
    }
  }

  useEffect(() => {
    populateTransactions()
  }, [])

  function handleOpenCreateTransactionModal() {
    setIsModalOpen(true);
  }

  function onCloseCreateTransactionModal() {
    setIsModalOpen(false);
  }

  return (
    <main className="w-11/12 p-4 flex flex-col gap-5 bg-primary rounded-2xl">
      <header className="flex flex-row items-center justify-between">
        <h1
          className="text-center font-serif text-3xl text-secondary"
        >
          Transações
        </h1>
        <Plus size={38} className="text-secondary hover:text-primary cursor-pointer hover:bg-secondary rounded-sm transition " onClick={handleOpenCreateTransactionModal} />
      </header>
      <section className="overflow-auto transition bg-basic w-full h-auto max-h-[80vh] md:max-h-[60vh] rounded-2xl ">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 p-2">
        {
          transactions.map(transaction => {     
            return (
              <TransactionCard key={transaction.id} transaction={transaction} />
            )
          })
        }
          
        </div>
      </section>
      <CreateTransactionModal
        isOpen={isModalOpen}
        closeModal={onCloseCreateTransactionModal}
        populateTransactions={populateTransactions}
      />
    </main>
  )
}