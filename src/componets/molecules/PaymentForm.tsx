import { Box, Grid } from '@mui/material'
import CustomTextField from '../atoms/CustomTextField'
import CustomButton from '../atoms/CustomButton'
import Title from '../atoms/Title'
import { useState } from 'react'
import CustomDatePiker from '../atoms/CustomDatePicker'
import CustomSelect from '../atoms/CustomSelect'
import { PaymentType } from '../../domains/payment.domain'
import BillToPay, { BillToPayProps } from './BillToPay'

type PaymentFormProps = BillToPayProps & {
  isLoading: boolean
  submitPayment: (
    mount: number,
    paymentType: PaymentType,
    referenceCode?: string,
    date?: Date,
  ) => void
  errors: Record<string, string>
}

export default function PaymentForm({
  isLoading,
  submitPayment,
  errors,
  total,
  discountPercentage,
  mountPayed,
}: PaymentFormProps) {
  const [paymentType, setPaymentType] = useState<PaymentType>()
  const [mount, setMount] = useState('')
  const [date, setDate] = useState<Date>()
  const [referenceCode, setReferenceCode] = useState('')

  const addPaymentToSupplier = async () => {
    try {
      const _mount = parseFloat(mount)

      await submitPayment(_mount, paymentType as PaymentType, referenceCode, date)

      clearForm()
    } catch (e) {
      console.error(e)
    }
  }

  const clearForm = () => {
    setPaymentType(undefined)
    setMount('')
    setDate(undefined)
    setReferenceCode('')
  }

  return (
    <Grid container spacing={0.5}>
      <Grid item xs={12}>
        <Title>Ingresar pago</Title>
      </Grid>
      <Grid item xs={12} sm={6} lg={6}>
        <CustomSelect
          id='paymentType'
          label='Método de pago'
          value={paymentType ?? ''}
          disabled={isLoading}
          error={errors['paymentType'] ? true : false}
          helperText={errors['paymentType']}
          onChange={(event) => {
            if (!event.target.value) {
              return
            }
            setPaymentType(event.target.value as PaymentType)
          }}
          inputProps={{ inputMode: 'decimal' }}
          items={[
            { description: 'Efectivo', value: PaymentType.CASH },
            { description: 'Pago móvil', value: PaymentType.MOBILE_PAYMENT },
            { description: 'Transferencia bancaria', value: PaymentType.TRANSFERENCE },
          ]}
        ></CustomSelect>
      </Grid>
      <Grid item xs={12} sm={6} lg={6}>
        <CustomTextField
          id='mount'
          label='Monto'
          value={mount}
          disabled={isLoading}
          error={errors['mount'] ? true : false}
          helperText={errors['mount']}
          onChange={(event) => setMount(event.target.value)}
          inputProps={{ inputMode: 'decimal' }}
        ></CustomTextField>
      </Grid>
      {paymentType != PaymentType.CASH && (
        <Grid item xs={12} sm={6} lg={6}>
          <CustomTextField
            id='referenceCode'
            label='Numero de transferencia'
            value={referenceCode}
            disabled={isLoading}
            error={errors['referenceCode'] ? true : false}
            helperText={errors['referenceCode']}
            onChange={(event) => setReferenceCode(event.target.value)}
          ></CustomTextField>
        </Grid>
      )}
      {paymentType != PaymentType.CASH && (
        <Grid item xs={12} sm={6} lg={6}>
          <CustomDatePiker
            id='date'
            label='Fecha de la tranferencia'
            value={date}
            disabled={isLoading}
            error={errors['transferDate'] ? true : false}
            helperText={errors['transferDate']}
            onChange={(value) => value && setDate(value)}
          ></CustomDatePiker>
        </Grid>
      )}
      <BillToPay
        total={total}
        mountPayed={mountPayed}
        discountPercentage={discountPercentage}
      ></BillToPay>
      <Grid item xs={12} sm={12} lg={12}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CustomButton
            fullWidth={false}
            id='addPayment'
            text='Agregar'
            sx={{ mt: 2, ml: 1 }}
            onClick={() => addPaymentToSupplier()}
            disabled={isLoading}
          ></CustomButton>
          <CustomButton
            fullWidth={false}
            id='cancelAddPayment'
            text='Cancelar'
            sx={{ mt: 2, ml: 1 }}
            onClick={() => clearForm()}
            disabled={isLoading}
          ></CustomButton>
        </Box>
      </Grid>
    </Grid>
  )
}
