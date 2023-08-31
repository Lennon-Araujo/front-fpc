// import axios from "axios";
// import DatePicker from 'react-date-picker';
// import { FormEvent, useEffect, useState } from "react";

import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { Plus } from 'phosphor-react';
import { TransactionCard } from './TransactionCard';

interface Transactions {
  id: number;
  name: string;
  created_at: string;
}


// type ValuePiece = Date | null;
// type Value = ValuePiece | [ValuePiece, ValuePiece];

// interface TransactionsFormData {
//   name: string;
//   when: Value;
//   cost: number;
//   categoryId: number;
//   shared: boolean;
// }

export function Transactions() {
  // const [transactions, setTransactions] = useState<Transactions[]>([])

  // const initialFormData = {
  //   name: '',
  //   when: null,
  //   cost: 0,
  //   categoryId: 1,
  //   shared: false
  // }

  // const [transactionsFormData, setTransactionsFormData] = useState(initialFormData as TransactionsFormData)

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

  // async function handleCreateTransaction(event: FormEvent) {
  //   event.preventDefault()
  //   const payload = {
  //     ...transactionsFormData
  //   }
  //   const response = await axios.post('http://localhost:3000/transactions', payload)
  //   if(response.status === 201) {
  //     populateTransactions()
  //   }
  // }

  return (
    <main className="w-11/12 p-4 flex flex-col gap-5 bg-primary rounded-2xl">
      <header className="flex flex-row items-center justify-between">
        <h1
          className="text-center font-serif text-3xl text-secondary"
        >
          Transações
        </h1>
        <div className="cursor-pointer hover:bg-secondary rounded-sm transition">
          <Plus size={38} className="text-secondary hover:text-primary transition" />
        </div>
      </header>
      <section className="overflow-auto transition bg-basic w-full h-auto max-h-[80vh] md:max-h-[60vh] rounded-2xl ">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 p-2">
          <TransactionCard />
          <TransactionCard />
          <TransactionCard />
          <TransactionCard />
          <TransactionCard />
          <TransactionCard />
          <TransactionCard />
          <TransactionCard />
          <TransactionCard />
          <TransactionCard />
          <TransactionCard />
          <TransactionCard />
          <TransactionCard />
          <TransactionCard />
          <TransactionCard />
          <TransactionCard />
          <TransactionCard />
          <TransactionCard />
          <TransactionCard />
          <TransactionCard />
          <TransactionCard />
          <TransactionCard />
          <TransactionCard />
          <TransactionCard />
          <TransactionCard />
          <TransactionCard />
          <TransactionCard />
          <TransactionCard />
          <TransactionCard />
        </div>
      </section>


      {/* <form onSubmit={handleCreateTransaction}>
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
      </form> */}
        {/* {
          transactions.map(transaction => {
            return (
              <li key={transaction.id}>{transaction.name}</li>
            )
          })
        } */}

    </main>
  )
}