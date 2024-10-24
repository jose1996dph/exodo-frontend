import { CreateInvoice } from '../domains/invoice.domain'
import { IInvoiceRepository, makeInvoiceRepository } from '../repositories/invoice.repository'

class InvoiceService {
  private invoiceRepo: IInvoiceRepository = makeInvoiceRepository()

  async getAll(
    pageNum: number,
    search: string,
    customerId?: number,
    orderBy?: string,
    orderDirection?: string,
  ) {
    try {
      const pageSize = 10
      const invoices = await this.invoiceRepo.getAll(
        pageSize,
        pageNum - 1,
        search,
        customerId,
        orderBy,
        orderDirection,
      )
      return invoices
    } catch ({ response: { data } }: any) {
      console.error(data)
      throw data
    }
  }

  async getById(id: number) {
    try {
      const invoice = await this.invoiceRepo.getById(id)
      return invoice
    } catch ({ response: { data } }: any) {
      console.error(data)
      throw data
    }
  }

  async create(createUser: CreateInvoice) {
    try {
      const invoice = await this.invoiceRepo.createInvoice(createUser)
      return invoice
    } catch ({ response: { data } }: any) {
      console.error(data)
      throw data
    }
  }

  async toggleStatus(id: number) {
    try {
      const invoice = await this.invoiceRepo.toggleStatus(id)
      return invoice
    } catch ({ response: { data } }: any) {
      console.error(data)
      throw data
    }
  }

  async delete(id: number) {
    try {
      await this.invoiceRepo.deleteInvoice(id)
      return true
    } catch ({ response: { data } }: any) {
      console.error(data)
      throw data
    }
  }
}

export const makeInvoiceService = (): InvoiceService => new InvoiceService()
