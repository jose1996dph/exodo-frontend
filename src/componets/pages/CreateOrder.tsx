import { Alert } from '@mui/material'
import { useEffect, useState } from 'react'
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
  const [total, setTotal] = useState<number>(0)
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [orderProducts, setOrderProducts] = useState<OrderProductItem[]>([])
  const [displayableOrderProduct, setDisplayableOrderProduct] = useState<OrderProductItem[]>([])

  const orderService = makeOrderService()

  const navigate = useNavigate()

  const calculatePages = (lengthOrderProduct: number) => {
    if (lengthOrderProduct === 0) {
      setPage(1)
      setPages(0)
    }

    const _pages = ((lengthOrderProduct - 1) / 10 + 1) >> 0
    if (page > _pages) {
      setPage(_pages)
    }

    setPages(_pages)
  }

  const handleSubmit = async (customerId: number, supplierId: number) => {
    setIsLoading(true)
    try {
      const order = new CreateOrderRequest(customerId, supplierId, orderProducts)

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
      orderProducts.length
      setOrderProducts(orderProducts)
      let _total = 0
      orderProducts.forEach((op) => (_total = _total + op.calculatePrice()))
      calculatePages(orderProducts.length)
      setTotal(_total)
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
      let _total = 0
      orderProducts.forEach((op) => (_total = _total + op.calculatePrice()))
      calculatePages(orderProducts.length)
      setTotal(_total)
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
      let _total = 0
      orderProducts.forEach((op) => (_total = _total + op.calculatePrice()))
      calculatePages(orderProducts.length)
      setTotal(_total)
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

  useEffect(() => {
    const numberOfRecords = 10
    const _page = (page - 1) * numberOfRecords

    if (orderProducts.length <= _page + numberOfRecords) {
      setDisplayableOrderProduct(orderProducts.slice(_page))
      return
    }

    setDisplayableOrderProduct(orderProducts.slice(_page, _page + numberOfRecords))
  }, [page, total])

  useEffect(() => {
    if (orderProducts.length > 0) {
      return
    }
    setDisplayableOrderProduct([])
    setTotal(0)
    setPages(0)
    setPage(1)
  }, [orderProducts])

  return (
    <>
      <Content title='Nuevo ordero' open={open} toggleDrawer={toggleDrawer}>
        <OrderForm
          isLoading={isLoading}
          page={page}
          pages={pages}
          setPage={setPage}
          errors={errors}
          total={total}
          onSubmit={handleSubmit}
          onAddProduct={handlerOnAddProduct}
          onEditProduct={handlerOnEditProduct}
          onDeleteProduct={handlerOnDeleteProduct}
          orderProducts={displayableOrderProduct}
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
