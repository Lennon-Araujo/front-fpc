import { FormEvent, useEffect, useState } from "react";
import { api } from "../helpers/axios"
import { Link, useNavigate } from "react-router-dom";
import * as myToast from '../helpers/toast';
import { AxiosError } from "axios";
import { Eye, EyeSlash } from "phosphor-react";

interface SignInFormData {
  email: string;
  password: string;
}

export function SignIn() {
  const navigate  = useNavigate();
  const [signInFormData, setSignInFormData] = useState<SignInFormData>({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  
  const [submitDisabled, setSubmitDisabled] = useState(true)  

  useEffect(() => {
    setSubmitDisabled(!signInFormData.email || !signInFormData.password)
  }, [signInFormData])

  async function handleSignIn(event: FormEvent) {
    event.preventDefault()
    const payload = {
      ...signInFormData
    }
    const loading = myToast.loading()
    setSubmitDisabled(true)

    try {
      const response = await api.post('/sessions', payload, {headers: {"Content-Type": "application/json"}, withCredentials: true})
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('refreshToken', response.data.refreshToken)
      myToast.updateSuccessToast(loading as number)
      navigate('/dashboard', { replace: true })        
    } catch (err) {
      if (err instanceof AxiosError) {
        setSubmitDisabled(false)
        myToast.updateErrorToast(loading as number, err.response?.data.message)
      }
    }    

  }

  return (
    <>
      <div className="px-2 sm:px-5 h-full w-full flex flex-col justify-center items-center overflow-y-scroll">
        <form onSubmit={handleSignIn} className="flex flex-col w-full py-14 max-w-sm md gap-3">
          <div className="w-full p-0.5 flex flex-col gap-1">
            <label htmlFor="email" className="text-primary">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="johndoe@email.com"
              className={`
                p-3
                text-left
                rounded
                w-full
                h-10
                text-secondary
                font-sans
                truncate
                shadow-sm
                placeholder:text-primary/30
              `}
              value={signInFormData.email}
              onChange={(event) => setSignInFormData((prevState) => ({...prevState, email: event.target.value}))}
            />
          </div>

          <div className="w-full p-0.5 flex flex-col gap-1">
            <label htmlFor="password" className="text-primary">Senha</label>
            <div className="flex justify-between items-center shadow-sm bg-white rounded">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="********"
                className={`
                  p-3
                  text-left
                  rounded
                  w-full
                  h-10
                  text-secondary
                  font-sans
                  truncate
                  placeholder:text-primary/30
                `}
                value={signInFormData.password}
                onChange={(event) => setSignInFormData((prevState) => ({...prevState, password: event.target.value}))}
              />
              <div className="p-2 text-secondary" onClick={() => setShowPassword(!showPassword)}>
                { showPassword ? <Eye size={24} /> : <EyeSlash size={24} />}
              </div>
            </div>
          </div>

          <Link className="text-primary text-center text-xs md:text-sm underline" to={'/forgot-password'}>Esqueceu a senha?</Link>

          <button
            type="submit"
            disabled={submitDisabled}
            className="
              w-full
              p-3
              mt-7
              rounded
              bg-secondary
              text-primary
              font-sans font-semibold
              text-lg
              hover:bg-secondary/80
              hover:text-primary/80
              transition
              disabled:bg-secondary/90
              disabled:text-primary/80
              disabled:cursor-not-allowed
            "
          >
            Entrar
          </button>
        </form>
        
        <Link className="text-primary text-sm md:text-base underline" to={'/signup'}>Não possui conta? Registre-se</Link>

      </div>
    </>
  )
}