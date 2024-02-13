import { Grid, InputAdornment } from '@mui/material'
import CustomDatePiker from '../atoms/CustomDatePicker'
import SearchIcon from '@mui/icons-material/Search'
import CustomTextField from '../atoms/CustomTextField'
import Title from '../atoms/Title'
import dayjs from 'dayjs'

type SellerReportFormProp = {
  isLoading: boolean
  searchText: string
  setSearchText: (value: string) => void
  startDate: Date | undefined
  setStartDate: (value: Date) => void
  endDate: Date | undefined
  setEndDate: (value: Date) => void
  errors: Record<string, string>
}

export default function SellerReportForm({
  isLoading,
  searchText,
  setSearchText,
  startDate,
  setStartDate,
  setEndDate,
  endDate,
  errors,
}: SellerReportFormProp) {
  dayjs()
  return (
    <>
      <Grid container spacing={0.5}>
        <Grid item xs={12}>
          <Title>Filtro de reportes</Title>
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomTextField
            label='Buscar vendedor'
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
