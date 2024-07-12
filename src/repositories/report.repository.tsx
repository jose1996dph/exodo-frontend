import api from '../framework/api'
import { BackendURL } from '../config'
import { SellerReport } from '../domains/sellerReport.domain'
import { SupplierReport } from '../domains/supplierReport.domain'

export interface IReportRepository {
  getSellerReport(
    pageSize: number,
    pageNum: number,
    search: string,
    orderBy?: string,
    orderDirection?: string,
    startDate?: Date,
    endDate?: Date,
  ): Promise<[SellerReport[], number]>
  getSupplierReport(
    pageSize: number,
    pageNum: number,
    search: string,
    orderBy?: string,
    orderDirection?: string,
    startDate?: Date,
    endDate?: Date,
  ): Promise<[SupplierReport[], number]>
  getReport(supplierId: number, startDate?: Date, endDate?: Date): Promise<void>
}

class ReportRepository implements IReportRepository {
  async getSellerReport(
    pageSize: number,
    pageNum: number,
    search: string,
    orderBy?: string,
    orderDirection?: string,
    startDate?: Date,
    endDate?: Date,
  ): Promise<[SellerReport[], number]> {
    const params: any = {
      pageSize: pageSize,
      pageNum: pageNum,
      search: search,
    }

    if (orderBy) {
      params['orderBy'] = orderBy
    }

    if (orderBy) {
      params['orderDirection'] = orderDirection
    }

    if (startDate) {
      params['startDate'] = startDate
    }

    if (endDate) {
      params['endDate'] = endDate
    }

    const { data } = await api.get(`${BackendURL}report/seller`, { params: params })

    const [reports, count] = data

    let _count: number = (count / pageSize) >> 0

    if (count % pageSize > 0) {
      _count += 1
    }

    return [reports as SellerReport[], _count]
  }

  async getSupplierReport(
    pageSize: number,
    pageNum: number,
    search: string,
    orderBy?: string,
    orderDirection?: string,
    startDate?: Date,
    endDate?: Date,
  ): Promise<[SupplierReport[], number]> {
    const params: any = {
      pageSize: pageSize,
      pageNum: pageNum,
      search: search,
    }

    if (orderBy) {
      params['orderBy'] = orderBy
    }

    if (orderBy) {
      params['orderDirection'] = orderDirection
    }

    if (startDate) {
      params['startDate'] = startDate
    }

    if (endDate) {
      params['endDate'] = endDate
    }

    const { data } = await api.get(`${BackendURL}report/supplier`, { params: params })

    const [reports, count] = data

    let _count: number = (count / pageSize) >> 0

    if (count % pageSize > 0) {
      _count += 1
    }

    return [reports as SupplierReport[], _count]
  }

  async getReport(supplierId: number, startDate?: Date, endDate?: Date): Promise<void> {
    const params: any = {}

    if (startDate) {
      params['startDate'] = startDate
    }

    if (endDate) {
      params['endDate'] = endDate
    }

    const { data } = await api.get(`${BackendURL}report/supplier/${supplierId}`, {
      params: params,
      responseType: 'blob',
      responseEncoding: 'utf-8',
    })

    const blobURL = URL.createObjectURL(data)

    const iframe = document.createElement('iframe')
    document.body.appendChild(iframe)

    iframe.style.display = 'none'
    iframe.src = blobURL
    iframe.onload = function () {
      setTimeout(function () {
        iframe.focus()
        iframe.contentWindow?.print()
      }, 1)
    }
  }
}

export const makeReportRepository = (): IReportRepository => {
  return new ReportRepository()
}
