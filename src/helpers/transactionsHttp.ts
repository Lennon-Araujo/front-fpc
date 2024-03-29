import { api } from './axios'
import { error } from './toast'
import { httpHeadersFactory } from '../factory/http.factory'
import { TransactionsFormData } from '../components/TransactionModalSteps/ModalBody'

export class TransactionsHttpHelper {
  static async getAll(filter: Date | null) {
    let query = ""

    if(filter) {
      filter.setDate(1)
      filter.setHours(0,0,0,0)
      const to = new Date(filter)
      to.setMonth(filter.getMonth() + 1)      
      query += `?from=${filter.toISOString()}&to=${to.toISOString()}` 
    }

      const response = await api.get(`/transactions${query}`, { headers: httpHeadersFactory() })
      return response
  }

  static async createTransaction(payload: TransactionsFormData) {
    try {
      return await api.post('/transactions', payload, { headers: httpHeadersFactory() })
    } catch (err) {
    error("Erro: Na criação de transações")
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