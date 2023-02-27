import { Alert, Grid, Paper } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CreateCategory as CreateCategoryRequest } from '../../domains/category.domain'
import { UrlRoutes } from '../../framework/routes/routes'
import { makeCategoryService } from '../../services/category.service'
import ServerException, { isServerException } from '../../domains/error.domain'
import { ToggleDrawerHandler } from '../molecules/CustomAppBar'
import CategoryForm from '../molecules/CategoryForm'
import Content from '../organisms/Content'

type CreateCategoryPageProps = {
  open: boolean
  toggleDrawer: ToggleDrawerHandler
}

export default function CreateCategory({ open, toggleDrawer }: CreateCategoryPageProps) {
  const [errorMessage, setErrorMessage] = useState<string | string[]>('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  const categoryService = makeCategoryService()

  const navigate = useNavigate()

  const handleSubmit = async (description: string) => {
    setIsLoading(true)
    try {
      const category = new CreateCategoryRequest(description)

      const _errors = category.isValid()

      setErrors(_errors)
      if (Object.keys(_errors).length) {
        return
      }

      await categoryService.create(category)

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

  return (
    <>
      <Content title='Nuevo cliente' open={open} toggleDrawer={toggleDrawer}>
        <Grid item xs={12}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <CategoryForm isLoading={isLoading} errors={errors} onSubmit={handleSubmit} />
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
