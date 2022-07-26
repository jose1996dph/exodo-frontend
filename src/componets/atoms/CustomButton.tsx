import { MouseEventHandler } from 'react'
import Button from '@mui/material/Button'

type CustomButtonProp = {
  id: string
  text: string
  disabled?: boolean
  href?: string
  onClick?: MouseEventHandler<HTMLAnchorElement> | undefined
}

const CustomButton: React.FunctionComponent<CustomButtonProp> = ({
  id,
  text,
  onClick,
  disabled = false,
  href = '',
}: CustomButtonProp) => {
  return (
    <Button
      id={id}
      href={href}
      disabled={disabled}
      onClick={onClick}
      fullWidth
      type='submit'
      sx={{ mt: 3, mb: 2 }}
      variant='contained'
    >
      {text}
    </Button>
  )
}

export default CustomButton
