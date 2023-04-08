import { Grid, GridProps, Paper } from '@mui/material'
import SubTitle from '../atoms/SubTitle'
import Title from '../atoms/Title'

export type DetailsItem = {
  title: string
  render: (detail: DetailsItem, item: any) => void
  props?: GridProps
}

export type DetailsProps<T> = {
  title: string
  obj: T | undefined
  items: DetailsItem[]
}

export default function Details<T>({ title, obj, items }: DetailsProps<T>) {
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
          <Grid item xs={12}>
            <Title>{title}</Title>
          </Grid>
          {items.map((item) => {
            return (
              <Grid key={item.title} item xs={12} sm={6} md={4} lg={3} {...item.props}>
                <SubTitle>{item.title}</SubTitle>
                <>{item.render(item, obj)}</>
              </Grid>
            )
          })}
        </Grid>
      </Paper>
    </Grid>
  )
}
