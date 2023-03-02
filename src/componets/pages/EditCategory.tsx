import { Alert, Grid, Paper } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CategoryDetail, UpdateCategory } from '../../domains/category.domain'
import { UrlRoutes } from '../../framework/routes/routes'
import { makeCategoryService } from '../../services/category.service'
import { ToggleDrawerHandler } from '../molecules/CustomAppBar'
import ServerException, { isServerException } from '../../domains/error.domain'
import CategoryForm from '../molecules/CategoryForm'
import Content from '../organisms/Content'

type EditCategoryPageProps = {
  open: boolean
  toggleDrawer: ToggleDrawerHandler
}

export default function EditCategory({ open, toggleDrawer }: EditCategoryPageProps) {
  const [errorMessage, setErrorMessage] = useState<string | string[]>('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [category, setCategory] = useState<CategoryDetail | undefined>(undefined)

  const categoryService = makeCategoryService()

  const navigate = useNavigate()

  const { id } = useParams()

  const handleSubmit = async (description: string) => {
    setIsLoading(true)
    try {
      if (!id) {
        return
      }
      const categoryId = parseInt(id)

      const category = new UpdateCategory(description)

      const _errors = category.isValid()

      setErrors(_errors)
      if (Object.keys(_errors).length) {
        return
      }

      await categoryService.update(categoryId, category)

      clearForm()

      navigate(UrlRoutes.Categories, { replace: true })
    } catch (error) {
      if (isServerException(error)) {
        const { message } = error as ServerException
        console.error(message)
        setErrorMessage(message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const clearForm = () => {
    setErrors({})
    setErrorMessage('')
  }

  const loadCategory = async () => {
    try {
      if (!id) {
        return
      }
      const categoryId = parseInt(id)
      const _category = await categoryService.getById(categoryId)
      setCategory(_category)
    } catch {
      console.error('error')
    }
  }

  useEffect(() => {
    loadCategory()
  }, [])

  return (
    <>
      <Content title='Actualizar categoría' open={open} toggleDrawer={toggleDrawer}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <CategoryForm
              isLoading={isLoading}
              category={category}
              errors={errors}
              onSubmit={handleSubmit}
            />
            {errorMessage && (
              <Alert sx={{ mt: '10px' }} severity='error'>
                {errorMessage}
              </Alert>
            )}
          </Paper>
        </Grid>
      </Content>
    </>
  )
}
