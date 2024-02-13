import { Fragment } from 'react'
import { useTheme } from '@mui/material'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts'
import Title from '../atoms/Title'
import { Balance } from '../../domains/balance.domain'
import { formatFloat } from '../../framework/helpers/formatter.helper'

type ChartProp = {
  data: Balance[]
}

export default function Chart({ data }: ChartProp) {
  const theme = useTheme()
  return (
    <Fragment>
      <Title>Ventas en el año</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            tickFormatter={(value: Date) => {
              return value
                .toLocaleDateString('es-VE', { month: 'short' })
                .replace(/^\w/, (c) => c.toUpperCase())
                .trim()
            }}
            dataKey='time'
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            tickFormatter={(value: number) => formatFloat(value)}
            dataKey='total'
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <Tooltip
            labelFormatter={(value: Date) => {
              return value
                .toLocaleDateString('es', { month: 'long', year: 'numeric' })
                .replace(/^\w/, (c) => c.toUpperCase())
                .trim()
            }}
            formatter={(value: string) => {
              const _value = parseFloat(value)
              return formatFloat(_value)
            }}
          />
          <Line
            isAnimationActive={false}
            type='linear'
            dataKey='total'
            name='Monto'
            stroke={theme.palette.primary.main}
            dot={false}
          />
          {/**
          <Line
            isAnimationActive={false}
            type='linear'
            dataKey='month'
            stroke={theme.palette.secondary.main}
            dot={false}
          />
           */}
        </LineChart>
      </ResponsiveContainer>
    </Fragment>
  )
}
