import axios from "axios";
import { ReactNode, createContext, useEffect, useState } from "react";

interface CategoryContextType {
  categories: Category[]
}

interface Category {
  id: number;
  name: string;
  created_at: string;
}

type CategoryContextPropsType = {
  children: ReactNode;
}

export const CategoryContext = createContext({} as CategoryContextType);

export function CategoryContextProvider({ children }: CategoryContextPropsType) {
  const [categories, setCategories] = useState<Category[]>([])


  async function populateCategories() {
    const { data } = await axios.get('http://localhost:3000/category')
    if(data.length > 0) {
      setCategories([...data])
    }
  }

  useEffect(() => {
    populateCategories()
  }, [])

  console.log(categories);
  

  // async function handleCreateCategory() {
  //   // TODO implementar lógica
  //   const payload = {
  //     name: 'Trazer'
  //   }
  //   const response = await axios.post('http://localhost:3000/category', payload)
  //   if(response.status === 201) {
  //     populateCategories()
  //   }
  // }

  return (
    <CategoryContext.Provider
      value={{
        categories
      }}
    >
      { children }
    </CategoryContext.Provider>
  )
}