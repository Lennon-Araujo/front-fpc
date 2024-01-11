import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getNewAccessToken } from '../helpers/getNewAccessToken';

interface PrivateRouteProps {
  children: React.ReactNode;
  redirectTo: string;
  checkAuth: boolean
}

export function PrivateRoute({ children, redirectTo, checkAuth }: PrivateRouteProps) {
  const [isValid, setIsValid] = useState<boolean | null>(null);

  useEffect(() => {
    if(!checkAuth) {
      setIsValid(false)
    }

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
  }, [checkAuth]);

  if (isValid === null) {
    return null;
  }

  return isValid ? (<>{children}</>) : <Navigate to={redirectTo} />;
}
