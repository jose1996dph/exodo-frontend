import { Grid, Paper } from '@mui/material'
import { useEffect, useState } from 'react'
import { OrderDetail } from '../../domains/order.domain'
import { makeOrderProductService } from '../../services/orderProduct.service'
import { makeOrderService } from '../../services/order.service'
import { makeDiscountService } from '../../services/discount.service'
import { ToggleDrawerHandler } from '../molecules/CustomAppBar'
import Content from '../organisms/Content'
import OrderDetails from '../organisms/OrderDetails'
import {
  OrderProductItem,
  CreateOrderProduct,
  UpdateOrderProduct,
} from '../../domains/orderProduct.domain'
import { ProductItem } from '../../domains/product.domain'
import { useParams } from 'react-router-dom'
import { makeProductService } from '../../services/product.service'
import ConfirmDialog from '../atoms/ConfirmDialog'
import { CreateDiscount, DiscountItem, UpdateDiscount } from '../../domains/discount.domain'
import OrderProductForm from '../molecules/OrderProductForm'
import { SupplierDetail } from '../../domains/supplier.domain'
import { makeSupplierService } from '../../services/supplier.service'
import { makeCustomerService } from '../../services/customer.service'
import { CustomerDetail } from '../../domains/customer.domain'

type OrderPageProps = {
  open: boolean
  toggleDrawer: ToggleDrawerHandler
}

