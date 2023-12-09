import { DatePicker, DatePickerProps } from '@mui/x-date-pickers'

type CustomDatePickerProp<TDate> = DatePickerProps<TDate> &
  React.RefAttributes<HTMLDivElement> & {
    id: string
    label: string
    error: boolean
    helperText: string
    value: TDate
    onChange: (date: TDate) => void
  }

export default function CustomDatePiker<TDate>({
  label,
  helperText,
  value,
  onChange,
  error = false,
  ...props
}: CustomDatePickerProp<TDate>) {
  return (
    <DatePicker
      label={label}
      format='DD/MM/YYYY'
      value={value}
      onChange={onChange}
      slotProps={{
        textField: {
          error: error,
          helperText: helperText,
          fullWidth: true,
          sx: { mt: 2, mb: 2 },
          variant: 'outlined',
        },
      }}
      {...props}
    />
  )
}
