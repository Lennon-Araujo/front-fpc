import { Gear, SignOut, User } from "phosphor-react";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { api } from "../helpers/axios";
import { httpHeadersFactory } from "../factory/http.factory";
import * as myToast from '../helpers/toast';

export function Header() {
  const [optionsBar, setOptionsBar] = useState(false)
  const navigate = useNavigate()
  const currentUrlPath = useLocation();
  
  useEffect(() => {
    if (currentUrlPath.pathname === '/dashboard') {      
      setOptionsBar(true)
    } else {setOptionsBar(false)}
  }, [currentUrlPath])

  function handleSignIn() {
    navigate('/signin', {replace: true})
  }
  
  async function handleSignOut() {
    const loading = myToast.loading()

    try {
      await api.post('/sessions/logout', {} , { headers: {...httpHeadersFactory(), "Content-Type": "application/json"}, withCredentials: true})
      localStorage.removeItem('token')
      navigate('/signin', { replace: true })
      myToast.updateSuccessToast(loading as number)
    } catch (error) {
      myToast.updateErrorToast(loading as number)
      new Error("Error on logout!")
    }
  }
  return (
    <header className="bg-primary w-full h-28 flex items-center justify-center">
      <div className="bg-primary w-4/5 h-28 flex items-center justify-center">
        <div className="w-1/4">
        </div>
        <div className="h-28 w-2/4 flex flex-col items-center justify-center">
          <div className="text-center font-serif text-6xl text-secondary mt-5">
            <a href="/">
              Finance
            <span className="block text-center font-handwriting text-3xl -mt-5 text-basic">Personal Control</span>
            </a>
          </div>
        </div>
        {
        optionsBar
          ?
        <div className="h-full w-1/4 flex items-center justify-end gap-1">
          <button className="p-1 cursor-pointer">
            <Gear size={24} weight="bold" className="text-secondary" />
          </button>
          <button className="p-1 cursor-pointer" onClick={handleSignOut}>
            <SignOut size={24} weight="bold" className="text-secondary" />
          </button>
        </div>
          :
          <div className="h-full w-1/4 flex items-center justify-end gap-1">
            <button className="p-1 cursor-pointer">
              <User size={24} weight="bold" className="text-secondary" onClick={handleSignIn} />
            </button>
          </div>
          }
      </div>
    </header>
  )
}