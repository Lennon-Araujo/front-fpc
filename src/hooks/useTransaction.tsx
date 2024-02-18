// useTransactions.js
import { useCallback } from 'react';
import { TransactionsHttpHelper } from '../helpers/transactionsHttp';
import { SummaryResult, TransactionsType } from '../contexts/TransactionContext';



interface UseTransactionsPropsType {
  onSetTransactions: (transaction: TransactionsType[]) => void;
  onSetSummary: (summary: SummaryResult | null) => void;
  filterPeriod: Date | null
}

export function useTransactions({ onSetTransactions, onSetSummary, filterPeriod }: UseTransactionsPropsType) {

  const memoizedPopulateTransactions = useCallback(async () => {
    try {
      const { data, status } = await TransactionsHttpHelper.getAll(filterPeriod);
      if (status === 200) {
        if (data.transactions.length > 0) {
          onSetTransactions([...data.transactions]);
          onSetSummary(data.summaries);
        } else {
          onSetTransactions([]);
          onSetSummary(null);
        }
      }
    } catch (error) {
      console.error('Erro ao carregar transações:', error);
    }
  }, [filterPeriod, onSetTransactions, onSetSummary]);

  return memoizedPopulateTransactions
}
