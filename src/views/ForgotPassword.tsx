import { FormEvent, useEffect, useState } from "react";
import { api } from "../helpers/axios"
import * as myToast from '../helpers/toast';
import { AxiosError } from "axios";

interface ForgotPasswordFormData {
  email: string;
}

export function ForgotPassword() {
  const [forgotPasswordFormData, setForgotPasswordFormData] = useState<ForgotPasswordFormData>({
    email: '',
  })
  const [submitDisabled, setSubmitDisabled] = useState(true)  

  useEffect(() => {
    setSubmitDisabled(!forgotPasswordFormData.email)
  }, [forgotPasswordFormData])

  async function handleForgotPassword(event: FormEvent) {
    event.preventDefault()
    const payload = {
      ...forgotPasswordFormData,
    }
    const loading = myToast.loading()
    const toastTimeInMs = 3000
    setSubmitDisabled(true)

    try {
      const response = await api.post('/forgot-password', payload)
      myToast.updateSuccessToast(loading as number, response.data.message, toastTimeInMs)
    } catch (err) {
      if (err instanceof AxiosError) {
        setSubmitDisabled(false)
        if(err.response?.data.message === "Validation error." && err.response?.data.issues.email) {
          myToast.updateErrorToast(loading as number, err.response?.data.issues.email._errors[0], toastTimeInMs) 
        } else {
          myToast.updateErrorToast(loading as number, err.response?.data.message, toastTimeInMs)
        }
      }
    }    

  }

  return (
    <>
      <div className="px-2 sm:px-5 h-full w-full flex flex-col justify-center items-center bg-basic overflow-y-scroll">
        <div className="text-base text-primary/70 text-center mt-10">Informe seu e-mail para recuperar sua senha.</div>
        <form onSubmit={handleForgotPassword} className="flex flex-col w-full py-10 max-w-sm md gap-3">
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
              value={forgotPasswordFormData.email}
              onChange={(event) => setForgotPasswordFormData((prevState) => ({...prevState, email: event.target.value}))}
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
            Recuperar senha
          </button>
        </form>
      </div>
    </>
  )
}