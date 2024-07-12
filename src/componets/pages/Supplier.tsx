import { AutocompleteRenderInputParams, Grid, Paper, TextField, Alert } from '@mui/material'
import { ReactNode, useEffect, useState } from 'react'
import { SupplierDetail } from '../../domains/supplier.domain'
import { makeSupplierProductService } from '../../services/supplierProduct.service'
import { makeSupplierService } from '../../services/supplier.service'
import { makeDiscountService } from '../../services/discount.service'
import { ToggleDrawerHandler } from '../molecules/CustomAppBar'
import Content from '../organisms/Content'
import SupplierDetails from '../organisms/SupplierDetails'
import {
  SupplierProductItem,
  CreateSupplierProduct,
  UpdateSupplierProduct,
} from '../../domains/supplierProduct.domain'
import SupplierProductTable from '../organisms/SupplierProductTable'
import CustomTextField from '../atoms/CustomTextField'
import { ProductItem } from '../../domains/product.domain'
import { useParams } from 'react-router-dom'
import { makeProductService } from '../../services/product.service'
import CustomButton from '../atoms/CustomButton'
import CustomAutocomplete from '../atoms/CustomAutocomplete'
import ConfirmDialog from '../atoms/ConfirmDialog'
import { CreateDiscount, DiscountItem, UpdateDiscount } from '../../domains/discount.domain'
import DiscountForm from '../molecules/DiscountForm'
import Title from '../atoms/Title'
import DiscountTable from '../organisms/DiscountTable'

type SupplierPageProps = {
  open: boolean
  toggleDrawer: ToggleDrawerHandler
}

