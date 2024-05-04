import { Grid } from '@mui/material'
import CustomTable, { CustomRow } from '../molecules/CustomTable'
import { DiscountItem } from '../../domains/discount.domain'
import { formatFloat } from '../../framework/helpers/formatter.helper'
import Price from '../atoms/Price'

type PricesProp = {
  discounts: DiscountItem[]
  total: number
  productPrice?: number | undefined
}

export default function Prices({ discounts, total, productPrice = undefined }: PricesProp) {
  const tableRows: CustomRow[] = [
    {
      title: 'Tiempo límite',
      key: 'deadline',
      isImportant: true,
      render: (_, item: DiscountItem) => `${item.deadline} días`,
    },
    {
      title: 'Porcentaje',
      key: 'percentage',
      isImportant: true,
      render: (_, item: DiscountItem) => `${item.percentage}%`,
    },
    {
      title: 'Total',
      key: 'total',
      isImportant: true,
      render: (_, item: DiscountItem) => {
        const _mount = total - (total * item.percentage) / 100
        return <Price mount={_mount} />
      },
    },
  ]

  if (productPrice != undefined) {
    tableRows.splice(2, 0, {
      title: 'Precio c/u',
      key: 'unitPrice',
      isImportant: true,
      render: (_: CustomRow, item: DiscountItem) => {
        const _mount = productPrice - (productPrice * item.percentage) / 100
        return <Price mount={_mount} />
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
          <b>
            Precio c/u: <Price mount={productPrice} />
          </b>
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
        <b>
          Total: <Price mount={total} />
        </b>
      </Grid>
    </>
  )
}
