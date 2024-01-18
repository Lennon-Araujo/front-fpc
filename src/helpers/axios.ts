import axios from "axios";

export const api = axios.create({
  // baseURL: 'https://back-fpc.onrender.com'
  baseURL: 'http://localhost:3333'
})