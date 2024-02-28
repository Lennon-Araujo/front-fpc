import { jwtDecode } from "jwt-decode";

export interface Jwt {
  exp?: number;
}

export function checkAuth() {
  const accessToken = localStorage.getItem('refreshToken');
  
  if (!accessToken) {
    return false;
  }
  
  const decodedToken: Jwt = jwtDecode(accessToken);
  
  const currentTimestamp = Math.floor(Date.now() / 1000);
  if (decodedToken.exp && decodedToken.exp < currentTimestamp) {
    localStorage.removeItem('refreshToken')
    return false
  } else {
    return true
  }
}