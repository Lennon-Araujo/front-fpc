// useTransactions.js
import { useState, createContext, ReactNode } from 'react';


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
  summary: SummaryResult | null;
  onUpdatingTransaction: (transaction: TransactionsType | null) => void;
  onFinishUpdatingTransaction: () => void;
  onSetTransactions: (transaction: TransactionsType[]) => void;
  onSetSummary: (summary: SummaryResult | null) => void;
}

interface TransactionSummary {
  cost: number | null;
}

interface CategorySummary {
  categoryId: string | null;
  _sum: TransactionSummary;
}

export interface SummaryResult {
  generalSummary: { _sum: TransactionSummary };
  categorySummary: CategorySummary[];
}

type TransactionContextPropsType = {
  children: ReactNode;
}

export const TransactionContext = createContext({} as TransactionContextType)
// eslint-disable-next-line react-refresh/only-export-components
export function TransactionContextProvider({ children }: TransactionContextPropsType) {
  const [transactions, setTransactions] = useState<TransactionsType[]>([])
  const [updatingTransaction, setUpdatingTransaction] = useState<TransactionsType | null>(null)
  const [summary, setSummary] = useState<SummaryResult | null>(null)

  function onUpdatingTransaction(transaction: TransactionsType | null) {    
    if(!transaction) {
      setUpdatingTransaction(null)
    } else {
      setUpdatingTransaction((state) => ({state, ...transaction}));
    }
  }

  function onFinishUpdatingTransaction() {
    onUpdatingTransaction(null)
  }

  function onSetTransactions(transactions: TransactionsType[]) {
    setTransactions(([...transactions]))
  }

  function onSetSummary(summary: SummaryResult | null) {
    setSummary(summary)
  }

  return (
    <TransactionContext.Provider
    value={{
      transactions,
      updatingTransaction,
      summary,
      onUpdatingTransaction,
      onFinishUpdatingTransaction,
      onSetTransactions,
      onSetSummary
    }}
  >
    { children }
  </TransactionContext.Provider>
  )
}
