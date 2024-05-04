import { bcvDollar } from '../framework/bcv'

export interface IDollarRepository {
  getValueInBolivars(): Promise<number>
}

class DollarRepository implements IDollarRepository {
  async getValueInBolivars(): Promise<number> {
    const data = await bcvDollar()

    return data
  }
}

export const makeDollarRepository = (): IDollarRepository => {
  return new DollarRepository()
}
