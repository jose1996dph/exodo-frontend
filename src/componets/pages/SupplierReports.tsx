import { Grid, Paper } from '@mui/material'
import { ToggleDrawerHandler } from '../molecules/CustomAppBar'
import Content from '../organisms/Content'
import { useEffect, useState } from 'react'
import SupplierReportTable from '../organisms/SupplierReportTable'
import SupplierReportForm from '../molecules/SupplierReportForm'
import { SupplierReport } from '../../domains/supplierReport.domain'
import { makeReportService } from '../../services/report.service'

type SupplierReportsProp = {
  open: boolean
  toggleDrawer: ToggleDrawerHandler
}

export default function SupplierReports({ open, toggleDrawer }: SupplierReportsProp) {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [startDate, setStartDate] = useState<Date>(new Date(new Date().setDate(1)))
  const [endDate, setEndDate] = useState<Date>(new Date())

  const [reports, setReports] = useState<SupplierReport[]>([])
  const [orderBy, setOrderBy] = useState<string>('name')
  const [orderDirection, setOrderDirection] = useState<'asc' | 'desc'>('asc')
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(0)

  const reportService = makeReportService()

  const loadReports = async () => {
    try {
      const _supplier = await reportService.getSupplierReport(
        page,
        searchText,
        orderBy,
        orderDirection,
        startDate,
        endDate,
      )

      setReports(_supplier[0])
      setPages(_supplier[1])
    } catch {
      console.error('error')
    } finally {
      setIsLoading(false)
    }
  }

  const getReport = async (supplierId: number) => {
    try {
      await reportService.getReport(supplierId, startDate, endDate)
    } catch {
      console.error('error')
    }
  }

  useEffect(() => {
    setIsLoading(true)
    loadReports()
  }, [])

  useEffect(() => {
    loadReports()
  }, [page, orderDirection, orderBy])

  useEffect(() => {
    const timeOutId = setTimeout(() => loadReports(), 1000)
    return () => clearTimeout(timeOutId)
  }, [searchText, startDate, endDate])

  return (
    <Content title='Reportes de proveedores' open={open} toggleDrawer={toggleDrawer}>
      <Grid item xs={12}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <SupplierReportForm
            isLoading={isLoading}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            errors={errors}
            searchText={searchText}
            setSearchText={setSearchText}
          ></SupplierReportForm>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <SupplierReportTable
            pages={pages}
            page={page}
            setPage={setPage}
            orderBy={orderBy}
            setOrderBy={setOrderBy}
            orderDirection={orderDirection}
            setOrderDirection={setOrderDirection}
            data={reports}
            onReport={(id, item: SupplierReport) => getReport(item.supplierId)}
          />
        </Paper>
      </Grid>
    </Content>
  )
}
