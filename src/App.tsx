import { Categories } from "./components/Categories"
import { Header } from "./components/Header"
import { Transactions } from "./components/Transactions"

function App() {

  return (
    <>
    <div className="w-screen h-screen bg-basic">
      <div className="lg:container mx-auto flex flex-col items-center">
        <Header />
        <Categories />
        <Transactions />
      </div>
    </div>
    </>
  )
}

export default App
