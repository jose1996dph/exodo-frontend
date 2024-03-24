import { Divider, Grid } from '@mui/material'
import { formatFloat } from '../../framework/helpers/formatter.helper'

export type BillToPayProps = {
  total: number
  mountPayed: number
  discountPercentage: number
  totalToPay: number
}

export default function BillToPay({
  total,
  mountPayed,
  discountPercentage,
  totalToPay,
}: BillToPayProps) {
  const mountDiscount = discountPercentage > 0 ? (total * discountPercentage) / 100 : 0

  return (
    <>
      <Grid item xs={6}>
        Total
      </Grid>
      <Grid item xs={6}>
        {formatFloat(total)}
      </Grid>
      <Grid item xs={6}>
        Descuento
      </Grid>
      <Grid item xs={6}>
        - {formatFloat(discountPercentage)} % ({formatFloat(mountDiscount)})
      </Grid>
      <Grid item xs={6}>
        Monto pagado
      </Grid>
      <Grid item xs={6}>
        - {formatFloat(mountPayed)}
      </Grid>
      <Grid item xs={12}>
        <Divider></Divider>
      </Grid>
      <Grid item xs={6}>
        <b>Total a pagar</b>
      </Grid>
      <Grid item xs={6}>
        <b>{formatFloat(totalToPay)}</b>
      </Grid>
    </>
  )
}
