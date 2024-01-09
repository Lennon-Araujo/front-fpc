import { FormEvent, useEffect, useState } from "react";
import { api } from "../helpers/axios"
import { Link, useNavigate } from "react-router-dom";
import * as myToast from '../helpers/toast';
import { AxiosError } from "axios";

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

export function SignUp() {
  const navigate  = useNavigate();
  const [signUpFormData, setSignUpFormData] = useState<SignUpFormData>({
    name: '',
    email: '',
    password: ''
  })
  
  const [submitDisabled, setSubmitDisabled] = useState(true)  

  useEffect(() => {
    setSubmitDisabled(!signUpFormData.name || !signUpFormData.email || !signUpFormData.password)
  }, [signUpFormData])

  async function handleSignUp(event: FormEvent) {
    event.preventDefault()
    const payload = {
      ...signUpFormData
    }
    const loading = myToast.loading()
    setSubmitDisabled(true)

    try {
      const response = await api.post('/users/register', payload)
      if(response.status === 201) {
        navigate('/signin')
        myToast.updateSuccessToast(loading as number)
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        setSubmitDisabled(false)
        myToast.updateErrorToast(loading as number, err.response?.data.message)
      }
    }    

  }

  return (
    <>
      <div className="px-2 sm:px-5 h-full w-full flex flex-col justify-center items-center bg-basic overflow-y-scroll">
        <form onSubmit={handleSignUp} className="flex flex-col w-full py-14 max-w-sm md gap-3">
        <div className="w-full p-0.5 flex flex-col gap-1">
            <label htmlFor="name" className="text-primary">Name</label>
            <input
              type="name"
              name="name"
              id="name"
              placeholder="John Doe"
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
              value={signUpFormData.name}
              onChange={(event) => setSignUpFormData((prevState) => ({...prevState, name: event.target.value}))}
            />
          </div>

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
                placeholder:text-primary/30
              `}
              value={signUpFormData.email}
              onChange={(event) => setSignUpFormData((prevState) => ({...prevState, email: event.target.value}))}
            />
          </div>

          <div className="w-full p-0.5 flex flex-col gap-1">
            <label htmlFor="password" className="text-primary">Password</label>
            <input
              type="password"
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
              value={signUpFormData.password}
              onChange={(event) => setSignUpFormData((prevState) => ({...prevState, password: event.target.value}))}
            />
          </div>

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
            Sign Up
          </button>
        </form>
        
        <Link className="text-primary text-sm md:text-base underline" to={'/signup'}>Already registered? Sign In.</Link>

      </div>
    </>
  )
}