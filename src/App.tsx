import { Categories } from "./components/Categories"
import { CreateTransactionModal } from "./components/CreateTransactionModal"
import { Header } from "./components/Header"
import { Transactions } from "./components/Transactions"
import { CategoryContextProvider } from "./contexts/CategoryContext"

function App() {

  return (
    <>
    <div className="w-screen h-auto pb-7 bg-basic">
      <div className="container mx-auto flex flex-col items-center">
        <Header />
        <CreateTransactionModal />
        <CategoryContextProvider>
          <div className="container mx-auto flex flex-col items-center gap-3 mt-3">
            <Categories />
            <Transactions />
          </div>
        </CategoryContextProvider>
      </div>
    </div>
    </>
  )
}

export default App
