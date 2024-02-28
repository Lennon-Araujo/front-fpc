// useTransactions.js
import { useCallback } from 'react';
import { TransactionsHttpHelper } from '../helpers/transactionsHttp';
import { SummaryResult, TransactionsType } from '../contexts/TransactionContext';
import { useNavigate } from 'react-router-dom';

interface UseTransactionsPropsType {
  onSetTransactions: (transaction: TransactionsType[]) => void;
  onSetSummary: (summary: SummaryResult | null) => void;
  filterPeriod: Date | null
}

export function useTransactions({ onSetTransactions, onSetSummary, filterPeriod }: UseTransactionsPropsType) {
  const navigate = useNavigate()
  const memoizedPopulateTransactions = useCallback(async () => {
    try {
      const response = await TransactionsHttpHelper.getAll(filterPeriod);
      if (response.data.transactions.length > 0) {
        onSetTransactions([...response.data.transactions]);
        onSetSummary(response.data.summaries);
      } else {
        onSetTransactions([]);
        onSetSummary(null);
      }
    } catch (error) {
      onSetTransactions([]);
      onSetSummary(null);
      navigate(0)
    }
  }, [filterPeriod, onSetTransactions, onSetSummary, navigate]);

  return memoizedPopulateTransactions
}
