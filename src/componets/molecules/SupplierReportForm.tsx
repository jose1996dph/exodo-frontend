import { Grid, InputAdornment } from '@mui/material'
import CustomDatePiker from '../atoms/CustomDatePicker'
import CustomTextField from '../atoms/CustomTextField'
import SearchIcon from '@mui/icons-material/Search'
import dayjs from 'dayjs'
import Title from '../atoms/Title'

type SupplierReportFormProp = {
  isLoading: boolean
  searchText: string
  setSearchText: (value: string) => void
  startDate: Date
  setStartDate: (value: Date) => void
  endDate: Date
  setEndDate: (value: Date) => void
  errors: Record<string, string>
}

export default function SupplierReportForm({
  isLoading,
  searchText,
  setSearchText,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  errors,
}: SupplierReportFormProp) {
  return (
    <>
      <Grid container spacing={0.5}>
        <Grid item xs={12}>
          <Title>Filtro de reportes</Title>
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextField
            label='Buscar proveedor'
            aria-label='delete'
            color='primary'
            variant='outlined'
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          ></CustomTextField>
        </Grid>
        <Grid item xs={12} md={3}>
          <CustomDatePiker
            id='startDate'
            label='Desde'
            value={dayjs(startDate)}
            disabled={isLoading}
            error={errors['startDate'] ? true : false}
            helperText={errors['startDate']}
            onChange={(value) => value && setStartDate(value.toDate())}
          ></CustomDatePiker>
        </Grid>
        <Grid item xs={12} md={3}>
          <CustomDatePiker
            id='endDate'
            label='Hasta'
            value={dayjs(endDate)}
            disabled={isLoading}
            error={errors['endDate'] ? true : false}
            helperText={errors['endDate']}
            onChange={(value) => value && setEndDate(value.toDate())}
          ></CustomDatePiker>
        </Grid>
      </Grid>
    </>
  )
}
