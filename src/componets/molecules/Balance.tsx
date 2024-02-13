import Typography from '@mui/material/Typography'
import Title from '../atoms/Title'
import { formatFloat } from '../../framework/helpers/formatter.helper'
import { Balance as BalanceDomain } from '../../domains/balance.domain'

type BalanceProp = {
  balance: BalanceDomain | undefined
}

export default function Balance({ balance }: BalanceProp) {
  return (
    <>
      <Title>Facturado</Title>
      {balance && (
        <>
          <Typography component='p' variant='h4'>
            {formatFloat(balance.total || 0)}
          </Typography>
          <Typography color='text.secondary' sx={{ flex: 1 }}>
            en {balance.time.toLocaleString('es-VE', { month: 'long' })},{' '}
            {balance.time.toLocaleString('es-VE', { year: 'numeric' })}
          </Typography>
        </>
      )}
      {/**
      <div>
        <Link color='primary' href='#' onClick={preventDefault}>
          View balance
        </Link>
      </div>
      */}
    </>
  )
}
