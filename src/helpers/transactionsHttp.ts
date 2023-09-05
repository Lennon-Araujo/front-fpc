import { api } from './axios'
import { TransactionsFormData } from '../components/CreateTransactionModal'
import { error } from './toast'

export class TransactionsHttpHelper {
  static async getAll() {
    try {
      const response = await api.get('/transactions')
      return response
    } catch (err) {
    error("Erro: Busca de transações")
      throw new Error()
    }
  }

  static createTransaction(payload: TransactionsFormData) {
    return new Promise((resolve, reject) => {
      api.post('/transactions', payload)
      .then(resolve)
      .catch(reject)
    })
  }

  static async delete(id: number) {
    try {
      return await api.delete(`/transactions/${id}`)
    } catch (err) {
    error("Erro: Busca de transações")
      throw new Error()
    }
  }
}