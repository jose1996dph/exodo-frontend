import { Alert, AlertTitle, Grid, GridProps, Paper } from '@mui/material'
import SubTitle from '../atoms/SubTitle'
import Title from '../atoms/Title'
import CustomButton from '../atoms/CustomButton'

export type OptionDetails = {
  title: string
  action: () => void
  disabled?: boolean
}

export type DetailsItem = {
  title: string
  render: (detail: DetailsItem, item: any) => void
  props?: GridProps
}

export type DetailsProps<T> = {
  title: string
  obj: T | undefined
  items: DetailsItem[]
  option?: OptionDetails
  errors?: string[]
}

export default function Details<T>({ title, obj, items, option, errors }: DetailsProps<T>) {
  if (obj === undefined) {
    return <></>
  }

  return (
    <Grid item xs={12}>
      <Paper
        sx={{
          p: 2,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Grid container spacing={0.5}>
          <Grid item xs={option !== undefined ? 11 : 12}>
            <Title>{title}</Title>
          </Grid>
          {option && (
            <Grid item xs={1}>
              <CustomButton
                id={option.title}
                text={option.title}
                style={{ marginTop: 0, marginBottom: 0 }}
                onClick={() => option.action()}
                disabled={option.disabled}
              ></CustomButton>
            </Grid>
          )}
          {items.map((item) => {
            return (
              <Grid key={item.title} item xs={12} sm={6} md={4} lg={3} {...item.props}>
                <SubTitle>{item.title}</SubTitle>
                <>{item.render(item, obj)}</>
              </Grid>
            )
          })}
          {errors && errors.length > 0 && (
            <Grid item xs={12} marginTop={2}>
              <Alert severity='warning'>
                <AlertTitle>Order no puede ser facturada</AlertTitle>
                <ul>
                  {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </Alert>
            </Grid>
          )}
        </Grid>
      </Paper>
    </Grid>
  )
}
