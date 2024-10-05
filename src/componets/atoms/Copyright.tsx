import Typography, { TypographyProps } from '@mui/material/Typography'
import { SxProps } from '@mui/system'
import { Theme } from '@mui/material/styles/createTheme'

type CopyrightProps = TypographyProps & {
  /** */
  sx?: SxProps<Theme>
}

export default function Copyright(props: CopyrightProps) {
  return (
    <Typography variant='body2' color='text.secondary' align='center' {...props} sx={props.sx}>
      <u>Exodo 2014</u>. © Todo los derechos reservados.
    </Typography>
  )
}
