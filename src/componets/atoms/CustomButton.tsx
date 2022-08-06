import { MouseEventHandler } from 'react'
import { Button, ButtonProps } from '@mui/material/'

type CustomButtonProp = ButtonProps & {
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
  ...props
}: CustomButtonProp) => {
  return (
    <Button
      id={id}
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

export default CustomButton
