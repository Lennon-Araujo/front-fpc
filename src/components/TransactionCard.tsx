import { Pencil, Trash, Users } from "phosphor-react";
import { TransactionsType } from "../components/Transactions"
import { format } from "date-fns";
import { useContext } from "react";
import { CategoryContext } from "../contexts/CategoryContext";

interface TransactionCardPropsType {
  transaction: TransactionsType;
}

export function TransactionCard( { transaction }: TransactionCardPropsType) {
  
  const {
    id,
    categoryId,
    cost,
    when,
    name,
    shared
  } = transaction;
  
  const { categories } = useContext(CategoryContext)
  const category = categories.find((category) => category.id === categoryId)
  const categoryName = category ? category.name : 'sem categoria'

  return (
    <div key={id} className="flex gap-3 p-3 bg-primary flex-1 justify-between h-auto rounded-2xl">
      <div className="w-2/3 flex flex-col justify-between text-left">
        <span className="text-md text-basic truncate">{name}</span>
        <div>
          <p className="text-sm text-basic font-light">{categoryName}</p>
          <p className="text-sm text-basic font-light">{format(new Date(when), 'dd/MM/yyyy')}</p>
        </div>
      </div>
      <div className="w-full text-right flex flex-col justify-between">
        <div className="text-basic flex justify-end gap-2">
          <Pencil size={20} />
          <Trash size={20} />
        </div>
          <p className="text-md text-basic :">
          {
            shared && <Users size={20} className="inline text-primary bg-secondary rounded-full p-0.5 align-sub mr-2" />
          }
          {
            cost.toFixed(2)
          }
          </p>
      </div>
    </div>
  )
}