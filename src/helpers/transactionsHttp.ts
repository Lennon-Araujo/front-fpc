import { api } from './axios'
import { TransactionsFormData } from '../components/CreateTransactionModal'

export class UsersHttpHelper {
  static getAll() {
    return new Promise((resolve, reject) => {
      api.get('/transactions')
      .then(resolve)
      .catch(reject)
    })
  }

  static createTransaction(payload: TransactionsFormData) {
    return new Promise((resolve, reject) => {
      api.post('/transactions', payload)
      .then(resolve)
      .catch(reject)
    })
  }
}