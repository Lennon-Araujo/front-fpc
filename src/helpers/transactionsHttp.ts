import { api } from './axios'
import { TransactionsFormData } from '../components/TransactionModal'
import { error } from './toast'
import { httpHeadersFactory } from '../factory/http.factory'

export class TransactionsHttpHelper {
  static async getAll() {
    try {
      const response = await api.get('/transactions', { headers: httpHeadersFactory() })
      return response
    } catch (err) {
    error("Erro: Busca de transações")
      throw new Error()
    }
  }

  static async createTransaction(payload: TransactionsFormData) {
    try {
      return await api.post('/transactions', payload, { headers: httpHeadersFactory() })
    } catch (err) {
    error("Erro: Busca de transações")
      throw new Error()
    }
  }

  static async updateTransaction(id: number, payload: TransactionsFormData) {
    try {
      return await api.patch(`/transactions/${id}`, payload, { headers: httpHeadersFactory() })
    } catch (err) {
    error("Erro: Busca de transações")
      throw new Error()
    }
  }

  static async delete(id: number) {
    try {
      return await api.delete(`/transactions/${id}`, { headers: httpHeadersFactory() })
    } catch (err) {
    error("Erro: Busca de transações")
      throw new Error()
    }
  }
}