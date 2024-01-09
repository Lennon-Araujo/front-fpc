import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: ReactNode;
  redirectTo: string
}

export function PrivateRoute({children, redirectTo}: PrivateRouteProps) {
  const isAuthenticated = localStorage.getItem("token")
  return isAuthenticated ? children : <Navigate to={redirectTo} />
}