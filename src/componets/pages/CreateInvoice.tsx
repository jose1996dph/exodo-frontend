import { Alert } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { CreateInvoice as CreateInvoiceRequest } from '../../domains/invoice.domain'
import ServerException, { isServerException } from '../../domains/error.domain'
import { UrlRoutes } from '../../framework/routes/routes'
import { ToggleDrawerHandler } from '../molecules/CustomAppBar'
import Content from '../organisms/Content'
import { makeInvoiceService } from '../../services/invoice.service'
import InvoiceForm from '../molecules/InvoiceForm'
import {
  CreateInvoiceProduct,
  InvoiceProductItem,
  UpdateInvoiceProduct,
} from '../../domains/invoiceProduct.domain'
import { ProductItem } from '../../domains/product.domain'
import { makeOrderService } from '../../services/order.service'
import { makeOrderProductService } from '../../services/orderProduct.service'
import { SupplierItem } from '../../domains/supplier.domain'
import { CustomerItem } from '../../domains/customer.domain'

type CreateInvoicePageProps = {
  open: boolean
  toggleDrawer: ToggleDrawerHandler
}

export default function CreateInvoice({ open, toggleDrawer }: CreateInvoicePageProps) {
  const [errorMessage, setErrorMessage] = useState<string | string[]>('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [total, setTotal] = useState<number>(0)
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [invoiceProducts, setInvoiceProducts] = useState<InvoiceProductItem[]>([])
  const [displayableInvoiceProduct, setDisplayableInvoiceProduct] = useState<InvoiceProductItem[]>(
    [],
  )
  const [searchCustomerText, setSearchCustomerText] = useState('')
  const [searchSupplierText, setSearchSupplierText] = useState('')

  const [customerSelected, setCustomerSelected] = useState<CustomerItem>()
  const [supplierSelected, setSupplierSelected] = useState<SupplierItem>()

  const orderService = makeOrderService()
  const orderProductService = makeOrderProductService()
  const invoiceService = makeInvoiceService()

  const location = useLocation()
  const navigate = useNavigate()

  const orderId = new URLSearchParams(location.search).get('orderId')

  const calculatePages = (lengthInvoiceProduct: number) => {
    if (lengthInvoiceProduct === 0) {
      setPage(1)
      setPages(0)
    }

    const _pages = ((lengthInvoiceProduct - 1) / 10 + 1) >> 0
    if (page > _pages) {
      setPage(_pages)
    }

    setPages(_pages)
  }

  const handleSubmit = async (customerId: number, supplierId: number) => {
    setIsLoading(true)
    try {
      const invoice = new CreateInvoiceRequest(customerId, supplierId, invoiceProducts)

      const _errors = invoice.isValid()

      setErrors(_errors)
      if (Object.keys(_errors).length) {
        return
      }

      await invoiceService.create(invoice)

      clearForm()

      navigate(UrlRoutes.Invoices, { replace: true })
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
      const invoiceProductItem = new CreateInvoiceProduct(product, quantity)
      let _errors = invoiceProductItem.isValid()

      setErrors(_errors)
      if (Object.keys(_errors).length) {
        throw _errors
      }
      if (invoiceProducts.some((o) => o.productId === product.id)) {
        _errors = { productId: 'Producto ya esta en el listado' }
        setErrors(_errors)
        throw _errors
      }

      invoiceProducts.push(invoiceProductItem.toInvoiceProductItem())
      setInvoiceProducts(invoiceProducts)
      let _total = 0
      invoiceProducts.forEach((op) => (_total = _total + op.calculatePrice()))
      calculatePages(invoiceProducts.length)
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
      const invoiceProductItem = new UpdateInvoiceProduct(product, quantity)
      const _errors = invoiceProductItem.isValid()

      setErrors(_errors)
      if (Object.keys(_errors).length) {
        throw _errors
      }

      const newInvoiceProductItem = invoiceProductItem.toInvoiceProductItem()

      const _invoiceProducts = invoiceProducts.filter(
        (o) => o.productId != newInvoiceProductItem.productId,
      )

      _invoiceProducts.push(newInvoiceProductItem)
      setInvoiceProducts(_invoiceProducts)
      let _total = 0
      invoiceProducts.forEach((op) => (_total = _total + op.calculatePrice()))
      calculatePages(invoiceProducts.length)
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
      const _invoiceProducts = invoiceProducts.filter((o) => o.productId != product.id)
      setInvoiceProducts(_invoiceProducts)
      let _total = 0
      invoiceProducts.forEach((op) => (_total = _total + op.calculatePrice()))
      calculatePages(invoiceProducts.length)
      setTotal(_total)
    } catch (error) {
      console.error(error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const handlerLoadInvoiceByOrder = async (orderId: number) => {
    try {
      const order = await orderService.getById(orderId)

      setSearchCustomerText(order.customer.businessName)
      setSearchSupplierText(order.supplier.name)

      setCustomerSelected(order.customer)
      setSupplierSelected(order.supplier)

      const [orderProducts, _] = await orderProductService.getAll(orderId, 1, '')

      const _invoiceProducts = orderProducts.map((x) => x.toInvoiceProduct())

      setInvoiceProducts(_invoiceProducts)
      let _total = 0
      _invoiceProducts.forEach((ip) => (_total = _total + ip.calculatePrice()))
      calculatePages(_invoiceProducts.length)
      setTotal(_total)

      // loadDisplayableInvoiceProduct(_invoiceProducts)
    } catch (error) {
      console.error(error)
    }
  }

  const loadDisplayableInvoiceProduct = (_invoiceProducts: InvoiceProductItem[]) => {
    const numberOfRecords = 10
    const _page = (page - 1) * numberOfRecords

    if (_invoiceProducts.length <= _page + numberOfRecords) {
      setDisplayableInvoiceProduct(_invoiceProducts.slice(_page))
      return
    }

    setDisplayableInvoiceProduct(_invoiceProducts.slice(_page, _page + numberOfRecords))
  }

  const clearForm = () => {
    setErrors({})
    setErrorMessage('')
  }

  useEffect(() => {
    if (!orderId) {
      return
    }

    const _orderId = parseInt(orderId)
    handlerLoadInvoiceByOrder(_orderId)
  }, [])

  useEffect(() => {
    loadDisplayableInvoiceProduct(invoiceProducts)
  }, [page, total])

  return (
    <>
      <Content title='Nuevo invoiceo' open={open} toggleDrawer={toggleDrawer}>
        <InvoiceForm
          isLoading={isLoading}
          page={page}
          pages={pages}
          setPage={setPage}
          errors={errors}
          total={total}
          customerSelected={customerSelected}
          setCustomerSelected={setCustomerSelected}
          supplierSelected={supplierSelected}
          setSupplierSelected={setSupplierSelected}
          searchCustomerText={searchCustomerText}
          setSearchCustomerText={setSearchCustomerText}
          searchSupplierText={searchSupplierText}
          setSearchSupplierText={setSearchSupplierText}
          onSubmit={handleSubmit}
          onAddProduct={handlerOnAddProduct}
          onEditProduct={handlerOnEditProduct}
          onDeleteProduct={handlerOnDeleteProduct}
          invoiceProducts={displayableInvoiceProduct}
          setInvoiceProducts={setInvoiceProducts}
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
