import { Categories } from "./components/Categories"
import { Header } from "./components/Header"
import { Transactions } from "./components/Transactions"

function App() {

  return (
    <>
    <div className="flex flex-col">
      <Header />
      <Categories />
      <Transactions />
    </div>
    </>
  )
}

export default App
