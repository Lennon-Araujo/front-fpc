/* eslint-disable react-hooks/exhaustive-deps */
import { CircleNotch, Plus } from 'phosphor-react';
import { TransactionCard } from './TransactionCard';
import { TransactionModal } from './TransactionModal';
import { useCallback, useContext, useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import { formatToBRL } from '../helpers/formatToBRL';
import { useTransactions } from '../hooks/useTransaction';
import { TransactionContext } from '../contexts/TransactionContext';
import { TransactionSkeletonLoading } from './TransactionSkeletonLoading';

export function Transactions() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterPeriod, setFilterPeriod] = useState<Date | null>(new Date())
  const [isLoading, setIsLoading] = useState(false)

  const {
    transactions,
    summary,
    onSetTransactions,
    onSetSummary,
    onUpdatingTransaction
  } = useContext(TransactionContext)

  const memoizedPopulateTransactions = useTransactions({
    onSetTransactions: useCallback(onSetTransactions, []),
    onSetSummary: useCallback(onSetSummary, []),
    filterPeriod,
  });

  useEffect(() => {
    setIsLoading(true)

    memoizedPopulateTransactions().then(() => {
      setIsLoading(false)
    })

  }, [memoizedPopulateTransactions, filterPeriod]);

  function handleOpenTransactionModal() {
    setIsModalOpen(true);
  }

  function onCloseTransactionModal() {
    setIsModalOpen(false);
  }

  function handleFinishUpdatingTransaction() {
    onUpdatingTransaction(null)
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
              {
                isLoading
                ? <div>Total: R$ <CircleNotch className='animate-spin inline' size={16} /> </div>
                : summary?.generalSummary._sum.cost && `Total: ${formatToBRL(summary?.generalSummary._sum.cost)}`
              }
            </span>
          </div>
          <div className="p-0.5 flex items-center gap-1">
            <label htmlFor="datepicker" className="text-secondary hidden">Período</label>
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
              onFocus={e => e.target.blur()}
            />
          </div>
        </div>
        <Plus size={38} className="text-secondary hover:text-primary cursor-pointer hover:bg-secondary rounded-sm transition " onClick={handleOpenTransactionModal} />
      </header>


      <section className="overflow-auto transition bg-basic w-full h-auto max-h-[80vh] md:max-h-[60vh] rounded-2xl ">
        <div className={`grid grid-cols-1 p-2 ${!isLoading && transactions.length > 1  && "sm:grid-cols-2 lg:grid-cols-3 gap-2"}`}>
        {
          isLoading
          ? <TransactionSkeletonLoading />
          : transactions.length > 0
          ? transactions.map(transaction => {
            return (
              <TransactionCard key={transaction.id} transaction={transaction} populateTransactions={memoizedPopulateTransactions} handleOpenTransactionModal={handleOpenTransactionModal} />
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
        handleFinishUpdatingTransaction={handleFinishUpdatingTransaction}
        />
    </main>
  )
}