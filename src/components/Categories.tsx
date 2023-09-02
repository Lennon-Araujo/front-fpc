import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { CategoryContext } from "../contexts/CategoryContext";
import * as toast from "../helpers/toast";

import 'react-toastify/dist/ReactToastify.css';

export function Categories() {
  const [categoryFormName, setCategoryFormName] = useState('')

  const { onCreateCategory } = useContext(CategoryContext)

  function handleCategoryFormName(event: ChangeEvent<HTMLInputElement>) {
    setCategoryFormName(event.target.value)
  }

  async function handleCreateCategory(event: FormEvent) {
    event.preventDefault()
    const response = await onCreateCategory(categoryFormName)
    if(response === 201) {
      setCategoryFormName('')
      toast.success("Categoria criada com sucesso!")
    } else {
      toast.error("Ocorreu um erro no processo.")
      console.log(response)
    }
  }

  return (
    <div className="w-11/12 p-4 flex flex-col sm:flex-row gap-5 sm:gap-2 items-start justify-between bg-primary rounded-2xl"> 
      <h1 className="text-center font-serif text-3xl text-secondary w-fit">Nova Categoria</h1>
      <form onSubmit={handleCreateCategory} className="flex flex-1 gap-4 items-center justify-start sm:justify-end">
        <input
          className="w-auto border-none rounded p-2 bg-basic text-primary"
          type="text"
          name="Category"
          id="Category"
          placeholder="Ex: Moradia"
          value={categoryFormName} onChange={handleCategoryFormName}
        />

        <button
          type="submit"
          disabled={!categoryFormName}
          className="h-10 bg-secondary py-2 px-5 rounded font-serif text-2xl text-primary flex items-center hover:bg-secondary/80 hover:text-primary/80 transition disabled:bg-secondary/80 disabled:text-primary/80 disabled:cursor-not-allowed"
        >
          Criar
        </button>
      </form>
    </div>
  )
}