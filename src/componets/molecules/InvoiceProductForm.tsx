import { AutocompleteRenderInputParams, Box, Grid, Paper, TextField } from '@mui/material'
import CustomAutocomplete from '../atoms/CustomAutocomplete'
import CustomButton from '../atoms/CustomButton'
import CustomTextField from '../atoms/CustomTextField'
import InvoiceProductTable, { InvoiceProductTableProps } from '../organisms/InvoiceProductTable'
import { ReactNode, useEffect, useState } from 'react'
import { ProductDetail, ProductItem } from '../../domains/product.domain'
import { InvoiceProductItem } from '../../domains/invoiceProduct.domain'
import Title from '../atoms/Title'
import { DiscountItem } from '../../domains/discount.domain'
import Prices from '../organisms/Prices'

type InvoiceProductFormProps = InvoiceProductTableProps & {
  products: ProductItem[]
  discounts: DiscountItem[]
  isLoading: boolean
  invoiceTotal: number
  searchProductText: string
  setSearchProductText: (value: string) => void
  productSelected: ProductItem | undefined
  setProductSelected: (value: ProductItem | undefined) => void
  invoiceProducts: InvoiceProductItem[]
  autoCompleteDisable: boolean
  autoCompleteOnScroll: () => void
  quantity: string
  setQuantity: (value: string) => void
  quantityDisable: boolean
  onAddHandler: () => void
  errors: Record<string, string>
  onSubmit?: (() => void) | undefined
}

export default function InvoiceProductForm({
  products,
  discounts,
  isLoading,
  invoiceTotal,
  searchProductText,
  setSearchProductText,
  productSelected,
  setProductSelected,
  invoiceProducts,
  autoCompleteDisable,
  autoCompleteOnScroll,
  quantity,
  setQuantity,
  quantityDisable,
  onAddHandler,
  errors,
  pages,
  page,
  setPage,
  orderBy,
  setOrderBy,
  orderDirection,
  setOrderDirection,
  onDelete,
  onUpdate,
  onSubmit = undefined,
}: InvoiceProductFormProps) {
  const [total, setTotal] = useState(0)
  const [productPrice, setProductPrice] = useState(0)

  useEffect(() => {
    if (!productSelected) {
      setProductPrice(0)
      setTotal(0)
      return
    }

    const product = productSelected as ProductDetail
    if (!product) {
      setProductPrice(0)
      setTotal(0)
      return
    }

    if (!product.supplierProducts || product.supplierProducts.length === 0) {
      setProductPrice(0)
      setTotal(0)
      return
    }
    const supplierProduct = product.supplierProducts[0]
    setProductPrice(supplierProduct.price)

    const _quantity = parseInt(quantity)
    if (!_quantity || _quantity === 0) {
      setTotal(supplierProduct.price)
      return
    }

    setTotal(supplierProduct.price * _quantity)
  }, [productSelected])

  const loadTotal = () => {
    if (!productSelected) {
      setTotal(0)
      return
    }

    const product = productSelected as ProductDetail
    if (!product) {
      setTotal(0)
      return
    }

    if (!product.supplierProducts || product.supplierProducts.length === 0) {
      setTotal(0)
      return
    }
    const supplierProduct = product.supplierProducts[0]
    setProductPrice(supplierProduct.price)

    const _quantity = parseInt(quantity)
    if (!_quantity || _quantity === 0) {
      setTotal(supplierProduct.price)
      return
    }

    setTotal(supplierProduct.price * _quantity)
  }

  useEffect(() => {
    const timeOutId = setTimeout(() => loadTotal(), 500)
    return () => clearTimeout(timeOutId)
  }, [quantity])

  return (
    <>
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
                disabled={autoCompleteDisable}
                onScroll={autoCompleteOnScroll}
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
                disabled={quantityDisable}
                error={errors['quantity'] ? true : false}
                helperText={errors['quantity']}
                onChange={(event) => setQuantity(event.target.value)}
                inputProps={{ inputMode: 'numeric' }}
              ></CustomTextField>
            </Grid>
            <Prices discounts={discounts} total={total} productPrice={productPrice}></Prices>
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CustomButton
                  fullWidth={false}
                  sx={{ mt: 2, ml: 1 }}
                  id='addProduct'
                  text='Agregar'
                  href=''
                  onClick={onAddHandler}
                  disabled={isLoading || !productSelected}
                ></CustomButton>
              </Box>
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
          <Grid container spacing={0.5}>
            <Grid item xs={12} sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <InvoiceProductTable
                page={page}
                pages={pages}
                setPage={setPage}
                orderBy={orderBy}
                setOrderBy={setOrderBy}
                orderDirection={orderDirection}
                setOrderDirection={setOrderDirection}
                data={invoiceProducts}
                onDelete={onDelete}
                onUpdate={onUpdate}
              ></InvoiceProductTable>
            </Grid>
            <Prices discounts={discounts} total={invoiceTotal}></Prices>
            {onSubmit && (
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <CustomButton
                    fullWidth={false}
                    sx={{ mt: 2, ml: 1 }}
                    id='submit'
                    text='Guardar'
                    href=''
                    onClick={() => onSubmit()}
                    disabled={isLoading}
                  ></CustomButton>
                </Box>
              </Grid>
            )}
          </Grid>
        </Paper>
      </Grid>
    </>
  )
}
