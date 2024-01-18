import { Lock, LockOpen } from "phosphor-react";
import { FormEvent, useEffect, useState } from "react";
import { api } from "../helpers/axios";
import { httpHeadersFactory } from "../factory/http.factory";
import * as myToast from '../helpers/toast';
import { AxiosError } from "axios";



export function ShareControl() {
  const [emailToShare, setEmailToShare] = useState("")
  const [isDisabled, setIsDisabled] = useState(false)

  useEffect(() => {
    const usersSharingWith = async () => {
      const usersSharingWith = await getUserSharingWith()
      if(usersSharingWith.data) {
        setEmailToShare(usersSharingWith.data[0].email)
        setIsDisabled(true)
      }
    }

    usersSharingWith()
  }, [])

  async function getUserSharingWith() {
    return await api.get('/users/share-control', {headers: { ...httpHeadersFactory(),"Content-Type": "application/json"}, withCredentials: true})
  }

  async function handleShareControl(event: FormEvent) {
    event.preventDefault()
    const loading = myToast.loading()
    setIsDisabled(true)
    try {
      const payload = {email: emailToShare}
      await api.post('/users/share-control', payload, {headers: { ...httpHeadersFactory(),"Content-Type": "application/json"}, withCredentials: true})
      myToast.updateSuccessToast(loading as number)
    } catch (error) {
      if (error instanceof AxiosError) {
        setIsDisabled(false)
        myToast.updateErrorToast(loading as number, "Ocorreu um erro, verifique o e-mail digitado e tente novamente!")
      }
    }
  }
  return (
    <div className="w-auto max-w-[80vw] p-5 mt-5 flex flex-col justify-center items-center gap-3 bg-primary rounded-2xl">
      <div className="flex justify-center items-center gap-3">
        <h1 className="font-mono text-lg text-secondary">Share Control</h1>
      </div>
      <p className="max-w-fit peer-hover:hidden text-center text-sm font-mono text-secondary transition duration-300">
        Here you can control who you share transactions with.
      </p>
      <form onSubmit={handleShareControl} method="post" className="flex justify-between items-center gap-2">
        <div className="w-auto p-0.5 flex flex-col gap-1">
          <label htmlFor="email" className="hidden">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="johndoe@email.com"
            className={`
              p-3
              text-left
              rounded
              h-10
              text-secondary
              font-sans
              truncate
              placeholder:text-primary/30
            `}
            value={emailToShare}
            onChange={(event) => setEmailToShare(event.target.value)}
            disabled={isDisabled}
          />
        </div>
        <button
          type="submit" 
          className="
          bg-secondary
          rounded-full
          w-10
          h-10
          text-5xl
          text-primary
          hover:bg-secondary/60
          hover:text-primary/80
          transition
          disabled:bg-secondary/60
          disabled:text-primary/80
          disabled:cursor-not-allowed"
          disabled={isDisabled}
        >
          <div className="flex justify-center items-center" >
            {
              isDisabled
              ? <Lock size={24} weight="bold" />
              : <LockOpen size={24} weight="bold" />
            }
          </div>
        </button>
      </form>
    </div>
  )
}