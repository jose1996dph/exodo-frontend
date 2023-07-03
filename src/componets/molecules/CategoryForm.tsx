import { Box, Grid } from '@mui/material'
import CustomTextField from '../atoms/CustomTextField'
import CustomButton from '../atoms/CustomButton'
import Title from '../atoms/Title'
import { useEffect, useState } from 'react'
import { CategoryDetail } from '../../domains/category.domain'

type SubmitHandler = (description: string) => void

type CategoryFormProps = {
  isLoading: boolean
  category?: CategoryDetail | undefined
  errors: Record<string, string>
  onSubmit: SubmitHandler
}

export default function CategoryForm({ isLoading, category, errors, onSubmit }: CategoryFormProps) {
  const [description, setDescription] = useState('')

  useEffect(() => {
    if (category) {
      setDescription(category.description)
    }
  }, [category])

  return (
    <>
      <Grid container spacing={0.5}>
        <Grid item xs={12}>
          <Title>Información de la categoría</Title>
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            id='description'
            label='Descripción'
            placeholder='Descripción'
            value={description}
            disabled={isLoading}
            error={errors['description'] ? true : false}
            helperText={errors['description']}
            onChange={(event) => setDescription(event.target.value)}
          ></CustomTextField>
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CustomButton
          fullWidth={false}
          sx={{ mt: 2, ml: 1 }}
          id='submit'
          text='Guardar'
          href=''
          onClick={() => onSubmit(description)}
          disabled={isLoading}
        ></CustomButton>
      </Box>
    </>
  )
}