export default function Supplier({ open, toggleDrawer }: SupplierPageProps) {
  const [discounts, setDiscounts] = useState<DiscountItem[]>([])
  const [orderDiscountBy, setOrderDiscountBy] = useState<string>('percentage')
  const [orderDiscountDirection, setOrderDiscountDirection] = useState<'asc' | 'desc'>('asc')
  const [pageDiscounts, setPageDiscounts] = useState(1)
  const [pagesDiscounts, setPagesDiscounts] = useState(0)
  const [openModalToDeleteDiscount, setOpenModalToDeleteDiscount] = useState(false)
  const [selectedDiscountIdToDelete, setSelectedDiscountIdToDelete] = useState(0)
  const [selectedDiscountToEdit, setSelectedDiscountToEdit] = useState<DiscountItem>()

  const [supplier, setSupplier] = useState<SupplierDetail | undefined>(undefined)
  const [products, setProducts] = useState<SupplierProductItem[]>([])
  const [orderBy, setOrderBy] = useState<string>('name')
  const [orderDirection, setOrderDirection] = useState<'asc' | 'desc'>('asc')
  const [productsNoSupplier, setProductsNoSupplier] = useState<ProductItem[]>([])
  const [productSelected, setProductSelected] = useState<ProductItem>()
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [searchText, setSearchText] = useState<string>('')
  const [price, setPrice] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [productPages, setProductPages] = useState(0)
  const [productPage, setProductPage] = useState(1)
  const [openModal, setOpenModal] = useState(false)
  const [selectedIdToDelete, setSelectedIdToDelete] = useState(0)
  const [selectedToEdit, setSelectedToEdit] = useState<SupplierProductItem>()
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(0)

  const supplierService = makeSupplierService()
  const supplierProductService = makeSupplierProductService()
  const productService = makeProductService()
  const discountService = makeDiscountService()

  const { id } = useParams()

  const loadDiscounts = async () => {
    try {
      if (!id) {
        return
      }
      const supplierId = parseInt(id)
      const [_discounts, _pages] = await discountService.getAll(
        supplierId,
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

      const supplierId = parseInt(id)
      const _discountId = selectedDiscountToEdit?.id || 0
      await discountService.update(supplierId, _discountId, discount)

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

      const supplierId = parseInt(id)
      await discountService.create(supplierId, discount)

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

      const supplierId = parseInt(id)
      await discountService.delete(supplierId, selectedDiscountIdToDelete)

      loadDiscounts()
      setSelectedDiscountIdToDelete(0)
      setSelectedDiscountToEdit(undefined)
    } catch (e) {
      console.error(e)
    }
  }

  const loadSupplier = async () => {
    try {
      if (!id) {
        return
      }
      const supplierId = parseInt(id)
      const _supplier = await supplierService.getById(supplierId)
      setSupplier(_supplier)
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
      const supplierId = parseInt(id)
      const [_products, _pages] = await supplierProductService.getAll(
        supplierId,
        page,
        '',
        orderBy,
        orderDirection,
      )
      setProducts(_products)
      setPages(_pages)
    } catch {
      console.error('error')
    } finally {
      setIsLoading(false)
    }
  }

  const submitSupplierProduct = async () => {
    if (selectedToEdit) {
      await editSupplierProduct()
      return
    }
    await addSupplierProduct()
  }

  const editSupplierProduct = async () => {
    try {
      if (!id) {
        return
      }

      const supplierId = parseInt(id)
      const _price = parseFloat(price)
      const _productId = selectedToEdit?.productId || 0

      const supplierProduct = new UpdateSupplierProduct(_price)

      const _errors = supplierProduct.isValid()

      setErrors(_errors)
      if (Object.keys(_errors).length) {
        return
      }

      await supplierProductService.update(supplierId, _productId, supplierProduct)
      loadProducts()
      clearForm()
    } catch {
      console.error('error')
    }
  }

  const addSupplierProduct = async () => {
    try {
      if (!id) {
        return
      }

      const supplierId = parseInt(id)
      const _price = parseFloat(price)
      const _productId = productSelected?.id || 0

      const supplierProduct = new CreateSupplierProduct(supplierId, _productId, _price)

      const _errors = supplierProduct.isValid()

      setErrors(_errors)
      if (Object.keys(_errors).length) {
        return
      }

      await supplierProductService.create(supplierId, supplierProduct)
      loadProducts()
      clearForm()
    } catch {
      console.error('error')
    }
  }

  const handlerDeleteSupplierProduct = async () => {
    try {
      if (!id) {
        return
      }

      const supplierId = parseInt(id)
      await supplierProductService.delete(supplierId, selectedIdToDelete)
      clearForm()
      loadProducts()
      loadProductsNotSupplier()
    } catch {
      console.error('error')
    }
  }

  const clearForm = () => {
    setErrors({})
    setPrice('')
    setProductSelected(undefined)
    setSelectedToEdit(undefined)
    setSearchText('')
  }

  const addMoreProductsNotSupplier = async (pageNum: number) => {
    try {
      if (!id) {
        return
      }
      const supplierId = parseInt(id)
      const _product = await productService.getAll(pageNum, searchText, 0, supplierId, 0, true)
      setProductsNoSupplier([...productsNoSupplier, ..._product[0]])
      setProductPages(_product[1])
      setProductPage(pageNum)
      setErrors({})
    } catch {
      console.error('error')
    }
  }

  const loadProductsNotSupplier = async () => {
    try {
      if (!id) {
        return
      }
      const supplierId = parseInt(id)
      const _product = await productService.getAll(1, searchText, 0, supplierId, 0, true)
      setProductsNoSupplier(_product[0])
      setProductPages(_product[1])
      setProductPage(1)
      setErrors({})
    } catch {
      console.error('error')
    } finally {
      setIsLoading(false)
    }
  }

  const handlerSelectToEdit = (item: SupplierProductItem) => {
    if (!item) {
      return
    }
    setProductSelected(item.product)
    setPrice(item.price.toString())
    setSelectedToEdit(item)
    setProductsNoSupplier([item.product])
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
    loadSupplier()
  }, [])

  useEffect(() => {
    loadDiscounts()
  }, [pageDiscounts, orderDiscountDirection, orderDiscountBy])

  useEffect(() => {
    loadProducts()
  }, [page, orderDirection, orderBy])

  useEffect(() => {
    setIsLoading(true)
    const timeOutId = setTimeout(() => loadProductsNotSupplier(), 1000)
    return () => clearTimeout(timeOutId)
  }, [searchText])

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
        onAcept={handlerDeleteSupplierProduct}
      />
      <Content title='Proveedores' open={open} toggleDrawer={toggleDrawer}>
        <SupplierDetails title='Información del proveedor' obj={supplier}></SupplierDetails>
        <Grid item xs={12}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <DiscountForm
              isLoading={isLoading}
              discount={selectedDiscountToEdit}
              submitDiscount={submitDiscount}
              errors={errors}
            ></DiscountForm>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <DiscountTable
              pages={pagesDiscounts}
              page={pageDiscounts}
              setPage={setPageDiscounts}
              data={discounts}
              onDelete={openAlertToDeleteDiscount}
              onUpdate={(_, item) => setSelectedDiscountToEdit(item)}
              orderBy={orderDiscountBy}
              setOrderBy={setOrderDiscountBy}
              orderDirection={orderDiscountDirection}
              setOrderDirection={setOrderDiscountDirection}
            ></DiscountTable>
            {errors['salesPercentages'] && (
              <Alert sx={{ mt: '10px' }} severity='error'>
                {errors['discounts']}
              </Alert>
            )}
          </Paper>
        </Grid>
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
                <Title>Asignar producto</Title>
              </Grid>
              <Grid item xs={12} sm={6} lg={8}>
                <CustomAutocomplete
                  disableClearable
                  id='products'
                  disabled={selectedToEdit != undefined}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  setValue={(value) => setProductSelected(value)}
                  searchText={searchText}
                  setSearchText={setSearchText}
                  getOptionLabel={(product) => `${product.name} - ${product.presentation}`}
                  options={productsNoSupplier}
                  isLoading={isLoading}
                  onScroll={() => {
                    if (productPage === productPages) {
                      return
                    }
                    addMoreProductsNotSupplier(productPage + 1)
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
              <Grid item xs={12} sm={2}>
                <CustomTextField
                  id='price'
                  label='Precio (en Dólares)'
                  value={price}
                  disabled={isLoading}
                  error={errors['price'] ? true : false}
                  helperText={errors['price']}
                  inputProps={{ inputMode: 'decimal', lang: 'es-VE' }}
                  onChange={(event) => setPrice(event.target.value)}
                ></CustomTextField>
              </Grid>
              <Grid item xs={12} sm={2} lg={1}>
                <CustomButton
                  id='AddProduct'
                  text='Agregar'
                  onClick={() => submitSupplierProduct()}
                ></CustomButton>
              </Grid>
              <Grid item xs={12} sm={2} lg={1}>
                <CustomButton
                  id='ClearForm'
                  text='Cancelar'
                  onClick={() => clearForm()}
                ></CustomButton>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <SupplierProductTable
              pages={pages}
              page={page}
              setPage={setPage}
              orderBy={orderBy}
              setOrderBy={setOrderBy}
              orderDirection={orderDirection}
              setOrderDirection={setOrderDirection}
              data={products}
              onDelete={(id) => openAlert(id)}
              onUpdate={(_, item) => handlerSelectToEdit(item)}
            ></SupplierProductTable>
          </Paper>
        </Grid>
      </Content>
    </>
  )
}
