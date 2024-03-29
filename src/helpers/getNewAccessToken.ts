import { api } from "./axios";

export async function getNewAccessToken(): Promise<string> {
  try {
    const refreshToken = localStorage.getItem("refreshToken")
    if(!refreshToken) {
      return "Error"
    }

    const response = await api.post('/refresh-token', {refreshToken}, {headers: {"Content-Type": "application/json"}, withCredentials: true});
    if (response.data && response.data.token) {
      return response.data.token;
    } else {
      throw new Error('Resposta inválida ao solicitar novo token de acesso');
    }
  } catch (error) {
    console.error('Erro ao solicitar novo token de acesso:', error);
    return "Error"
  }
}