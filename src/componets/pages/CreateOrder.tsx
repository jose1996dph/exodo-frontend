import { Alert } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CreateOrder as CreateOrderRequest } from '../../domains/order.domain'
import ServerException, { isServerException } from '../../domains/error.domain'
import { UrlRoutes } from '../../framework/routes/routes'
import { ToggleDrawerHandler } from '../molecules/CustomAppBar'
import Content from '../organisms/Content'
import { makeOrderService } from '../../services/order.service'
import OrderForm from '../molecules/OrderForm'
import {
  CreateOrderProduct,
  OrderProductItem,
  UpdateOrderProduct,
} from '../../domains/orderProduct.domain'
import { ProductItem } from '../../domains/product.domain'

type CreateOrderPageProps = {
  open: boolean
  toggleDrawer: ToggleDrawerHandler
}

export default function CreateOrder({ open, toggleDrawer }: CreateOrderPageProps) {
  const [errorMessage, setErrorMessage] = useState<string | string[]>('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [orderProducts, setOrderProducts] = useState<OrderProductItem[]>([])

  const orderService = makeOrderService()

  const navigate = useNavigate()

  const handleSubmit = async (
    customerId: number,
    supplierId: number,
    products: OrderProductItem[],
  ) => {
    setIsLoading(true)
    try {
      const order = new CreateOrderRequest(customerId, supplierId, products)

      const _errors = order.isValid()

      setErrors(_errors)
      if (Object.keys(_errors).length) {
        return
      }

      await orderService.create(order)

      clearForm()

      navigate(UrlRoutes.Orders, { replace: true })
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

  const handlerOnAddProduct = async (product: ProductItem, quantity: number) => {
    setIsLoading(true)
    try {
      const orderProductItem = new CreateOrderProduct(product, quantity)
      let _errors = orderProductItem.isValid()

      setErrors(_errors)
      if (Object.keys(_errors).length) {
        throw _errors
      }
      if (orderProducts.some((o) => o.productId === product.id)) {
        _errors = { productId: 'Producto ya esta en el listado' }
        setErrors(_errors)
        throw _errors
      }

      orderProducts.push(orderProductItem.toOrderProductItem())
      setOrderProducts(orderProducts)
    } catch (error) {
      console.error(error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const handlerOnEditProduct = async (product: ProductItem, quantity: number) => {
    setIsLoading(true)
    try {
      const orderProductItem = new UpdateOrderProduct(product, quantity)
      const _errors = orderProductItem.isValid()

      setErrors(_errors)
      if (Object.keys(_errors).length) {
        throw _errors
      }

      const newOrderProductItem = orderProductItem.toOrderProductItem()

      const _orderProducts = orderProducts.filter(
        (o) => o.productId != newOrderProductItem.productId,
      )

      _orderProducts.push(newOrderProductItem)

      setOrderProducts(_orderProducts)
    } catch (error) {
      console.error(error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const handlerOnDeleteProduct = async (product: ProductItem) => {
    setIsLoading(true)
    try {
      const _orderProducts = orderProducts.filter((o) => o.productId != product.id)
      setOrderProducts(_orderProducts)
    } catch (error) {
      console.error(error)
      throw error
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
      <Content title='Nuevo ordero' open={open} toggleDrawer={toggleDrawer}>
        <OrderForm
          isLoading={isLoading}
          errors={errors}
          onSubmit={handleSubmit}
          onAddProduct={handlerOnAddProduct}
          onEditProduct={handlerOnEditProduct}
          onDeleteProduct={handlerOnDeleteProduct}
          orderProducts={orderProducts}
          setOrderProducts={setOrderProducts}
        />
        {errorMessage && (
          <Alert sx={{ mt: '10px' }} severity='error'>
            {errorMessage}
          </Alert>
        )}
      </Content>
    </>
  )
}
