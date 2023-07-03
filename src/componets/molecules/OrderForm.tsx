import { AutocompleteRenderInputParams, Box, Grid, Paper, TextField } from '@mui/material'
import CustomTextField from '../atoms/CustomTextField'
import CustomButton from '../atoms/CustomButton'
import Title from '../atoms/Title'
import { ReactNode, useEffect, useState } from 'react'
import CustomAutocomplete from '../atoms/CustomAutocomplete'
import { CustomerItem } from '../../domains/customer.domain'
import { SupplierItem } from '../../domains/supplier.domain'
import { ProductItem } from '../../domains/product.domain'
import { OrderProductItem } from '../../domains/orderProduct.domain'
import OrderProductTable from '../organisms/OrderProductTable'
import { OrderDetail } from '../../domains/order.domain'
import { makeCustomerService } from '../../services/customer.service'
import { makeSupplierService } from '../../services/supplier.service'
import { makeProductService } from '../../services/product.service'
import ConfirmDialog from '../atoms/ConfirmDialog'

type SubmitHandler = (customerId: number, supplierId: number, products: OrderProductItem[]) => void
type AddProductHandler = (product: ProductItem, quantity: number) => void
type OnEditProductHandler = (product: ProductItem, quantity: number) => void
type OnDeleteProductHandler = (product: ProductItem) => void

type CategoryFormProps = {
  orderProducts: OrderProductItem[]
  isLoading: boolean
  order?: OrderDetail | undefined
  errors: Record<string, string>
  onSubmit: SubmitHandler
  onAddProduct: AddProductHandler
  onEditProduct: OnEditProductHandler
  onDeleteProduct: OnDeleteProductHandler
}

export default function OrderForm({
  isLoading,
  order,
  errors,
  onSubmit,
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
  orderProducts,
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
  const [orderBy, setOrderBy] = useState<string>('description')
  const [openModal, setOpenModal] = useState(false)
  const [orderDirection, setOrderDirection] = useState<'asc' | 'desc'>('asc')
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(0)
  const [selectedToEdit, setSelectedToEdit] = useState<OrderProductItem>()
  const [selectedToDelete, setSelectedToDelete] = useState<OrderProductItem>()

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

  const loadCustomers = async () => {
    try {
      const _customers = await customerService.getAll(1, searchCustomerText)
      setCustomers(_customers[0])
      setCustomerPages(_customers[1])
      setCustomerPage(1)
      // setErrors({})
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
      // setErrors({})
    } catch {
      console.error('error')
    }
  }

  const loadProducts = async () => {
    try {
      if (!supplierSelected) {
        return
      }

      const _product = await productService.getAll(1, searchProductText, supplierSelected.id)

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
      const _customers = await customerService.getAll(nextPage, searchCustomerText)
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
      const _products = await productService.getAll(nextPage, searchProductText, supplierId)
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
    if (order) {
      return
    }
  }, [order])

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
  }, [searchProductText, supplierSelected])

  return (
    <>
      <ConfirmDialog
        open={openModal}
        setOpen={setOpenModal}
        onCancel={() => setSelectedToDelete(undefined)}
        content='¿Está seguro de eliminar este producto?'
        onAcept={handlerOnDeleteProduct}
      />
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
      <Grid container spacing={0.5}>
        <Grid item xs={12}>
          <Title>Productos</Title>
        </Grid>
        <Grid item xs={12}>
          <CustomAutocomplete
            disableClearable
            id='products'
            isOptionEqualToValue={(option, value) => option.id === value.id}
            setValue={(value) => setProductSelected(value)}
            searchText={searchProductText}
            setSearchText={setSearchProductText}
            getOptionLabel={(product) => product.name}
            options={products}
            isLoading={isLoading}
            disabled={!supplierSelected || selectedToEdit != undefined}
            onScroll={() => {
              if (productPage === productPages) {
                return
              }
              addMoreProductsSupplier(productPage + 1)
            }}
            renderInput={(params: AutocompleteRenderInputParams): ReactNode => (
              <TextField
                label='Producto'
                margin='normal'
                error={errors['productId'] ? true : false}
                helperText={errors['productId']}
                {...params}
              ></TextField>
            )}
          ></CustomAutocomplete>
        </Grid>
        <Grid item xs={12}>
          <CustomTextField
            id='quantity'
            label='Cantidad'
            placeholder='Cantidad'
            value={quantity}
            disabled={isLoading || !supplierSelected}
            error={errors['quantity'] ? true : false}
            helperText={errors['quantity']}
            onChange={(event) => setQuantity(event.target.value)}
          ></CustomTextField>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CustomButton
              fullWidth={false}
              sx={{ mt: 2, ml: 1 }}
              id='addProduct'
              text='Agregar'
              href=''
              onClick={() => handlerOnAddProduct(productSelected, quantity)}
              disabled={isLoading || !productSelected}
            ></CustomButton>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <OrderProductTable
              pages={pages}
              page={page}
              setPage={setPage}
              orderBy={orderBy}
              setOrderBy={setOrderBy}
              orderDirection={orderDirection}
              setOrderDirection={setOrderDirection}
              data={orderProducts}
              onDelete={(_, item) => openAlert(item)}
              onUpdate={(_, item) => handlerSelectToEdit(item)}
            ></OrderProductTable>
          </Paper>
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <CustomButton
          fullWidth={false}
          sx={{ mt: 2, ml: 1 }}
          id='submit'
          text='Guardar'
          href=''
          onClick={() =>
            onSubmit(customerSelected?.id || 0, supplierSelected?.id || 0, orderProducts)
          }
          disabled={isLoading}
        ></CustomButton>
      </Box>
    </>
  )
}
