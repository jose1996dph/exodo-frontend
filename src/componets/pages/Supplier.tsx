import { AutocompleteRenderInputParams, Grid, Paper, TextField } from '@mui/material'
import { ReactNode, useEffect, useState } from 'react'
import { SupplierDetail } from '../../domains/supplier.domain'
import { makeSupplierProductService } from '../../services/supplierProduct.service'
import { makeSupplierService } from '../../services/supplier.service'
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

type SupplierPageProps = {
  open: boolean
  toggleDrawer: ToggleDrawerHandler
}

export default function Supplier({ open, toggleDrawer }: SupplierPageProps) {
  const [supplier, setSupplier] = useState<SupplierDetail | undefined>(undefined)
  const [products, setProducts] = useState<SupplierProductItem[]>([])
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

  const { id } = useParams()

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
      const [_products, _pages] = await supplierProductService.getAll(supplierId, page, '')
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
      await EditSupplierProduct()
      return
    }
    await AddSupplierProduct()
  }

  const EditSupplierProduct = async () => {
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

  const AddSupplierProduct = async () => {
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
      const _product = await productService.getAll(pageNum, searchText, supplierId)
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
      const _product = await productService.getAll(1, searchText, supplierId)
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

  const openAlert = (id: number) => {
    setOpenModal(true)
    setSelectedIdToDelete(id)
  }

  useEffect(() => {
    loadSupplier()
  }, [])

  useEffect(() => {
    loadProducts()
  }, [page])

  useEffect(() => {
    setIsLoading(true)
    const timeOutId = setTimeout(() => loadProductsNotSupplier(), 1000)
    return () => clearTimeout(timeOutId)
  }, [searchText])

  return (
    <>
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
            <Grid container spacing={0.5}>
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
                  label='Precio'
                  value={price}
                  disabled={isLoading}
                  error={errors['price'] ? true : false}
                  helperText={errors['price']}
                  inputProps={{ inputMode: 'numeric' }}
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