export default function Order({ open, toggleDrawer }: OrderPageProps) {
  const [discounts, setDiscounts] = useState<DiscountItem[]>([])
  const [orderDiscountBy, setOrderDiscountBy] = useState<string>('percentage')
  const [orderDiscountDirection, setOrderDiscountDirection] = useState<'asc' | 'desc'>('asc')
  const [pageDiscounts, setPageDiscounts] = useState(1)
  const [pagesDiscounts, setPagesDiscounts] = useState(0)
  const [openModalToDeleteDiscount, setOpenModalToDeleteDiscount] = useState(false)
  const [selectedDiscountIdToDelete, setSelectedDiscountIdToDelete] = useState(0)
  const [selectedDiscountToEdit, setSelectedDiscountToEdit] = useState<DiscountItem>()

  const [order, setOrder] = useState<OrderDetail | undefined>(undefined)
  const [supplier, setSupplier] = useState<SupplierDetail | undefined>(undefined)
  const [customer, setCustomer] = useState<CustomerDetail | undefined>(undefined)
  const [products, setProducts] = useState<ProductItem[]>([])
  const [orderProducts, setOrderProducts] = useState<OrderProductItem[]>([])
  const [orderBy, setOrderBy] = useState<string>('name')
  const [orderDirection, setOrderDirection] = useState<'asc' | 'desc'>('asc')
  // const [productsNoOrder, setProductsNoOrder] = useState<ProductItem[]>([])
  const [productSelected, setProductSelected] = useState<ProductItem>()
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [searchText, setSearchText] = useState<string>('')
  const [quantity, setQuantity] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [productPages, setProductPages] = useState(0)
  const [productPage, setProductPage] = useState(1)
  const [openModal, setOpenModal] = useState(false)
  const [selectedIdToDelete, setSelectedIdToDelete] = useState(0)
  const [selectedToEdit, setSelectedToEdit] = useState<OrderProductItem>()
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(0)

  const orderService = makeOrderService()
  const orderProductService = makeOrderProductService()
  const productService = makeProductService()
  const discountService = makeDiscountService()
  const supplierService = makeSupplierService()
  const customerService = makeCustomerService()

  const { id } = useParams()

  const loadDiscounts = async () => {
    try {
      if (!id) {
        return
      }
      const orderId = parseInt(id)
      const [_discounts, _pages] = await discountService.getAll(
        orderId,
        pageDiscounts,
        '',
        orderDiscountBy,
        orderDiscountDirection,
      )
      setDiscounts(_discounts)
      setPagesDiscounts(_pages)
    } catch {
      console.error('error')
    }
  }

  const submitDiscount = async (percentage: number, deadline: number) => {
    if (selectedDiscountToEdit) {
      await editDiscount(new UpdateDiscount(percentage, deadline))
      return
    }
    await addDiscount(new CreateDiscount(percentage, deadline))
  }

  const editDiscount = async (discount: UpdateDiscount) => {
    try {
      if (!id) {
        return
      }
      const _errors = discount.isValid()

      setErrors(_errors)
      if (Object.keys(_errors).length) {
        throw _errors
      }

      const orderId = parseInt(id)
      const _discountId = selectedDiscountToEdit?.id || 0
      await discountService.update(orderId, _discountId, discount)

      loadDiscounts()
      setSelectedDiscountToEdit(undefined)
    } catch (error) {
      console.error(error)
    }
  }

  const addDiscount = async (discount: CreateDiscount) => {
    try {
      if (!id) {
        return
      }

      const _errors = discount.isValid()

      setErrors(_errors)
      if (Object.keys(_errors).length) {
        throw _errors
      }

      const orderId = parseInt(id)
      await discountService.create(orderId, discount)

      loadDiscounts()
      setSelectedDiscountToEdit(undefined)
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  const handleDeleteDiscount = async () => {
    try {
      if (!id) {
        return
      }

      const orderId = parseInt(id)
      await discountService.delete(orderId, selectedDiscountIdToDelete)

      loadDiscounts()
      setSelectedDiscountIdToDelete(0)
      setSelectedDiscountToEdit(undefined)
    } catch (e) {
      console.error(e)
    }
  }

  const loadOrder = async () => {
    try {
      if (!id) {
        return
      }
      const orderId = parseInt(id)
      const _order = await orderService.getById(orderId)
      setOrder(_order)

      loadSupplier(_order.supplierId)
      loadCustomer(_order.customerId)
    } catch {
      console.error('error')
    }
  }

  const loadSupplier = async (supplierId: number) => {
    try {
      const _supplier = await supplierService.getById(supplierId)
      setSupplier(_supplier)
      loadProductsNotOrder()
    } catch {
      console.error('error')
    }
  }

  const loadCustomer = async (customerId: number) => {
    try {
      const _customer = await customerService.getById(customerId)
      setCustomer(_customer)
    } catch {
      console.error('error')
    }
  }

  const loadProducts = async () => {
    setIsLoading(true)
    try {
      if (!id) {
        return
      }
      const orderId = parseInt(id)
      const [_orderProducts, _pages] = await orderProductService.getAll(
        orderId,
        page,
        '',
        orderBy,
        orderDirection,
      )
      setOrderProducts(_orderProducts)
      setPages(_pages)
    } catch {
      console.error('error')
    } finally {
      setIsLoading(false)
    }
  }

  const submitOrderProduct = async () => {
    if (selectedToEdit) {
      await editOrderProduct()
      return
    }
    await addOrderProduct()
  }

  const editOrderProduct = async () => {
    try {
      if (!id) {
        return
      }

      if (!selectedToEdit) {
        return
      }

      const orderId = parseInt(id)
      const _quantity = parseFloat(quantity)

      const orderProduct = new UpdateOrderProduct(selectedToEdit.product, _quantity)

      const _errors = orderProduct.isValid()

      setErrors(_errors)
      if (Object.keys(_errors).length) {
        return
      }

      const _productId = selectedToEdit?.productId || 0
      await orderProductService.update(orderId, _productId, orderProduct)

      loadOrder()
      loadProducts()
      clearForm()
    } catch {
      console.error('error')
    }
  }

  const addOrderProduct = async () => {
    try {
      if (!id) {
        return
      }

      if (!productSelected) {
        return
      }

      const orderId = parseInt(id)
      const _quantity = parseFloat(quantity)

      const orderProduct = new CreateOrderProduct(productSelected, _quantity)

      const _errors = orderProduct.isValid()

      setErrors(_errors)
      if (Object.keys(_errors).length) {
        return
      }

      await orderProductService.create(orderId, orderProduct)

      loadOrder()
      loadProducts()
      clearForm()
    } catch {
      console.error('error')
    }
  }

  const addMoreProductsSupplier = async (nextPage: number) => {
    try {
      if (!supplier) {
        return
      }
      if (!id) {
        return
      }

      const orderId = parseInt(id)
      const supplierId = supplier.id
      const _products = await productService.getAll(nextPage, searchText, supplierId, 0, orderId)
      setProducts([...products, ..._products[0]])
      setProductPages(_products[1])
      setProductPage(nextPage)
    } catch {
      console.error('error')
    }
  }

  const handlerDeleteOrderProduct = async () => {
    try {
      if (!id) {
        return
      }

      const orderId = parseInt(id)
      await orderProductService.delete(orderId, selectedIdToDelete)

      clearForm()
      loadOrder()
      loadProducts()
      loadProductsNotOrder()
    } catch {
      console.error('error')
    }
  }

  const clearForm = () => {
    setErrors({})
    setQuantity('')
    setProductSelected(undefined)
    setSelectedToEdit(undefined)
    setSearchText('')
  }

  const loadProductsNotOrder = async () => {
    try {
      if (!id) {
        return
      }
      if (!supplier) {
        return
      }
      const orderId = parseInt(id)
      const _product = await productService.getAll(1, searchText, supplier.id, 0, orderId)
      setProducts(_product[0])
      setProductPages(_product[1])
      setProductPage(1)
      setErrors({})
    } catch {
      console.error('error')
    } finally {
      setIsLoading(false)
    }
  }

  const handlerSelectToEdit = (item: OrderProductItem) => {
    if (!item) {
      return
    }
    const _product = item.product as ProductItem

    setProductSelected(_product)
    setQuantity(item.quantity.toString())
    setSelectedToEdit(item)
    setProducts([_product])
    setSearchText(item.product.name + ' - ' + item.product.presentation)
  }

  const openAlertToDeleteDiscount = (id: number) => {
    setOpenModalToDeleteDiscount(true)
    setSelectedDiscountIdToDelete(id)
  }

  const openAlert = (id: number) => {
    setOpenModal(true)
    setSelectedIdToDelete(id)
  }

  useEffect(() => {
    loadOrder()
  }, [])

  useEffect(() => {
    loadDiscounts()
  }, [pageDiscounts, orderDiscountDirection, orderDiscountBy])

  useEffect(() => {
    loadProducts()
  }, [page, orderDirection, orderBy])

  useEffect(() => {
    setIsLoading(true)
    const timeOutId = setTimeout(() => loadProductsNotOrder(), 1000)
    return () => clearTimeout(timeOutId)
  }, [searchText, supplier])

  return (
    <>
      <ConfirmDialog
        open={openModalToDeleteDiscount}
        setOpen={setOpenModalToDeleteDiscount}
        onCancel={() => setSelectedDiscountIdToDelete(0)}
        content='¿Está seguro de eliminar este descuento del proveedor?'
        onAcept={handleDeleteDiscount}
      />
      <ConfirmDialog
        open={openModal}
        setOpen={setOpenModal}
        onCancel={() => setSelectedIdToDelete(0)}
        content='¿Está seguro de eliminar este producto del proveedor?'
        onAcept={handlerDeleteOrderProduct}
      />
      <Content title='Proveedores' open={open} toggleDrawer={toggleDrawer}>
        <OrderDetails title='Información del proveedor' obj={order}></OrderDetails>
        <OrderProductForm
          pages={pages}
          page={page}
          setPage={setPage}
          orderBy={orderBy}
          setOrderBy={setOrderBy}
          orderDirection={orderDirection}
          setOrderDirection={setOrderDirection}
          onDelete={(_, item: OrderProductItem) => openAlert(item.productId)}
          onUpdate={(_, item: OrderProductItem) => handlerSelectToEdit(item)}
          products={products}
          isLoading={isLoading}
          searchProductText={searchText}
          setSearchProductText={setSearchText}
          productSelected={productSelected}
          setProductSelected={setProductSelected}
          orderProducts={orderProducts}
          autoCompleteDisable={selectedToEdit != undefined}
          autoCompleteOnScroll={() => {
            if (productPage === productPages) {
              return
            }
            addMoreProductsSupplier(productPage + 1)
          }}
          quantity={quantity}
          setQuantity={setQuantity}
          quantityDisable={isLoading}
          onAddHandler={() => submitOrderProduct()}
          errors={errors}
          data={orderProducts}
        ></OrderProductForm>
      </Content>
    </>
  )
}
