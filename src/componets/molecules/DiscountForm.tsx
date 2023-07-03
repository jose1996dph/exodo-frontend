import { Grid } from '@mui/material'
import CustomTextField from '../atoms/CustomTextField'
import CustomButton from '../atoms/CustomButton'
import Title from '../atoms/Title'
import { useEffect, useState } from 'react'
import { DiscountItem } from '../../domains/discount.domain'

type DiscountFormProps = {
  isLoading: boolean
  discount?: DiscountItem | undefined
  setDiscount?: ((value: DiscountItem | undefined) => void) | undefined
  submitDiscount: (percentage: number, deadLine: number) => void
  errors: Record<string, string>
}

export default function DiscountForm({
  isLoading,
  discount,
  setDiscount,
  submitDiscount,
  errors,
}: DiscountFormProps) {
  const [deadLine, setDeadLine] = useState('')
  const [percentage, setPercentage] = useState('')

  const addDiscountToSupplier = async () => {
    try {
      const _percentage = parseFloat(percentage)
      const _deadLine = parseFloat(deadLine)

      await submitDiscount(_percentage, _deadLine)

      clearForm()
    } catch (e) {
      console.error(e)
    }
  }

  const clearForm = () => {
    setDeadLine('')
    setPercentage('')
    if (setDiscount && discount) {
      setDiscount(undefined)
    }
  }

  useEffect(() => {
    if (!discount) {
      clearForm()
      return
    }

    setPercentage(discount.percentage.toString())
    setDeadLine(discount.deadline.toString())
  }, [discount])

  return (
    <Grid container spacing={0.5}>
      <Grid item xs={12}>
        <Title>Crear descuento</Title>
      </Grid>
      <Grid item xs={12} sm={4} lg={5}>
        <CustomTextField
          id='percentage'
          label='Porcentaje del descuento'
          value={percentage}
          disabled={isLoading}
          error={errors['percentage'] ? true : false}
          helperText={errors['percentage']}
          onChange={(event) => {
            if (event.target.value && event.target.value.length > 2) {
              return
            }
            setPercentage(event.target.value)
          }}
          inputProps={{ inputMode: 'decimal' }}
        ></CustomTextField>
      </Grid>
      <Grid item xs={12} sm={4} lg={5}>
        <CustomTextField
          id='deadLine'
          label='Timepo limite (en días)'
          value={deadLine}
          disabled={isLoading}
          error={errors['deadLine'] ? true : false}
          helperText={errors['deadLine']}
          onChange={(event) => setDeadLine(event.target.value)}
          inputProps={{ inputMode: 'numeric' }}
        ></CustomTextField>
      </Grid>
      <Grid item xs={12} sm={2} lg={1}>
        <CustomButton
          id='addDiscount'
          text='Agregar'
          onClick={() => addDiscountToSupplier()}
          disabled={isLoading}
        ></CustomButton>
      </Grid>
      <Grid item xs={12} sm={2} lg={1}>
        <CustomButton
          id='cancelAddDiscount'
          text='Cancelar'
          onClick={() => clearForm()}
          disabled={isLoading}
        ></CustomButton>
      </Grid>
    </Grid>
  )
}
