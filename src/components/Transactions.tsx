import axios from "axios";
import DatePicker from 'react-date-picker';
import { FormEvent, useEffect, useState } from "react";

import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

interface Transactions {
  id: number;
  name: string;
  created_at: string;
}

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

interface TransactionsFormData {
  name: string;
  when: Value;
  cost: number;
  categoryId: number;
  shared: boolean;
}

export function Transactions() {
  const [transactions, setTransactions] = useState<Transactions[]>([])
  const [transactionsFormData, setTransactionsFormData] = useState({} as TransactionsFormData)

  const initialFormData = {
    name: '',
    when: null,
    cost: 0,
    categoryId: 1,
    shared: false
  }

  async function populateTransactions() {
    const { data } = await axios.get('http://localhost:3000/transactions')
    if(data.length > 0) {
      setTransactions([...data])
    }
  }

  useEffect(() => {
    populateTransactions()
    setTransactionsFormData(initialFormData)
  }, [])

  async function handleCreateTransaction(event: FormEvent) {
    event.preventDefault()
    const payload = {
      ...transactionsFormData
    }
    const response = await axios.post('http://localhost:3000/transactions', payload)
    if(response.status === 201) {
      populateTransactions()
    }
  }

  return (
    <>
      <h1>Transactions</h1>
      <form onSubmit={handleCreateTransaction}>
        <label htmlFor="name">Nome</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Digite qual a transação realizada"
          value={transactionsFormData.name}
          onChange={(event) => setTransactionsFormData((prevState) => ({...prevState, name: event.target.value}))}
        />

        <DatePicker value={transactionsFormData.when} onChange={(valor) => setTransactionsFormData((prevState) => ({...prevState, when: valor}))} />

        <label htmlFor="cost">Custo</label>
        <input
          type="number"
          name="cost"
          id="cost"
          placeholder="Valor"
          value={transactionsFormData.cost}
          onChange={(event) => setTransactionsFormData((prevState) => ({...prevState, cost: Number(event.target.value)}))}
        />

        <label htmlFor="categoryId">Categoria</label>
        <input
          type="number"
          name="categoryId"
          id="categoryId"
          placeholder="CategoryIs"
          value={transactionsFormData.categoryId}
          onChange={(event) => setTransactionsFormData((prevState) => ({...prevState, categoryId: Number(event.target.value)}))}
        />

        <label htmlFor="shared">Compartilhado</label>
        <input
          type="checkbox"
          name="shared"
          id="shared"
          checked={transactionsFormData.shared}
          onChange={(event) => setTransactionsFormData((prevState) => ({...prevState, shared: event.target.checked}))}
        />

        <button type="submit">Criar categoria</button>
      </form>
      <div>
        {
          transactions.map(transaction => {
            return (
              <li key={transaction.id}>{transaction.name}</li>
            )
          })
        }
      </div>
    </>
  )
}