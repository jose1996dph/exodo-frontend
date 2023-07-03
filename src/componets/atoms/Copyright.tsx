import Typography, { TypographyProps } from '@mui/material/Typography'
import Link from '@mui/material/Link'
import { SxProps } from '@mui/system'
import { Theme } from '../styles'

type CopyrightProps = TypographyProps & {
  /** */
  sx?: SxProps<Theme>
}

export default function Copyright(props: CopyrightProps) {
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
