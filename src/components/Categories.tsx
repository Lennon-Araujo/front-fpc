import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";

// interface Category {
//   id: number;
//   name: string;
//   created_at: string;
// }

export function Categories() {
  // const [categories, setCategories] = useState<Category[]>([])
  const [categoryFormName, setCategoryFormName] = useState('')

  // async function populateCategories() {
  //   const { data } = await axios.get('http://localhost:3000/category')
  //   if(data.length > 0) {
  //     setCategories([...data])
  //   }
  // }

  // useEffect(() => {
  //   populateCategories()
  // }, [])

  async function handleCreateCategory(event: FormEvent) {
    event.preventDefault()
    const payload = {
      name: categoryFormName
    }
    const response = await axios.post('http://localhost:3000/category', payload)
    if(response.status === 201) {
      // populateCategories()
    }
  }

  function handleCategoryFormName(event: ChangeEvent<HTMLInputElement>) {
    setCategoryFormName(event.target.value)
  }

  return (
    <div className="w-11/12 md:w-4/5 p-7 mt-7 flex flex-col md:flex-row gap-5 md:gap-2 items-center justify-between bg-primary rounded-2xl"> 
      <h1 className="text-center font-serif text-3xl text-secondary">Nova Categoria</h1>
      <form onSubmit={handleCreateCategory} className="flex gap-4 items-center justify-center md:justify-end">
        <input
          className="w-20 min-w-full md:w-40 border-none rounded p-2 bg-basic text-primary"
          type="text"
          name="Category"
          id="Category"
          placeholder="Ex: Moradia"
          value={categoryFormName} onChange={handleCategoryFormName}
        />

        <button
          type="submit"
          className="h-10 bg-secondary py-2 px-5 rounded font-serif text-2xl text-primary flex items-center hover:bg-secondary/80 hover:text-primary/80  transition"
        >
          Criar
        </button>
      </form>
    </div>
  )
}