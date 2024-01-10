import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { api } from '../helpers/axios';
import { jwtDecode } from 'jwt-decode';

interface Jwt {
  exp?: number;
}

interface PrivateRouteProps {
  children: React.ReactNode;
  redirectTo: string;
}

export function PrivateRoute({ children, redirectTo }: PrivateRouteProps) {
  const [isValid, setIsValid] = useState<boolean | null>(null);

  
  useEffect(() => {
    const checkTokenValidity = async () => {
      const accessToken = localStorage.getItem('token');
      
      if (!accessToken) {
        setIsValid(false);
        return;
      }
      
      try {
        const decodedToken: Jwt = jwtDecode(accessToken);
        
        const currentTimestamp = Math.floor(Date.now() / 1000);
        if (decodedToken.exp && decodedToken.exp < currentTimestamp) {
          const newAccessToken = await getNewAccessToken();
          localStorage.setItem('token', newAccessToken);
          setIsValid(true);
        } else {
          setIsValid(true);
        }
      } catch (error) {
        console.error('Erro ao decodificar o token:', error);
        setIsValid(false);
      }
    };

    checkTokenValidity();
  }, [redirectTo]);

  if (isValid === null) {
    // Pode exibir um carregando ou algo enquanto a verificação está em andamento
    return null;
  }

  return isValid ? (<>{children}</>) : <Navigate to={redirectTo} />;
}

async function getNewAccessToken(): Promise<string> {
  try {
    const response = await api.post('/refresh-token', {}, {headers: {"Content-Type": "application/json"}, withCredentials: true});
    
    if (response.data && response.data.token) {
      return response.data.token;
    } else {
      throw new Error('Resposta inválida ao solicitar novo token de acesso');
    }
  } catch (error) {
    console.error('Erro ao solicitar novo token de acesso:', error);
    // Trate o erro de forma adequada para o seu caso de uso, se necessário
    throw error;
  }
}
