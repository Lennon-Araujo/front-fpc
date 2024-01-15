import { ToastContainer } from "react-toastify"
import { Header } from "./components/Header"
import { AppRouter } from "./routes/routes";
import { BrowserRouter } from "react-router-dom";

function App() {

  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <div className="w-screen h-auto pb-7 bg-basic">
          <div className="container mx-auto flex flex-col items-center">
            <Header />
              <AppRouter />
          </div>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
