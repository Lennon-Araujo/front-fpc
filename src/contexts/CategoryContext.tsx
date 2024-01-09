import { ReactNode, createContext, useEffect, useState } from "react";
import { api } from "../helpers/axios";
import { httpHeadersFactory } from "../factory/http.factory";

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
    const { data } = await api.get('/category', { headers: httpHeadersFactory() })

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
      const response = await api.post('/category', payload, { headers: httpHeadersFactory() })
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