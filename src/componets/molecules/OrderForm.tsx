import { AutocompleteRenderInputParams, Grid, Paper, TextField } from '@mui/material'
import Title from '../atoms/Title'
import { ReactNode, useEffect, useState } from 'react'
import CustomAutocomplete from '../atoms/CustomAutocomplete'
import { CustomerItem } from '../../domains/customer.domain'
import { SupplierItem } from '../../domains/supplier.domain'
import { ProductItem } from '../../domains/product.domain'
import { OrderProductItem } from '../../domains/orderProduct.domain'
import { makeCustomerService } from '../../services/customer.service'
import { makeSupplierService } from '../../services/supplier.service'
import { makeProductService } from '../../services/product.service'
import ConfirmDialog from '../atoms/ConfirmDialog'
import OrderProductForm from './OrderProductForm'
import { makeDiscountService } from '../../services/discount.service'
import { DiscountItem } from '../../domains/discount.domain'

type SubmitHandler = (customerId: number, supplierId: number) => void
type AddProductHandler = (product: ProductItem, quantity: number) => void
type OnEditProductHandler = (product: ProductItem, quantity: number) => void
type OnDeleteProductHandler = (product: ProductItem) => void

type CategoryFormProps = {
  orderProducts: OrderProductItem[]
  setOrderProducts: (orderProduct: OrderProductItem[]) => void
  isLoading: boolean
  total: number
  errors: Record<string, string>
  page: number
  pages: number
  orderBy: string
  setOrderBy: (value: string) => void
  orderDirection: 'asc' | 'desc'
  setOrderDirection: (value: 'asc' | 'desc') => void
  setPage: (page: number) => void
  onSubmit: SubmitHandler
  onAddProduct: AddProductHandler
  onEditProduct: OnEditProductHandler
  onDeleteProduct: OnDeleteProductHandler
}

