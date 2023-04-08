import { Alert, Box, Grid } from '@mui/material'
import CustomTextField from '../atoms/CustomTextField'
import CustomButton from '../atoms/CustomButton'
import Title from '../atoms/Title'
import { useEffect, useState } from 'react'
import { ProductDetail } from '../../domains/product.domain'
import CustomTable, { CustomTableRow } from './CustomTable'
import CustomSelect from '../atoms/CustomSelect'
import { CategoryItem } from '../../domains/category.domain'

const propRows: CustomTableRow[] = [{ title: 'Porcentage', key: 'value' }]

type SubmitHandler = (
  name: string,
  presentation: string,
  categoryId: string,
  salesPercentages: number[],
) => void

type ProductFormProps = {
  isLoading: boolean
  product?: ProductDetail | undefined
  categories: CategoryItem[]
  errors: Record<string, string>
  onSubmit: SubmitHandler
}

export default function ProductForm({
  isLoading,
  product,
  categories,
  errors,
  onSubmit,
}: ProductFormProps) {
  const [name, setName] = useState('')
  const [presentation, setPresentation] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [salesPercentage, setSalesPercentage] = useState('')
  const [salesPercentages, setSalesPercentages] = useState<number[]>([])
  const [errorSalesPercentage, setErrorSalesPercentage] = useState('')

  useEffect(() => {
    if (product) {
      setName(product.name)
      setPresentation(product.presentation)
      setCategoryId(product.categoryId.toString())
      setSalesPercentages(product.salesPercentages)
    }
  }, [product])

  function handleAdd(value: string) {
    const numberValue = parseFloat(value)
    if (!numberValue) return

    if (numberValue <= 0) {
      setErrorSalesPercentage('Porcentage no puede ser menor o igual que 0')
      return
    }

    if (salesPercentages.some((s) => s === numberValue)) {
      setErrorSalesPercentage('Porcentage ya esta encuentra registrado')
      return
    }

    salesPercentages.push(numberValue)
    setSalesPercentages(salesPercentages)
    setSalesPercentage('')
    setErrorSalesPercentage('')
  }

  function handleDelete(value: number) {
    if (!salesPercentages.some((s) => s === value)) return

    setSalesPercentages(salesPercentages.filter((s) => s !== value))
  }

  return (
    <>
      <Grid container spacing={0.5}>
        <Grid item xs={12}>
          <Title>Información del producto</Title>
        </Grid>

        <Grid item xs={12}>
          <CustomTextField
            id='name'
            label='Nombre'
            placeholder='Nombre'
            value={name}
            disabled={isLoading}
            error={errors['name'] ? true : false}
            helperText={errors['name']}
            onChange={(event) => setName(event.target.value)}
          ></CustomTextField>
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            id='presentation'
            label='Presentación'
            value={presentation}
            disabled={isLoading}
            error={errors['presentation'] ? true : false}
            helperText={errors['presentation']}
            onChange={(event) => setPresentation(event.target.value)}
          ></CustomTextField>
        </Grid>
        <Grid item xs={12}>
          <CustomSelect
            label='Categoría'
            id='categoryId'
            value={categoryId}
            disabled={isLoading}
            onChange={(event) => setCategoryId(event.target.value as string)}
            error={errors['categoryId'] ? true : false}
            helperText={errors['categoryId']}
            items={categories.map((item) => {
              return { value: item.id, description: item.description }
            })}
          ></CustomSelect>
        </Grid>
        <Grid item xs={9}>
          <CustomTextField
            id='percentages'
            label='Porcentage de venta'
            value={salesPercentage}
            disabled={isLoading}
            error={errorSalesPercentage ? true : false}
            helperText={errorSalesPercentage}
            onChange={(event) => setSalesPercentage(event.target.value)}
            inputProps={{ inputMode: 'numeric' }}
          ></CustomTextField>
        </Grid>
        <Grid item xs={3}>
          <CustomButton
            fullWidth={false}
            id='add'
            text='Agregar'
            href=''
            onClick={() => handleAdd(salesPercentage)}
            disabled={isLoading}
          ></CustomButton>
        </Grid>
        <Grid item xs={12}>
          <CustomTable
            title={''}
            pages={0}
            page={0}
            setPage={function (): void {
              throw new Error('Function not implemented.')
            }}
            tableRows={propRows}
            items={salesPercentages.map((s) => {
              return { id: s, value: s.toString() }
            })}
            onDelete={handleDelete}
          ></CustomTable>
          {errors['salesPercentages'] && (
            <Alert sx={{ mt: '10px' }} severity='error'>
              {errors['salesPercentages']}
            </Alert>
          )}
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CustomButton
          fullWidth={false}
          sx={{ mt: 2, ml: 1 }}
          id='submit'
          text='Guardar'
          href=''
          onClick={() => onSubmit(name, presentation, categoryId, salesPercentages)}
          disabled={isLoading}
        ></CustomButton>
      </Box>
    </>
  )
}
