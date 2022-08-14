import { FC } from 'react'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'

import Chart from '../molecules/Chart'
import Deposits from '../molecules/Deposits'
import Orders from '../organisms/Orders'
import Content from '../organisms/Content'
import { ToggleDrawerHandler } from '../molecules/CustomAppBar'

type DashboardProps = {
  open: boolean
  toggleDrawer: ToggleDrawerHandler
}

export const Dashboard: FC<DashboardProps> = ({ open, toggleDrawer }) => {
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
          <Chart />
        </Paper>
      </Grid>
      {/* Recent Deposits */}
      <Grid item xs={12} md={4} lg={3}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            height: 240,
          }}
        >
          <Deposits />
        </Paper>
      </Grid>
      {/* Recent Orders */}
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <Orders />
        </Paper>
      </Grid>
    </Content>
  )
}

export default Dashboard
