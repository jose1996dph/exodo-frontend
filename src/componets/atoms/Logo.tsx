import Box, { BoxProps } from '@mui/material/Box'
import logo from '../../public/images/logo.svg'

type LogoProps = BoxProps & {
  width?: number | string | undefined
  height?: number | string | undefined
}

export default function Logo({ width, height, ...props }: LogoProps) {
  return (
    <Box {...props}>
      <img src={logo} className='App-logo' alt='logo' height={height} width={width} />
    </Box>
  )
}
