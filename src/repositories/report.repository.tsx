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
}

export const makeReportRepository = (): IReportRepository => {
  return new ReportRepository()
}
