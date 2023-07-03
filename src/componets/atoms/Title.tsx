import { ReactNode } from 'react'
import Typography from '@mui/material/Typography'

interface TitleProps {
  children?: ReactNode
}

export default function Title(props: TitleProps) {
  return (
    <Typography component='h2' variant='h5' color='primary' gutterBottom>
      {props.children}
    </Typography>
  )
}
