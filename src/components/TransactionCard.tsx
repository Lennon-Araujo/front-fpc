import { Pencil, Trash, Users } from "phosphor-react";
import { format } from "date-fns";
import { useContext } from "react";
import { CategoryContext } from "../contexts/CategoryContext";
import { TransactionsHttpHelper } from "../helpers/transactionsHttp";
import * as myToast from "../helpers/toast";
import { formatToBRL } from "../helpers/formatToBRL";
import { TransactionContext, TransactionsType } from "../contexts/TransactionContext";

interface TransactionCardPropsType {
  transaction: TransactionsType;
  populateTransactions: () => void;
  handleOpenTransactionModal: () => void;
}

export function TransactionCard( { transaction, populateTransactions, handleOpenTransactionModal }: TransactionCardPropsType) {
  
  const {
    id,
    categoryId,
    cost,
    when,
    name,
    shared
  } = transaction;

  const { onUpdatingTransaction } = useContext(TransactionContext)


  
  const { categories } = useContext(CategoryContext)
  const category = categories.find((category) => category.id === categoryId)
  const categoryName = category ? category.name : 'sem categoria';

  async function handleDeleteTransaction() {
    const loading = myToast.loading()
    try {
      await TransactionsHttpHelper.delete(id)
      populateTransactions()
      myToast.updateSuccessToast(loading as number)
    } catch (error) {
      myToast.updateErrorToast(loading as number)
    }
  }

  async function handleUpdateTransaction() {
    onUpdatingTransaction(transaction)
    handleOpenTransactionModal()
  }

  return (
    <div key={id} className="flex flex-col p-3 bg-primary justify-center h-auto rounded-2xl">
      <header className="flex">
        <span className="w-2/3 text-md text-basic truncate">{name}</span>
        <div className="w-1/3 text-basic flex justify-end gap-2">
          <button onClick={handleUpdateTransaction}>
            <Pencil size={20} />
          </button>
          <button onClick={handleDeleteTransaction}>
            <Trash size={20} />
          </button>
        </div>
      </header>
      <div className="flex justify-between">
        <div className="w-1/2">
          <p className="text-sm text-basic font-light truncate">{categoryName}</p>
          <p className="text-sm text-basic font-light">{format(new Date(when), 'dd/MM/yyyy')}</p>
        </div>
        <div className="w-1/2 text-right flex justify-end items-end">
            <p className="text-sm text-basic">
            {
              shared && <Users size={18} className="inline text-primary bg-secondary rounded-full p-0.5 align-sub mr-0.5" />
            }
            {
              formatToBRL(cost)
            }
            </p>
        </div>
      </div>
    </div>
  )
}