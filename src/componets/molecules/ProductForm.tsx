import { Box, Grid } from '@mui/material'
import CustomTextField from '../atoms/CustomTextField'
import CustomButton from '../atoms/CustomButton'
import Title from '../atoms/Title'
import { useEffect, useState } from 'react'
import { ProductDetail } from '../../domains/product.domain'
import CustomSelect from '../atoms/CustomSelect'
import { CategoryItem } from '../../domains/category.domain'

type SubmitHandler = (name: string, presentation: string, categoryId: string) => void

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

  useEffect(() => {
    if (product) {
      setName(product.name)
      setPresentation(product.presentation)
      setCategoryId(product.categoryId.toString())
    }
  }, [product])

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
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CustomButton
          fullWidth={false}
          sx={{ mt: 2, ml: 1 }}
          id='submit'
          text='Guardar'
          href=''
          onClick={() => onSubmit(name, presentation, categoryId)}
          disabled={isLoading}
        ></CustomButton>
      </Box>
    </>
  )
}
