import FormControl from '@mui/material/FormControl'
import Select, { SelectProps } from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import { FormHelperText } from '@mui/material'

export type CustomSelectItem<T = unknown> = {
  value: T
  description: string
}

type CustomSelectProps = SelectProps & {
  items: CustomSelectItem[]
  helperText: string | undefined
}

export default function CustomSelect({
  items,
  label,
  id,
  helperText,
  error,
  ...props
}: CustomSelectProps) {
  return (
    <FormControl fullWidth margin='normal'>
      <InputLabel id={`${id}-label`} error={error}>
        {label}
      </InputLabel>
      <Select label={label} id={id} labelId={`${id}-label`} error={error} {...props}>
        {items.map((item, index) => (
          <MenuItem key={index} value={item.value}>
            {item.description}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText error={error}>{helperText}</FormHelperText>}
    </FormControl>
  )
}
