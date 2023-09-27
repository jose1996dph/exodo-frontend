import { Grid } from '@mui/material'
import CustomTable, { CustomTableRow } from '../molecules/CustomTable'
import { DiscountItem } from '../../domains/discount.domain'

type PricesProp = {
  discounts: DiscountItem[]
  total: number
  productPrice?: number | undefined
}

export default function Prices({ discounts, total, productPrice = undefined }: PricesProp) {
  const tableRows: CustomTableRow[] = [
    {
      title: 'Tiempo limite',
      key: 'deadline',
      render: (_, item: DiscountItem) => `${item.deadline} días`,
    },
    {
      title: 'Porcentage',
      key: 'percentage',
      render: (_, item: DiscountItem) => `${item.percentage}%`,
    },
    {
      title: 'Total',
      key: 'total',
      render: (_, item: DiscountItem) => {
        return total - (total * item.percentage) / 100
      },
    },
  ]

  if (productPrice != undefined) {
    tableRows.splice(2, 0, {
      title: 'Precio c/u',
      key: 'unitPrice',
      render: (_, item: DiscountItem) => {
        return productPrice - (productPrice * item.percentage) / 100
      },
    })
  }

  return (
    <>
      {discounts.length > 0 && (
        <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column' }}>
          <CustomTable
            title='Descuento en productos'
            pages={0}
            page={1}
            setPage={() => null}
            items={discounts}
            tableRows={tableRows}
            identify='productId'
          ></CustomTable>
        </Grid>
      )}
      {productPrice != undefined && (
        <Grid
          item
          xs={6}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'right',
            fontSize: 18,
          }}
        >
          <b>Precio c/u: {productPrice}</b>
        </Grid>
      )}
      <Grid
        item
        xs={productPrice != undefined ? 6 : 12}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'right',
          fontSize: 18,
        }}
      >
        <b>Total: {total}</b>
      </Grid>
    </>
  )
}
