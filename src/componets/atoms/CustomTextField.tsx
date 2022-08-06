import { ChangeEventHandler, KeyboardEvent, KeyboardEventHandler } from 'react'
import { TextField, TextFieldProps } from '@mui/material'

type EnterEventHandelr = () => void

type CustomTextFieldProp = TextFieldProps & {
  id: string
  label: string
  value: string
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  onKeyDown?: KeyboardEventHandler<HTMLDivElement> | undefined
  onEnter?: EnterEventHandelr | undefined
}

const CustomTextField: React.FunctionComponent<CustomTextFieldProp> = ({
  id,
  label,
  value,
  onChange,
  error = false,
  helperText = undefined,
  onEnter = undefined,
  onKeyDown = undefined,
  ...props
}: CustomTextFieldProp) => {
  const onKeyPressCustom = (event: KeyboardEvent<HTMLDivElement>) => {
    if (onKeyDown) onKeyDown(event)
    if (event.key === 'Enter' && onEnter) {
      onEnter()
    }
  }

  return (
    <TextField
      id={id}
      label={label}
      variant='outlined'
      value={value}
      error={error || helperText ? true : false}
      helperText={helperText}
      onChange={onChange}
      onKeyDown={onKeyPressCustom}
      margin='normal'
      fullWidth
      {...props}
    />
  )
}

export default CustomTextField
