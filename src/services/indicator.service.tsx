import { IIndicatorRepository, makeIndicatorRepository } from '../repositories/indicator.repository'

class IndicatorService {
  private indicatorRepo: IIndicatorRepository = makeIndicatorRepository()

  async getBalances() {
    return await this.indicatorRepo.getBalances()
  }

  async getBalance() {
    return await this.indicatorRepo.getBalance()
  }

  async getTopProducts() {
    return await this.indicatorRepo.getTopProducts()
  }

  async getTopSellers() {
    return await this.indicatorRepo.getTopSellers()
  }
}

export const makeIndicatorService = (): IndicatorService => new IndicatorService()
