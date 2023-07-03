import Content from '../organisms/Content'
import { ToggleDrawerHandler } from '../molecules/CustomAppBar'

type DashboardProps = {
  open: boolean
  toggleDrawer: ToggleDrawerHandler
}

export default function Dashboard({ open, toggleDrawer }: DashboardProps) {
  return (
    <Content title='Indicadores' open={open} toggleDrawer={toggleDrawer}>
      {/*
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
      <Grid item xs={12}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
          <OrderTable />
        </Paper>
      </Grid>
      */}
    </Content>
  )
}
