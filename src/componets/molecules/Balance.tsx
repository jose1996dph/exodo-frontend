import Typography from '@mui/material/Typography'
import Title from '../atoms/Title'
import { Balance as BalanceDomain } from '../../domains/balance.domain'
import Price from '../atoms/Price'

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
            <Price mount={balance.total || 0} />
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
