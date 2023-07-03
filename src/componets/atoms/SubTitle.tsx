import { ReactNode } from 'react'
import Typography from '@mui/material/Typography'

interface TitleProps {
  children?: ReactNode
}

export default function Title(props: TitleProps) {
  return (
    <Typography component='h3' variant='h6' color='gray' gutterBottom>
      {props.children}
    </Typography>
  )
}
