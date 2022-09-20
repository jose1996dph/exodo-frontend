import { MouseEventHandler } from 'react'
import Button, { ButtonProps } from '@mui/material/Button'

type CustomButtonProp = ButtonProps & {
  id: string
  text: string
  disabled?: boolean
  href?: string
  onClick?: MouseEventHandler<HTMLAnchorElement> | undefined
}

export default function CustomButton({
  text,
  onClick,
  disabled = false,
  ...props
}: CustomButtonProp) {
  return (
    <Button
      disabled={disabled}
      onClick={onClick}
      fullWidth
      type='submit'
      sx={{ mt: 3, mb: 2 }}
      variant='contained'
      {...props}
    >
      {text}
    </Button>
  )
}
