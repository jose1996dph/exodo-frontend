import { CreatePayment } from '../domains/payment.domain'
import { IPaymentRepository, makePaymentRepository } from '../repositories/payment.repository'

class PaymentService {
  private paymentRepo: IPaymentRepository = makePaymentRepository()

  async getAll(
    invoiceId: number,
    pageNum: number,
    search: string,
    orderBy?: string,
    orderDirection?: string,
  ) {
    try {
      const pageSize = 10
      const payments = await this.paymentRepo.getAll(
        invoiceId,
        pageSize,
        pageNum - 1,
        search,
        orderBy,
        orderDirection,
      )
      return payments
    } catch ({ response: { data } }: any) {
      console.error(data)
      throw data
    }
  }

  async create(invoiceId: number, createUser: CreatePayment) {
    try {
      const payment = await this.paymentRepo.createPayment(invoiceId, createUser)
      return payment
    } catch ({ response: { data } }: any) {
      console.error(data)
      throw data
    }
  }
}

export const makePaymentService = (): PaymentService => new PaymentService()
