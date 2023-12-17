import { Fragment } from 'react'
import { useTheme } from '@mui/material'
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts'
import Title from '../atoms/Title'

export default function Chart() {
  const theme = useTheme()

  const data = [
    { time: '00:00', amount: 0, amount2: 10 },
    { time: '03:00', amount: 300, amount2: 410 },
    { time: '06:00', amount: 600, amount2: 710 },
    { time: '09:00', amount: 800, amount2: 910 },
    { time: '12:00', amount: 1500, amount2: 1610 },
    { time: '15:00', amount: 2000, amount2: 2110 },
    { time: '18:00', amount: 2400, amount2: 2510 },
    { time: '21:00', amount: 2400, amount2: 2510 },
    { time: '24:00', amount: undefined, amount2: undefined },
  ]
  return (
    <Fragment>
      <Title>Today</Title>
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
            dataKey='time'
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis stroke={theme.palette.text.secondary} style={theme.typography.body2}>
            <Label
              angle={270}
              position='left'
              style={{
                textAnchor: 'middle',
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              Ventas ($)
            </Label>
          </YAxis>
          <Line
            isAnimationActive={false}
            type='monotone'
            dataKey='amount'
            stroke={theme.palette.primary.main}
            dot={false}
          />
          <Line
            isAnimationActive={false}
            type='linear'
            dataKey='amount2'
            stroke={theme.palette.secondary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </Fragment>
  )
}
