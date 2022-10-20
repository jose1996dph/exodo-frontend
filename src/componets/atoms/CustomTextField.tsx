import { ChangeEvent, ChangeEventHandler, KeyboardEvent, KeyboardEventHandler } from 'react'
import TextField, { TextFieldProps } from '@mui/material/TextField'

type EnterEventHandelr = () => void

type CustomTextFieldProp = TextFieldProps & {
  label: string
  value: string
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  onKeyDown?: KeyboardEventHandler<HTMLDivElement> | undefined
  onEnter?: EnterEventHandelr | undefined
}

export default function CustomTextField({
  label,
  value,
  onChange,
  error = false,
  helperText = undefined,
  onEnter = undefined,
  onKeyDown = undefined,
  inputProps = undefined,
  ...props
}: CustomTextFieldProp) {
  const onKeyPressCustom = (event: KeyboardEvent<HTMLDivElement>) => {
    if (onKeyDown) onKeyDown(event)
    if (event.key === 'Enter' && onEnter) {
      onEnter()
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (inputProps && inputProps.inputMode == 'numeric') {
      event.target.value = event.target.value.replace(/\D/g, '')
    } else if (inputProps && inputProps.inputMode == 'tel') {
      event.target.value = event.target.value.replace(/[^-0-9]+/g, '')
    }
    onChange(event)
  }

  return (
    <TextField
      label={label}
      variant='outlined'
      value={value}
      error={error || helperText ? true : false}
      helperText={helperText}
      onChange={handleChange}
      onKeyDown={onKeyPressCustom}
      inputProps={inputProps}
      margin='normal'
      fullWidth
      {...props}
    />
  )
}
