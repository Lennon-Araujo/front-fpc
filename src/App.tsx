import { Categories } from "./components/Categories"
import { Header } from "./components/Header"
import { Transactions } from "./components/Transactions"

function App() {

  return (
    <>
    <div className="w-screen h-screen">
      <div className="lg:container mx-auto flex flex-col items-center bg-slate-500">
        <Header />
        <Categories />
        <Transactions />
      </div>
    </div>
    </>
  )
}

export default App
