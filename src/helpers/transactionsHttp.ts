import { api } from './axios'
import { TransactionsFormData } from '../components/TransactionModal'
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

  static async createTransaction(payload: TransactionsFormData) {
    try {
      return await api.post('/transactions', payload)
    } catch (err) {
    error("Erro: Busca de transações")
      throw new Error()
    }
  }

  static async updateTransaction(id: number, payload: TransactionsFormData) {
    try {
      return await api.patch(`/transactions/${id}`, payload)
    } catch (err) {
    error("Erro: Busca de transações")
      throw new Error()
    }
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