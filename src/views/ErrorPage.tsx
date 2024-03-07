
import errorpage from "../assets/errorpage.svg"

export function ErrorPage() {


  return (
    <div>
      <a className="w-auto p-10 mt-5 flex flex-col bg-primary rounded-2xl" href="/">
        <h1 className="text-center font-mono text-lg text-secondary">Ops, acontece algo errado.</h1>
        <p className="text-center font-mono text-md underline text-secondary">Por favor volte para um ambiente seguro!</p>
      <img src={errorpage} alt="a person crossing their arms in an X" />
      </a>
    </div>
  )
}