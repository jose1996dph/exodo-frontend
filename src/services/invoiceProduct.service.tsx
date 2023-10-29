import { CreateInvoiceProduct, UpdateInvoiceProduct } from '../domains/invoiceProduct.domain'
import {
  IInvoiceProductRepository,
  makeInvoiceProductRepository,
} from '../repositories/invoiceProduct.repository'

class InvoiceProductService {
  private invoiceProductRepo: IInvoiceProductRepository = makeInvoiceProductRepository()

  async getAll(
    id: number,
    pageNum: number,
    search: string,
    orderBy?: string,
    orderDirection?: string,
  ) {
    try {
      const pageSize = 10
      const invoices = await this.invoiceProductRepo.getAllInvoiceProduct(
        id,
        pageSize,
        pageNum - 1,
        search,
        orderBy,
        orderDirection,
      )
      return invoices
    } catch ({ response: { data } }: any) {
      console.error(data)
      throw data
    }
  }

  async create(id: number, createInvoiceProduct: CreateInvoiceProduct) {
    try {
      const invoice = await this.invoiceProductRepo.createInvoiceProduct(id, createInvoiceProduct)
      return invoice
    } catch ({ response: { data } }: any) {
      console.error(data)
      throw data
    }
  }

  async update(id: number, productId: number, updateInvoiceProduct: UpdateInvoiceProduct) {
    try {
      const invoice = await this.invoiceProductRepo.updateSupplieProduct(
        id,
        productId,
        updateInvoiceProduct,
      )
      return invoice
    } catch ({ response: { data } }: any) {
      console.error(data)
      throw data
    }
  }

  async delete(id: number, productId: number) {
    try {
      await this.invoiceProductRepo.deleteInvoiceProduct(id, productId)
      return true
    } catch ({ response: { data } }: any) {
      console.error(data)
      throw data
    }
  }
}

export const makeInvoiceProductService = (): InvoiceProductService => new InvoiceProductService()
