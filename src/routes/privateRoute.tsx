import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getNewAccessToken } from '../helpers/getNewAccessToken';
import { CircleNotch } from 'phosphor-react';

interface PrivateRouteProps {
  children: React.ReactNode;
  redirectTo: string;
}

export function PrivateRoute({ children, redirectTo }: PrivateRouteProps) {
  const [isValid, setIsValid] = useState<boolean | null>(null);

  useEffect(() => {
    async function setNewAccessToken() {
      const newAccessToken = await getNewAccessToken()

      if(newAccessToken === "Error") {
        setIsValid(false)
      } else {
        localStorage.setItem("token", newAccessToken)
        setIsValid(true)
      }
    }

    setNewAccessToken()
  }, []);

  if (isValid === null) {
    return (
    <div className="flex flex-col justify-center items-center text-primary p-20 text-lg h-max">
      <CircleNotch className='animate-spin' size={40} />
      Carregando
    </div>
    )
  }

  return isValid ? (<>{children}</>) : <Navigate to={redirectTo} />;
}
