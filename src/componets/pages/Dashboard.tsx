import Content from '../organisms/Content'
import { ToggleDrawerHandler } from '../molecules/CustomAppBar'
import { Grid, Paper } from '@mui/material'
import Chart from '../molecules/Chart'
import Deposits from '../molecules/Balance'
import { makeIndicatorService } from '../../services/indicator.service'
import { useEffect, useState } from 'react'
import { Balance } from '../../domains/balance.domain'
import TopProdcutBarChart from '../molecules/TopProductBarChart'
import { TopProduct } from '../../domains/topProduct.domain'
import TopSellerBarChart from '../molecules/TopSellerBarChart'
import { TopSeller } from '../../domains/topSeller.domain'

type DashboardProps = {
  open: boolean
  toggleDrawer: ToggleDrawerHandler
}

export default function Dashboard({ open, toggleDrawer }: DashboardProps) {
  const [balance, setBalance] = useState<Balance>()
  const [balances, setBalances] = useState<Balance[]>([])
  const [topProducts, setTopProducts] = useState<TopProduct[]>([])
  const [topSellers, setTopSellers] = useState<TopSeller[]>([])

  const indicatorService = makeIndicatorService()

  const loadBalances = async () => {
    try {
      const _balances = await indicatorService.getBalances()
      setBalances(_balances)
    } catch (error) {
      console.error(error)
    }
  }

  const loadBalance = async () => {
    try {
      const _balance = await indicatorService.getBalance()
      setBalance(_balance)
    } catch (error) {
      console.error(error)
    }
  }

  const loadTopProducts = async () => {
    try {
      const _topProducts = await indicatorService.getTopProducts()
      setTopProducts(_topProducts)
    } catch (error) {
      console.error(error)
    }
  }

  const loadTopSellers = async () => {
    try {
      const _topSellers = await indicatorService.getTopSellers()
      setTopSellers(_topSellers)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    loadBalance()
    loadBalances()
    loadTopProducts()
    loadTopSellers()
  }, [])

  return (
    <Content title='Indicadores' open={open} toggleDrawer={toggleDrawer}>
      <Grid item xs={12} md={8} lg={9}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 240,
          }}
        >
          <Chart data={balances} />
        </Paper>
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 240,
          }}
        >
          <Deposits balance={balance} />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: '700px',
          }}
        >
          <TopProdcutBarChart data={topProducts} />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6} lg={6}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: '700px',
          }}
        >
          <TopSellerBarChart data={topSellers} />
        </Paper>
      </Grid>
      {/**
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <OrderTable />
        </Paper>
      </Grid>
       */}
    </Content>
  )
}
