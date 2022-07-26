import { ChangeEventHandler } from 'react'
import { TextField, TextFieldProps } from '@mui/material'

type CustomTextFieldProp = TextFieldProps & {
  id: string
  label: string
  value: string
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
}

const CustomTextField: React.FunctionComponent<CustomTextFieldProp> = ({
  id,
  label,
  value,
  onChange,
  ...props
}: CustomTextFieldProp) => {
  return (
      <TextField
        id={id}
        label={label}
        variant='outlined'
        value={value}
        onChange={onChange}
        margin='normal'
        fullWidth
        {...props}
      />
  )
}

export default CustomTextField
