import { IReportRepository, makeReportRepository } from '../repositories/report.repository'

class ReportService {
  private reportRepo: IReportRepository = makeReportRepository()

  async getSellerReport(
    pageNum: number,
    search: string,
    orderBy?: string,
    orderDirection?: string,
    startDate?: Date,
    endDate?: Date,
  ) {
    const pageSize = 10
    return await this.reportRepo.getSellerReport(
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
    return await this.reportRepo.getSupplierReport(
      pageSize,
      pageNum,
      search,
      orderBy,
      orderDirection,
      startDate,
      endDate,
    )
  }

  async getReport(supplierId: number, startDate?: Date, endDate?: Date): Promise<void> {
    await this.reportRepo.getReport(supplierId, startDate, endDate)
  }
}

export const makeReportService = (): ReportService => new ReportService()
