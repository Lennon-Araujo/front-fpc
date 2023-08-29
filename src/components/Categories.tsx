import axios from "axios";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

interface Category {
  id: number;
  name: string;
  created_at: string;
}

export function Categories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [categoryFormName, setCategoryFormName] = useState('')

  async function populateCategories() {
    const { data } = await axios.get('http://localhost:3000/category')
    if(data.length > 0) {
      setCategories([...data])
    }
  }

  useEffect(() => {
    populateCategories()
  }, [])

  async function handleCreateCategory(event: FormEvent) {
    event.preventDefault()
    const payload = {
      name: categoryFormName
    }
    const response = await axios.post('http://localhost:3000/category', payload)
    if(response.status === 201) {
      populateCategories()
    }
  }

  function handleCategoryFormName(event: ChangeEvent<HTMLInputElement>) {
    setCategoryFormName(event.target.value)
  }

  return (
    <>
      <h1 className="text-2xl">Categories</h1>
      <form onSubmit={handleCreateCategory} className="flex gap-2 items-center justify-center">
        <input
          className="w-60 "
          type="text"
          name="Category"
          id="Category"
          placeholder="Digite o nome da categoria"
          value={categoryFormName} onChange={handleCategoryFormName}
        />
        <button type="submit">Criar categoria</button>
      </form>
      <div>
        {
          categories.map(category => {
            return (
              <li key={category.id}>{category.name}</li>
            )
          })
        }
      </div>
    </>
  )
}