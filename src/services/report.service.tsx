import { IReportRepository, makeReportRepository } from '../repositories/report.repository'

class ReportService {
  private indicatorRepo: IReportRepository = makeReportRepository()

  async getSellerReport(
    pageNum: number,
    search: string,
    orderBy?: string,
    orderDirection?: string,
    startDate?: Date,
    endDate?: Date,
  ) {
    const pageSize = 10
    return await this.indicatorRepo.getSellerReport(
      pageSize,
      pageNum,
      search,
      orderBy,
      orderDirection,
      startDate,
      endDate,
    )
  }

  async getSupplierReport(
    pageNum: number,
    search: string,
    orderBy?: string,
    orderDirection?: string,
    startDate?: Date,
    endDate?: Date,
  ) {
    const pageSize = 10
    return await this.indicatorRepo.getSupplierReport(
      pageSize,
      pageNum,
      search,
      orderBy,
      orderDirection,
      startDate,
      endDate,
    )
  }
}

export const makeReportService = (): ReportService => new ReportService()