export default function OrderForm({
  isLoading,
  total,
  page,
  pages,
  errors,
  orderBy,
  setOrderBy,
  orderDirection,
  setOrderDirection,
  setPage,
  onSubmit,
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
  orderProducts,
  setOrderProducts,
}: CategoryFormProps) {
  const [customers, setCustomers] = useState<CustomerItem[]>([])
  const [suppliers, setSuppliers] = useState<SupplierItem[]>([])
  const [products, setProducts] = useState<ProductItem[]>([])

  const [customerSelected, setCustomerSelected] = useState<CustomerItem>()
  const [supplierSelected, setSupplierSelected] = useState<SupplierItem>()
  const [productSelected, setProductSelected] = useState<ProductItem>()

  const [searchCustomerText, setSearchCustomerText] = useState('')
  const [searchSupplierText, setSearchSupplierText] = useState('')
  const [searchProductText, setSearchProductText] = useState('')

  const [customerPage, setCustomerPage] = useState(1)
  const [supplierPage, setSupplierPage] = useState(1)
  const [productPage, setProductPage] = useState(1)

  const [customerPages, setCustomerPages] = useState(1)
  const [supplierPages, setSupplierPages] = useState(1)
  const [productPages, setProductPages] = useState(1)

  const [quantity, setQuantity] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const [selectedToEdit, setSelectedToEdit] = useState<OrderProductItem>()
  const [selectedToDelete, setSelectedToDelete] = useState<OrderProductItem>()

  const [discounts, setDiscounts] = useState<DiscountItem[]>([])

  const discountService = makeDiscountService()
  const customerService = makeCustomerService()
  const supplierService = makeSupplierService()
  const productService = makeProductService()

  const clearProductForm = () => {
    setQuantity('')
    setSearchProductText('')
    setProductSelected(undefined)
    setSelectedToEdit(undefined)
    setSelectedToDelete(undefined)
  }

  const openAlert = (orderProduct: OrderProductItem) => {
    setSelectedToDelete(orderProduct)
    setOpenModal(true)
  }

  const handlerSelectToEdit = (orderProduct: OrderProductItem) => {
    setSelectedToEdit(orderProduct)
    setSearchProductText(orderProduct.product.name)
    setProductSelected(orderProduct.product as ProductItem)
  }

  const loadDiscounts = async () => {
    try {
      if (!supplierSelected) {
        return
      }
      const [_discounts, _pages] = await discountService.getAll(
        supplierSelected.id,
        1,
        '',
        'percentage',
        'asc',
      )
      setDiscounts(_discounts)
    } catch {
      console.error('error')
    }
  }

  const loadCustomers = async () => {
    try {
      const _customers = await customerService.getAll(1, searchCustomerText, true)
      setCustomers(_customers[0])
      setCustomerPages(_customers[1])
      setCustomerPage(1)
    } catch {
      console.error('error')
    }
  }

  const loadSuppliers = async () => {
    try {
      const _suppliers = await supplierService.getAll(1, searchSupplierText)
      setSuppliers(_suppliers[0])
      setSupplierPages(_suppliers[1])
      setSupplierPage(1)
    } catch {
      console.error('error')
    }
  }

  const loadProducts = async () => {
    try {
      if (!supplierSelected) {
        return
      }

      const _product = await productService.getAll(
        1,
        searchProductText,
        supplierSelected.id,
        0,
        0,
        true,
      )

      setProducts(_product[0])
      setProductPages(_product[1])
      setProductPage(1)
      if (productSelected && !_product[0].some((p) => p.id == productSelected.id)) {
        setSearchProductText('')
        setProductSelected(undefined)
      }
    } catch {
      console.error('error')
    }
  }

  const addMoreCustomers = async (nextPage: number) => {
    try {
      const _customers = await customerService.getAll(nextPage, searchCustomerText, true)
      setCustomers([...customers, ..._customers[0]])
      setCustomerPages(_customers[1])
      setCustomerPage(nextPage)
    } catch {
      console.error('error')
    }
  }

  const addMoreSuppliers = async (nextPage: number) => {
    try {
      const _suppliers = await supplierService.getAll(nextPage, searchSupplierText)
      setSuppliers([...suppliers, ..._suppliers[0]])
      setSupplierPages(_suppliers[1])
      setSupplierPage(nextPage)
    } catch {
      console.error('error')
    }
  }

  const addMoreProductsSupplier = async (nextPage: number) => {
    try {
      if (!supplierSelected) {
        return
      }
      const supplierId = supplierSelected.id
      const _products = await productService.getAll(
        nextPage,
        searchProductText,
        supplierId,
        0,
        0,
        true,
      )
      setProducts([...products, ..._products[0]])
      setProductPages(_products[1])
      setProductPage(nextPage)
    } catch {
      console.error('error')
    }
  }

  const handlerOnAddProduct = async (product: ProductItem | undefined, quantity: string) => {
    try {
      if (!product) {
        return
      }
      const _quantity = parseInt(quantity)
      if (selectedToEdit) {
        await onEditProduct(product, _quantity)
      } else {
        await onAddProduct(product, _quantity)
      }
      clearProductForm()
    } catch (error) {
      console.error()
    }
  }

  const handlerOnDeleteProduct = () => {
    try {
      onDeleteProduct(selectedToDelete?.product as ProductItem)
      clearProductForm()
    } catch (error) {
      console.error(error)
    }
    if (!selectedToDelete) {
      return
    }
  }

  useEffect(() => {
    const timeOutId = setTimeout(() => loadCustomers(), 1000)
    return () => clearTimeout(timeOutId)
  }, [searchCustomerText])

  useEffect(() => {
    const timeOutId = setTimeout(() => loadSuppliers(), 1000)
    return () => clearTimeout(timeOutId)
  }, [searchSupplierText])

  useEffect(() => {
    const timeOutId = setTimeout(() => loadProducts(), 1000)
    return () => clearTimeout(timeOutId)
  }, [searchProductText])

  useEffect(() => {
    setOrderProducts([])
    loadProducts()
    loadDiscounts()
  }, [supplierSelected])

  return (
    <>
      <ConfirmDialog
        open={openModal}
        setOpen={setOpenModal}
        onCancel={() => setSelectedToDelete(undefined)}
        content='¿Está seguro de eliminar este producto?'
        onAcept={handlerOnDeleteProduct}
      />
      <Grid item xs={12}>
        <Paper
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Grid container spacing={0.5}>
            <Grid item xs={12}>
              <Title>Información de orden de venta</Title>
            </Grid>
            <Grid item xs={12}>
              <CustomAutocomplete
                disableClearable
                id='customers'
                isOptionEqualToValue={(option, value) => option.id === value.id}
                setValue={(value) => setCustomerSelected(value)}
                searchText={searchCustomerText}
                setSearchText={setSearchCustomerText}
                getOptionLabel={(customer) => customer.businessName}
                options={customers}
                isLoading={isLoading}
                onScroll={() => {
                  if (customerPage === customerPages) {
                    return
                  }
                  addMoreCustomers(customerPage + 1)
                }}
                renderInput={(params: AutocompleteRenderInputParams): ReactNode => (
                  <TextField
                    label='Cliente'
                    margin='normal'
                    error={errors['customerId'] ? true : false}
                    helperText={errors['customerId']}
                    {...params}
                  ></TextField>
                )}
              ></CustomAutocomplete>
            </Grid>
            <Grid item xs={12}>
              <CustomAutocomplete
                disableClearable
                id='suppliers'
                isOptionEqualToValue={(option, value) => option.id === value.id}
                setValue={(value) => setSupplierSelected(value)}
                searchText={searchSupplierText}
                setSearchText={setSearchSupplierText}
                getOptionLabel={(supplier) => supplier.name}
                options={suppliers}
                isLoading={isLoading}
                onScroll={() => {
                  if (supplierPage === supplierPages) {
                    return
                  }
                  addMoreSuppliers(productPage + 1)
                }}
                renderInput={(params: AutocompleteRenderInputParams): ReactNode => (
                  <TextField
                    label='Proveedor'
                    margin='normal'
                    error={errors['supplierId'] ? true : false}
                    helperText={errors['supplierId']}
                    {...params}
                  ></TextField>
                )}
              ></CustomAutocomplete>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <OrderProductForm
        orderTotal={total}
        discounts={discounts}
        pages={pages}
        page={page}
        setPage={setPage}
        orderBy={orderBy}
        setOrderBy={setOrderBy}
        orderDirection={orderDirection}
        setOrderDirection={setOrderDirection}
        onDelete={(_, item) => openAlert(item)}
        onUpdate={(_, item) => handlerSelectToEdit(item)}
        products={products}
        isLoading={isLoading}
        searchProductText={searchProductText}
        setSearchProductText={setSearchProductText}
        productSelected={productSelected}
        setProductSelected={setProductSelected}
        orderProducts={orderProducts}
        autoCompleteDisable={!supplierSelected || selectedToEdit != undefined}
        autoCompleteOnScroll={() => {
          if (productPage === productPages) {
            return
          }
          addMoreProductsSupplier(productPage + 1)
        }}
        quantity={quantity}
        setQuantity={setQuantity}
        quantityDisable={isLoading || !supplierSelected}
        onAddHandler={() => handlerOnAddProduct(productSelected, quantity)}
        errors={errors}
        data={orderProducts}
        onSubmit={() => onSubmit(customerSelected?.id || 0, supplierSelected?.id || 0)}
      ></OrderProductForm>
    </>
  )
}
