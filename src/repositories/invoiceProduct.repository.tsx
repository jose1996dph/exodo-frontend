import {
  CreateInvoiceProduct,
  InvoiceProductItem,
  UpdateInvoiceProduct,
} from '../domains/invoiceProduct.domain'
import api from '../framework/api'
import { BackendURL } from '../config'
import { formatUrlText } from '../framework/helpers/formatter.helper'

export interface IInvoiceProductRepository {
  getAllInvoiceProduct(
    invoiceId: number,
    pageSize: number,
    pageNum: number,
    search: string,
    orderBy?: string,
    orderDirection?: string,
  ): Promise<[InvoiceProductItem[], number]>

  createInvoiceProduct(
    id: number,
    createInvoiceProduct: CreateInvoiceProduct,
  ): Promise<InvoiceProductItem>

  updateSupplieProduct(
    id: number,
    productId: number,
    updateInvoiceProduct: UpdateInvoiceProduct,
  ): Promise<InvoiceProductItem>

  deleteInvoiceProduct(id: number, productId: number): void
}

class InvoiceProductRepository implements IInvoiceProductRepository {
  async getAllInvoiceProduct(
    id: number,
    pageSize: number,
    pageNum: number,
    search: string,
    orderBy?: string,
    orderDirection?: string,
  ): Promise<[InvoiceProductItem[], number]> {
    let params = `?pageSize=${pageSize}&pageNum=${pageNum}&search=${formatUrlText(search)}`

    if (orderBy) {
      params += `&orderBy=${orderBy}`
    }

    if (orderDirection) {
      params += `&orderDirection=${orderDirection}`
    }

    const { data } = await api.get(`${BackendURL}invoices/${id}/product/${params}`)

    const [product, count] = data

    let _count: number = (count / pageSize) >> 0

    if (count % pageSize > 0) {
      _count += 1
    }

    return [product as InvoiceProductItem[], _count]
  }

  async createInvoiceProduct(
    id: number,
    createInvoiceProduct: CreateInvoiceProduct,
  ): Promise<InvoiceProductItem> {
    const { data } = await api.post(`${BackendURL}invoices/${id}/product`, {
      productId: createInvoiceProduct.productId,
      quantity: createInvoiceProduct.quantity,
    })

    return data as InvoiceProductItem
  }

  async updateSupplieProduct(
    id: number,
    productId: number,
    updateInvoiceProduct: UpdateInvoiceProduct,
  ): Promise<InvoiceProductItem> {
    const { data } = await api.put(`${BackendURL}invoices/${id}/product/${productId}`, {
      productId: updateInvoiceProduct.productId,
      quantity: updateInvoiceProduct.quantity,
    })

    return data as InvoiceProductItem
  }

  async deleteInvoiceProduct(id: number, productId: number) {
    await api.delete(`${BackendURL}invoices/${id}/product/${productId}`)
  }
}

export const makeInvoiceProductRepository = (): IInvoiceProductRepository => {
  return new InvoiceProductRepository()
}
