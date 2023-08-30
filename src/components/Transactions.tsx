// import axios from "axios";
// import DatePicker from 'react-date-picker';
// import { FormEvent, useEffect, useState } from "react";

import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { Pencil, Plus, Trash, Users } from 'phosphor-react';

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
    <main className="w-11/12 md:w-4/5 p-4 mt-7 flex flex-col gap-5 bg-primary rounded-2xl">
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
      <section className="overflow-x-auto bg-basic w-full h-auto max-h-56 rounded-2xl">
        <div className="flex flex-wrap gap-2 p-2">
          <div className="flex gap-3 p-3 bg-primary w-56 h-auto rounded-2xl">
            <div className="w-2/3 flex flex-col gap-1 text-left">
              <span className="text-sm text-basic mb-1">Supermercado</span>
              <p className="text-xs text-basic">Alimentação</p>
              <p className="text-xs text-basic">Em: 11/08/2023</p>
            </div>
            <div className="w-full text-right flex flex-col gap-1">
              <div className="text-xs text-basic flex justify-end gap-2">
                <Pencil size={20} />
                <Trash size={20} />
              </div>
              <div className="text-xs text-primary flex justify-end">
                <span className="w-fit  bg-secondary rounded-full p-0.5">
                  <Users size={20} />
                </span>
              </div>
              <p className="text-sm text-basic">R$ 123,45</p>
            </div>
          </div>
          <div className="flex gap-3 p-3 bg-primary w-56 h-auto rounded-2xl">
            <div className="w-2/3 flex flex-col gap-1 text-left">
              <span className="text-sm text-basic mb-1">Supermercado</span>
              <p className="text-xs text-basic">Alimentação</p>
              <p className="text-xs text-basic">Em: 11/08/2023</p>
            </div>
            <div className="w-full text-right flex flex-col gap-1">
              <div className="text-xs text-basic flex justify-end gap-2">
                <Pencil size={20} />
                <Trash size={20} />
              </div>
              <div className="text-xs text-primary flex justify-end">
                <span className="w-fit  bg-secondary rounded-full p-0.5">
                  <Users size={20} />
                </span>
              </div>
              <p className="text-sm text-basic">R$ 123,45</p>
            </div>
          </div>
        </div>
        
        {/* <table className="rounded-2xl overflow-hidden w-full border-spacing-y-2">
          <caption className="h-8 pt-1 caption-bottom text-zinc-50 text-xs font-sans font-light rounded-b-3xl bg-basic/20 border-secondary border-t">
            <CheckCircle size={20} className="p-0.5 mb-0.5 mr-0.5 inline-block text-secondary" />
            indica que o custo é compartilhado.
          </caption>
          <thead className="bg-secondary h-12">
            <tr className=''>
              <th className="text-primary font-sans font-normal py-4 px-4 text-left">Transação</th>
              <th className="text-primary font-sans font-normal py-4 px-4 text-left">Custo</th> 
              <th className="text-primary font-sans font-normal py-4 px-4 text-left">Categoria</th>
              <th className="text-primary font-sans font-normal py-4 px-4 text-left">Data</th>
              <th className="text-primary font-sans font-normal py-4 px-4 text-left">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-basic p-10">
            <tr className="bg-primary/80">
              <td className="text-basic font-sans font-light py-4 px-4">
                Sempre Aki
                <CheckCircle alt='Indica que o custo é compartilhado' className="text-secondary inline-block ms-1 mb-0.5" />
              </td>
              <td className="text-basic font-sans font-light py-4 px-4">R$ 78,90</td>
              <td className="text-basic font-sans font-light py-4 px-4">Alimentação</td>
              <td className="text-basic font-sans font-light py-4 px-4">11/08/2023</td>
              <td className="text-basic font-sans font-light py-4 px-4">Ações</td>
            </tr>

            <tr className="bg-primary/80">
              <td className="text-basic font-sans font-light py-4 px-4">Luz</td>
              <td className="text-basic font-sans font-light py-4 px-4">R$ 168,90</td>
              <td className="text-basic font-sans font-light py-4 px-4">Moradia</td>
              <td className="text-basic font-sans font-light py-4 px-4">11/08/2023</td>
              <td className="text-basic font-sans font-light py-4 px-4">Ações</td>
            </tr>

            <tr className="bg-primary/80">
              <td className="text-basic font-sans font-light py-4 px-4">Fifa 23</td>
              <td className="text-basic font-sans font-light py-4 px-4">R$ 600,00</td>
              <td className="text-basic font-sans font-light py-4 px-4">Lazer</td>
              <td className="text-basic font-sans font-light py-4 px-4">11/08/2023</td>
              <td className="text-basic font-sans font-light py-4 px-4">
                Ações
              </td>
            </tr>
          </tbody>
        </table> */}
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