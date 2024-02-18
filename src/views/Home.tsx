import { Categories } from "../components/Categories";
import { Transactions } from "../components/Transactions";
import { CategoryContextProvider } from "../contexts/CategoryContext";
import { TransactionContextProvider } from "../contexts/TransactionContext";

export function Home() {
  return (
    <>
      <CategoryContextProvider>
        <TransactionContextProvider>
          <div className="container mx-auto flex flex-col items-center gap-3 mt-3">
            <Categories />
            <Transactions />
          </div>
        </TransactionContextProvider>
      </CategoryContextProvider>
    </>
  )
}