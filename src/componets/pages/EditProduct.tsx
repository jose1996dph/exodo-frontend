import { Alert, Grid, Paper } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ProductDetail, UpdateProduct } from '../../domains/product.domain'
import { UrlRoutes } from '../../framework/routes/routes'
import { makeProductService } from '../../services/product.service'
import { ToggleDrawerHandler } from '../molecules/CustomAppBar'
import ServerException, { isServerException } from '../../domains/error.domain'
import ProductForm from '../molecules/ProductForm'
import Content from '../organisms/Content'
import { CategoryItem } from '../../domains/category.domain'
import { makeCategoryService } from '../../services/category.service'

type EditProductPageProps = {
  open: boolean
  toggleDrawer: ToggleDrawerHandler
}

export default function EditProduct({ open, toggleDrawer }: EditProductPageProps) {
  const [errorMessage, setErrorMessage] = useState<string | string[]>('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [product, setProduct] = useState<ProductDetail | undefined>(undefined)
  const [categories, setCategories] = useState<CategoryItem[]>([])

  const productService = makeProductService()
  const categoryService = makeCategoryService()

  const navigate = useNavigate()

  const { id } = useParams()

  const handleSubmit = async (name: string, presentation: string, categoryId: string) => {
    setIsLoading(true)
    try {
      if (!id) {
        return
      }
      const productId = parseInt(id)

      const _categoryId = parseInt(categoryId)

      const product = new UpdateProduct(name, presentation, _categoryId)

      const _errors = product.isValid()

      setErrors(_errors)
      if (Object.keys(_errors).length) {
        return
      }

      await productService.update(productId, product)

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

  const loadProduct = async () => {
    try {
      if (!id) {
        return
      }
      const productId = parseInt(id)
      const _product = await productService.getById(productId)
      setProduct(_product)
    } catch {
      console.error('error')
    }
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
    loadProduct()
  }, [])

  return (
    <>
      <Content title='Actualizar cliente' open={open} toggleDrawer={toggleDrawer}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <ProductForm
              categories={categories}
              isLoading={isLoading}
              product={product}
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
