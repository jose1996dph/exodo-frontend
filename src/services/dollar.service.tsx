import { makeDollarRepository, IDollarRepository } from '../repositories/dollar.repository'
import { getDollarPrice, setDollarPrice } from '../framework/helpers/currency.helper'

class DollarService {
  private dollarRepo: IDollarRepository = makeDollarRepository()

  async getValueInBolivars() {
    try {
      const value = await this.dollarRepo.getValueInBolivars()

      setDollarPrice(value)

      return value
    } catch {
      return getDollarPrice()
    }
  }
}

export const makeDollarService = (): DollarService => new DollarService()
