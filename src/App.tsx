import { ToastContainer } from "react-toastify"
import { Categories } from "./components/Categories"
import { Header } from "./components/Header"
import { Transactions } from "./components/Transactions"
import { CategoryContextProvider } from "./contexts/CategoryContext"

function App() {

  return (
    <>
      <ToastContainer />
      <div className="w-screen h-auto pb-7 bg-basic">
        <div className="container mx-auto flex flex-col items-center">
          <Header />
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
