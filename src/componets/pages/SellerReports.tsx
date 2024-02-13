import { Grid, Paper } from '@mui/material'
import { ToggleDrawerHandler } from '../molecules/CustomAppBar'
import Content from '../organisms/Content'
import SellerReportForm from '../molecules/SellerReportForm'
import { useEffect, useState } from 'react'
import { SellerReport } from '../../domains/sellerReport.domain'
import SellerReportTable from '../organisms/SellerReportTable'
import { makeReportService } from '../../services/report.service'

type SellerReportsProp = {
  open: boolean
  toggleDrawer: ToggleDrawerHandler
}

export default function SellerReports({ open, toggleDrawer }: SellerReportsProp) {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [startDate, setStartDate] = useState<Date>(new Date(new Date().setDate(1)))
  const [endDate, setEndDate] = useState<Date>(new Date())

  const [reports, setReports] = useState<SellerReport[]>([])
  const [orderBy, setOrderBy] = useState<string>('name')
  const [orderDirection, setOrderDirection] = useState<'asc' | 'desc'>('asc')
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(0)

  const reportService = makeReportService()

  const loadReports = async () => {
    try {
      const _seller = await reportService.getSellerReport(
        page,
        searchText,
        orderBy,
        orderDirection,
        startDate,
        endDate,
      )

      setReports(_seller[0])
      setPages(_seller[1])
    } catch {
      console.error('error')
    } finally {
      setIsLoading(false)
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
    <Content title='Reportes de vendedores' open={open} toggleDrawer={toggleDrawer}>
      <Grid item xs={12}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <SellerReportForm
            isLoading={isLoading}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            errors={errors}
            searchText={searchText}
            setSearchText={setSearchText}
          ></SellerReportForm>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <SellerReportTable
            pages={pages}
            page={page}
            setPage={setPage}
            orderBy={orderBy}
            setOrderBy={setOrderBy}
            orderDirection={orderDirection}
            setOrderDirection={setOrderDirection}
            data={reports}
          />
        </Paper>
      </Grid>
    </Content>
  )
}
