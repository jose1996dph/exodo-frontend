import api from '../framework/api'
import { BackendURL } from '../config'
import { Balance } from '../domains/balance.domain'
import { TopProduct } from '../domains/topProduct.domain'
import { TopSeller } from '../domains/topSeller.domain'

export interface IIndicatorRepository {
  getBalances(): Promise<Balance[]>
  getBalance(): Promise<Balance>
  getTopProducts(): Promise<TopProduct[]>
  getTopSellers(): Promise<TopSeller[]>
}

class IndicatorRepository implements IIndicatorRepository {
  async getBalances(): Promise<Balance[]> {
    const { data } = await api.get(`${BackendURL}indicator/balances`)

    return data.map((i: any) => {
      return {
        total: i.total,
        time: new Date(i.time),
      }
    }) as Balance[]
  }

  async getBalance(): Promise<Balance> {
    const { data } = await api.get(`${BackendURL}indicator/balance`)

    return {
      total: data.total,
      time: new Date(data.time),
    } as Balance
  }

  async getTopProducts(): Promise<TopProduct[]> {
    const { data } = await api.get(`${BackendURL}indicator/topProducts`)

    return data as TopProduct[]
  }

  async getTopSellers(): Promise<TopSeller[]> {
    const { data } = await api.get(`${BackendURL}indicator/topSellers`)

    return data as TopSeller[]
  }
}

export const makeIndicatorRepository = (): IIndicatorRepository => {
  return new IndicatorRepository()
}
