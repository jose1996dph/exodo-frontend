import { Typography, TypographyProps, Link } from '@mui/material'
import { FC } from 'react'
import { SxProps } from '@mui/system'
import { Theme } from '../styles'

type CopyrightProps = TypographyProps & {
  /** */
  sx?: SxProps<Theme>
}

const Copyright: FC = (props: CopyrightProps) => {
  return (
    <Typography variant='body2' color='text.secondary' align='center' {...props} sx={props.sx}>
      {'Copyright © '}
      <Link color='inherit' href='https://mui.com/'>
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

export default Copyright
