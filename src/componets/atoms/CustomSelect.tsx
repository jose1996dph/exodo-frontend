import FormControl from '@mui/material/FormControl'
import Select, { SelectProps } from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import { FormHelperText } from '@mui/material'

export type CustomSelectItem<T = unknown> = {
  value: T
  description: string
}

type CustomSelectProps<T> = SelectProps & {
  items: CustomSelectItem<T>[]
  helperText: string | undefined
}

export default function CustomSelect<T>({
  items,
  label,
  id,
  helperText,
  error,
  ...props
}: CustomSelectProps<T>) {
  return (
    <FormControl fullWidth margin='normal'>
      <InputLabel id={`${id}-label`} error={error}>
        {label}
      </InputLabel>
      <Select label={label} id={id} labelId={`${id}-label`} error={error} {...props}>
        {items.map((item, index) => (
          <MenuItem key={index} value={item.value as any}>
            {item.description}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText error={error}>{helperText}</FormHelperText>}
    </FormControl>
  )
}
