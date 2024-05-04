import Box, { BoxProps } from '@mui/material/Box'
import { formatFloat } from '../../framework/helpers/formatter.helper'
import { useContext } from 'react'
import { PriceContext } from '../../App'
import { Currencies } from '../../framework/helpers/currency.helper'

type PriceProps = {
  mount: number
}

export default function Price({ mount, ...props }: PriceProps) {
  const { currency, dollarValue } = useContext(PriceContext)

  if (currency == Currencies.BOLIVAR) return <>Bs {formatFloat(mount * (dollarValue || 0))}</>
  else return <>{formatFloat(mount)} $</>
}
