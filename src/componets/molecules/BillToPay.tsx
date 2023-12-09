import { Divider, Grid } from '@mui/material'

export type BillToPayProps = {
  total: number
  mountPayed: number
  discountPercentage: number
}

export default function BillToPay({ total, mountPayed, discountPercentage }: BillToPayProps) {
  const mountDiscount = discountPercentage > 0 ? (total * discountPercentage) / 100 : 0
  const totalToPay = total - mountDiscount - mountPayed

  return (
    <>
      <Grid item xs={6}>
        Total
      </Grid>
      <Grid item xs={6}>
        {total.toFixed(2)}
      </Grid>
      <Grid item xs={6}>
        Descuento
      </Grid>
      <Grid item xs={6}>
        - {discountPercentage.toFixed(2)} % ({mountDiscount.toFixed(2)})
      </Grid>
      <Grid item xs={6}>
        Monto pagado
      </Grid>
      <Grid item xs={6}>
        - {mountPayed.toFixed(2)}
      </Grid>
      <Grid item xs={12}>
        <Divider></Divider>
      </Grid>
      <Grid item xs={6}>
        <b>Total a pagar</b>
      </Grid>
      <Grid item xs={6}>
        <b>{totalToPay.toFixed(2)}</b>
      </Grid>
    </>
  )
}
