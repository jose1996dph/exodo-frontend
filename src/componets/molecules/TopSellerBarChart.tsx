import { Fragment } from 'react'
import { Typography, useTheme } from '@mui/material'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts'
import Title from '../atoms/Title'
import { TopSeller } from '../../domains/topSeller.domain'
import { formatFloat } from '../../framework/helpers/formatter.helper'

type TopSellerBarChartProp = {
  data: TopSeller[]
}

export default function TopSellerBarChart({ data }: TopSellerBarChartProp) {
  const theme = useTheme()

  return (
    <Fragment>
      <Title>Vendedores con más facturas en el mes</Title>
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
              tickFormatter={(value: string, index: number) => {
                const seller = data[index]
                const name = seller.firstName + ' ' + seller.lastName
                return name
              }}
              dataKey='firstName'
              type='category'
              scale='band'
              stroke={theme.palette.text.secondary}
              style={theme.typography.body2}
            />
            <Tooltip
              formatter={(value: string) => {
                const _value = parseFloat(value)
                return formatFloat(_value)
              }}
            />
            <Bar
              isAnimationActive={false}
              dataKey='quantity'
              name='Cantidad de facturas'
              barSize={20}
              fill={theme.palette.primary.main}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </Fragment>
  )
}
