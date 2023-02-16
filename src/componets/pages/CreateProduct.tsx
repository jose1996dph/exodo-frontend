import { Alert, Grid, Paper } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CreateProduct as CreateProductRequest } from '../../domains/product.domain'
import ServerException, { isServerException } from '../../domains/error.domain'
import { UrlRoutes } from '../../framework/routes/routes'
import { ToggleDrawerHandler } from '../molecules/CustomAppBar'
import Content from '../organisms/Content'
import { makeProductService } from '../../services/product.service'
import ProductForm from '../molecules/ProductForm'
import { CategoryItem } from '../../domains/category.domain'
import { makeCategoryService } from '../../services/category.service'

type CreateProductPageProps = {
  open: boolean
  toggleDrawer: ToggleDrawerHandler
}

export default function CreateProduct({ open, toggleDrawer }: CreateProductPageProps) {
  const [errorMessage, setErrorMessage] = useState<string | string[]>('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [categories, setCategories] = useState<CategoryItem[]>([])

  const productService = makeProductService()
  const categoryService = makeCategoryService()

  const navigate = useNavigate()

  const handleSubmit = async (
    name: string,
    presentation: string,
    categoryId: string,
    salesPercentages: number[],
  ) => {
    setIsLoading(true)
    try {
      const _categoryId = parseInt(categoryId ?? 0)
      const product = new CreateProductRequest(name, presentation, _categoryId, salesPercentages)

      const _errors = product.isValid()

      setErrors(_errors)
      if (Object.keys(_errors).length) {
        return
      }

      await productService.create(product)

      clearForm()

      navigate(UrlRoutes.Products, { replace: true })
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

  const loadCategories = async () => {
    try {
      const [items] = await categoryService.getAll(1, '')
      setCategories(items)
    } catch (error) {
      if (isServerException(error)) {
        const { message } = error as ServerException
        console.error(message)
        setErrorMessage(message)
      }
    }
  }

  useEffect(() => {
    loadCategories()
  }, [])

  return (
    <>
      <Content title='Nuevo producto' open={open} toggleDrawer={toggleDrawer}>
        <Grid item xs={12}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <ProductForm
              isLoading={isLoading}
              categories={categories}
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
