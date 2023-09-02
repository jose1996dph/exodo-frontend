import { AutocompleteRenderInputParams, Box, Grid, Paper, TextField } from '@mui/material'
import CustomAutocomplete from '../atoms/CustomAutocomplete'
import CustomButton from '../atoms/CustomButton'
import CustomTextField from '../atoms/CustomTextField'
import OrderProductTable, { OrderProductTableProps } from '../organisms/OrderProductTable'
import { ReactNode } from 'react'
import { ProductItem } from '../../domains/product.domain'
import { OrderProductItem } from '../../domains/orderProduct.domain'
import Title from '../atoms/Title'

type OrderProductFormProps = OrderProductTableProps & {
  products: ProductItem[]
  isLoading: boolean
  searchProductText: string
  setSearchProductText: (value: string) => void
  productSelected: ProductItem | undefined
  setProductSelected: (value: ProductItem | undefined) => void
  orderProducts: OrderProductItem[]
  autoCompleteDisable: boolean
  autoCompleteOnScroll: () => void
  quantity: string
  setQuantity: (value: string) => void
  quantityDisable: boolean
  onAddHandler: () => void
  errors: Record<string, string>
  onSubmit?: (() => void) | undefined
}

export default function OrderProductForm({
  products,
  isLoading,
  searchProductText,
  setSearchProductText,
  productSelected,
  setProductSelected,
  orderProducts,
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
}: OrderProductFormProps) {
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
              <OrderProductTable
                page={page}
                pages={pages}
                setPage={setPage}
                orderBy={orderBy}
                setOrderBy={setOrderBy}
                orderDirection={orderDirection}
                setOrderDirection={setOrderDirection}
                data={orderProducts}
                onDelete={onDelete}
                onUpdate={onUpdate}
              ></OrderProductTable>
            </Grid>
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
