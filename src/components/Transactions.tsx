import { Plus } from 'phosphor-react';
import { TransactionCard } from './TransactionCard';
import { CreateTransactionModal } from './CreateTransactionModal';
import { useState } from 'react';

interface Transactions {
  id: number;
  name: string;
  created_at: string;
}

export function Transactions() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [transactions, setTransactions] = useState<Transactions[]>([])


  // async function populateTransactions() {
  //   const { data } = await axios.get('http://localhost:3000/transactions')
  //   if(data.length > 0) {
  //     setTransactions([...data])
  //   }
  // }

  // useEffect(() => {
  //   populateTransactions()
  //   setTransactionsFormData(initialFormData)
  // }, [])



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
        <div className="cursor-pointer hover:bg-secondary rounded-sm transition">
          <Plus size={38} className="text-secondary hover:text-primary transition" onClick={handleOpenCreateTransactionModal} />
        </div>
      </header>
      <section className="overflow-auto transition bg-basic w-full h-auto max-h-[80vh] md:max-h-[60vh] rounded-2xl ">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 p-2">
          <TransactionCard />
        </div>
      </section>

        {/* {
          transactions.map(transaction => {
            return (
              <li key={transaction.id}>{transaction.name}</li>
            )
          })
        } */}
      <CreateTransactionModal
        isOpen={isModalOpen}
        closeModal={onCloseCreateTransactionModal}
      />
    </main>
  )
}