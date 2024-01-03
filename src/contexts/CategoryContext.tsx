import { ReactNode, createContext, useEffect, useState } from "react";
import { api } from "../helpers/axios";

interface CategoryContextType {
  categories: Category[];
  onCreateCategory: (categoryName: string) => Promise<unknown>;
}

interface Category {
  id: string;
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
    const { data } = await api.get('/category')
    
    if(data.length > 0) {
      setCategories([...data])
    }
  }

  useEffect(() => {
    populateCategories()
  }, [])
  

  async function onCreateCategory(categoryName: string) {
    const payload = {
      name: categoryName
    }
    try {
      const response = await api.post('/category', payload)
      if(response.status === 201) {
        populateCategories()
        return response.status
      }
    } catch (error) {
      return error;
    }
  }

  return (
    <CategoryContext.Provider
      value={{
        categories,
        onCreateCategory
      }}
    >
      { children }
    </CategoryContext.Provider>
  )
}