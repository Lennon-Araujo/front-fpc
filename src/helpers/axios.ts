import axios from "axios";

export const api = axios.create({
  baseURL: 'https://finance-personal-control.onrender.com'
})