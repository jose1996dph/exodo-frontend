import { PaymentItem, CreatePayment } from '../domains/payment.domain'
import api from '../framework/api'
import { BackendURL } from '../config'
import { formatUrlText } from '../framework/helpers/formatter.helper'

export interface IPaymentRepository {
  getAll(
    invoiceId: number,
    pageSize: number,
    pageNum: number,
    search: string,
    orderBy?: string,
    orderDirection?: string,
  ): Promise<[PaymentItem[], number]>

  createPayment(invoiceId: number, createPayment: CreatePayment): Promise<PaymentItem>
}

class PaymentRepository implements IPaymentRepository {
  async getAll(
    invoiceId: number,
    pageSize: number,
    pageNum: number,
    search: string,
    orderBy?: string,
    orderDirection?: string,
  ): Promise<[PaymentItem[], number]> {
    let params = `pageSize=${pageSize}&pageNum=${pageNum}&search=${formatUrlText(search)}`

    if (orderBy) {
      params += `&orderBy=${orderBy}`
    }

    if (orderDirection) {
      params += `&orderDirection=${orderDirection}`
    }

    const { data } = await api.get(`${BackendURL}invoices/${invoiceId}/payments/?${params}`)

    const [payments, count] = data

    let _count: number = (count / pageSize) >> 0

    if (count % pageSize > 0) {
      _count += 1
    }

    return [payments as PaymentItem[], _count]
  }

  async createPayment(invoiceId: number, createPayment: CreatePayment): Promise<PaymentItem> {
    const { data } = await api.post(
      `${BackendURL}invoices/${invoiceId}/payments/`,
      createPayment.toRequest(),
    )

    return data as PaymentItem
  }
}

export const makePaymentRepository = (): IPaymentRepository => {
  return new PaymentRepository()
}
