import { FormEvent, useEffect, useState } from "react";
import { api } from "../helpers/axios"
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom"
import * as myToast from '../helpers/toast';
import { AxiosError } from "axios";
import { Eye, EyeSlash } from "phosphor-react";

interface ResetPasswordFormData {
  password: string;
  confirmPassword: string;
}

export function ResetPassword() {
  const navigate  = useNavigate();
  const recoveryPasswordToken = useLocation().search.substring(1)
  const [resetPasswordFormData, setResetPasswordFormData] = useState<ResetPasswordFormData>({
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [submitDisabled, setSubmitDisabled] = useState(true)  

  useEffect(() => {
    setSubmitDisabled(!resetPasswordFormData.password || !resetPasswordFormData.confirmPassword || resetPasswordFormData.password !== resetPasswordFormData.confirmPassword)
  }, [resetPasswordFormData])

  async function handleResetPassword(event: FormEvent) {
    event.preventDefault()
    const payload = {
      ...resetPasswordFormData,
      token: recoveryPasswordToken
    }
    const loading = myToast.loading()
    const toastTimeInMs = 5000
    setSubmitDisabled(true)

    try {
      const response = await api.post('/reset-password', payload)
      navigate('/signin')
      myToast.updateSuccessToast(loading as number, response.data.message, toastTimeInMs)
    } catch (err) {
      if (err instanceof AxiosError) {
        setSubmitDisabled(false)
        if(err.response?.data.message === "Validation error." && err.response?.data.issues.password) {
          myToast.updateErrorToast(loading as number, err.response?.data.issues.password._errors[0], toastTimeInMs) 
        } else {
          myToast.updateErrorToast(loading as number, err.response?.data.message, toastTimeInMs)
        }
      }
    }    

  }

  return (
    <>
      <div className="px-2 sm:px-5 h-full w-full flex flex-col justify-center items-center bg-basic overflow-y-scroll">
        <form onSubmit={handleResetPassword} className="flex flex-col w-full py-14 max-w-sm md gap-3">
          <div className="w-full p-0.5 flex flex-col gap-1">
            <label htmlFor="password" className="text-primary">Nova senha</label>
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
                value={resetPasswordFormData.password}
                onChange={(event) => setResetPasswordFormData((prevState) => ({...prevState, password: event.target.value}))}
              />
              <div className="p-2 text-secondary" onClick={() => setShowPassword(!showPassword)}>
                { showPassword ? <Eye size={24} /> : <EyeSlash size={24} />}
              </div>
            </div>
          </div>

          <div className="w-full p-0.5 flex flex-col gap-1">
            <label htmlFor="confirm-password" className="text-primary">Confirme a senha</label>
            <div className="flex justify-between items-center shadow-sm bg-white rounded">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirm-password"
                id="confirm-password"
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
                value={resetPasswordFormData.confirmPassword}
                onChange={(event) => setResetPasswordFormData((prevState) => ({...prevState, confirmPassword: event.target.value}))}
              />
              <div className="p-2 text-secondary" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                { showConfirmPassword ? <Eye size={24} /> : <EyeSlash size={24} />}
              </div>
            </div>
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
            Resetar senha
          </button>
        </form>
      </div>
    </>
  )
}