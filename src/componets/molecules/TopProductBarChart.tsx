import { Fragment } from 'react'
import { Typography, useTheme } from '@mui/material'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts'
import Title from '../atoms/Title'
import { TopProduct } from '../../domains/topProduct.domain'
import { formatFloat } from '../../framework/helpers/formatter.helper'
import Price from '../atoms/Price'

type TopProdcutBarChartProp = {
  data: TopProduct[]
}

export default function TopProdcutBarChart({ data }: TopProdcutBarChartProp) {
  const theme = useTheme()
  return (
    <Fragment>
      <Title>Productos más vendidos en el mes</Title>
      {data.length === 0 ? (
        <Typography sx={{ margin: 'auto', width: '50%', padding: '10px', textAlign: 'center' }}>
          Sin datos
        </Typography>
      ) : (
        <ResponsiveContainer>
          <BarChart
            data={data}
            layout='vertical'
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20,
            }}
          >
            <XAxis
              tickFormatter={(value: string) => {
                const _value = parseFloat(value)
                return formatFloat(_value)
              }}
              type='number'
              dataKey='quantity'
              stroke={theme.palette.text.secondary}
              style={theme.typography.body2}
            />
            <YAxis
              type='category'
              dataKey='name'
              scale='band'
              stroke={theme.palette.text.secondary}
              style={theme.typography.body2}
            />
            <Tooltip
              formatter={(value: string) => {
                const _value = parseFloat(value)
                return <Price mount={_value} />
              }}
            />
            <Bar
              isAnimationActive={false}
              dataKey='quantity'
              name='Cantidad'
              barSize={20}
              fill={theme.palette.primary.main}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </Fragment>
  )
}
