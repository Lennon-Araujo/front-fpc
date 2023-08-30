import { Categories } from "./components/Categories"
import { Header } from "./components/Header"
import { Transactions } from "./components/Transactions"

function App() {

  return (
    <>
    <div className="w-screen h-auto pb-7 bg-basic">
      <div className="container mx-auto flex flex-col items-center">
        <Header />
        <div className="container mx-auto flex flex-col items-center gap-3 mt-3">
          <Categories />
          <Transactions />
        </div>
      </div>
    </div>
    </>
  )
}

export default App
