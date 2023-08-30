import { Categories } from "./components/Categories"
import { Header } from "./components/Header"
import { TransactionCard } from "./components/TransactionCard"
import { Transactions } from "./components/Transactions"

function App() {

  return (
    <>
    <div className="w-screen h-screen bg-basic">
      <div className="container mx-auto flex flex-col items-center">
        <Header />
        <div className="container mx-auto flex flex-col items-center">
          <Categories />
          <Transactions />
        </div>
      </div>
    </div>
    </>
  )
}

export default App
