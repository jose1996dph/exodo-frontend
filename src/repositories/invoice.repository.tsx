import { InvoiceItem, CreateInvoice, InvoiceDetail } from '../domains/invoice.domain'
import api from '../framework/api'
import { BackendURL } from '../config'
import { formatUrlText } from '../framework/helpers/formatter.helper'

export interface IInvoiceRepository {
  getAll(
    pageSize: number,
    pageNum: number,
    search: string,
    orderBy?: string,
    orderDirection?: string,
  ): Promise<[InvoiceItem[], number]>

  getById(id: number): Promise<InvoiceDetail>

  createInvoice(createInvoice: CreateInvoice): Promise<InvoiceItem>

  toggleStatus(id: number): Promise<InvoiceItem>

  deleteInvoice(id: number): void
}

class InvoiceRepository implements IInvoiceRepository {
  async getAll(
    pageSize: number,
    pageNum: number,
    search: string,
    orderBy?: string,
    orderDirection?: string,
  ): Promise<[InvoiceItem[], number]> {
    let params = `pageSize=${pageSize}&pageNum=${pageNum}&search=${formatUrlText(search)}`

    if (orderBy) {
      params += `&orderBy=${orderBy}`
    }

    if (orderDirection) {
      params += `&orderDirection=${orderDirection}`
    }

    const { data } = await api.get(`${BackendURL}invoices/?${params}`)

    const [invoices, count] = data

    let _count: number = (count / pageSize) >> 0

    if (count % pageSize > 0) {
      _count += 1
    }

    return [invoices as InvoiceItem[], _count]
  }

  async getById(id: number): Promise<InvoiceDetail> {
    const { data } = await api.get(`${BackendURL}invoices/${id}`)

    return data as InvoiceDetail
  }

  async createInvoice(createInvoice: CreateInvoice): Promise<InvoiceItem> {
    const { data } = await api.post(`${BackendURL}invoices/`, createInvoice)

    return data as InvoiceItem
  }

  async toggleStatus(id: number): Promise<InvoiceItem> {
    const { data } = await api.patch(`${BackendURL}invoices/${id}/status`)

    return data as InvoiceItem
  }

  async deleteInvoice(id: number) {
    await api.delete(`${BackendURL}invoices/${id}`)
  }
}

export const makeInvoiceRepository = (): IInvoiceRepository => {
  return new InvoiceRepository()
}
