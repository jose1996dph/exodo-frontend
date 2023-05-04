import { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import SearchIcon from '@mui/icons-material/Search'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import InputAdornment from '@mui/material/InputAdornment'

import ProductTable from '../organisms/ProductTable'
import CustomButton from '../atoms/CustomButton'
import CustomTextField from '../atoms/CustomTextField'
import Content from '../organisms/Content'
import { ToggleDrawerHandler } from '../molecules/CustomAppBar'
import { makeProductService } from '../../services/product.service'
import { ProductItem } from '../../domains/product.domain'
import ConfirmDialog from '../atoms/ConfirmDialog'
import { useNavigate } from 'react-router-dom'
import { UrlRoutes } from '../../framework/routes/routes'

type ProductsPageProps = {
  open: boolean
  toggleDrawer: ToggleDrawerHandler
}

export default function Products({ open, toggleDrawer }: ProductsPageProps) {
  const [searchText, setSearchText] = useState('')
  const [products, setProducts] = useState<ProductItem[]>([])
  const [orderBy, setOrderBy] = useState<string>('name')
  const [orderDirection, setOrderDirection] = useState<'asc' | 'desc'>('asc')
  const [openModal, setOpenModal] = useState(false)
  const [seletedId, setSelectedId] = useState(0)
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(0)

  const productService = makeProductService()

  const navigate = useNavigate()

  const loadProducts = async () => {
    try {
      const [_products, _pages] = await productService.getAll(
        page,
        searchText,
        0,
        orderBy,
        orderDirection,
      )
      setProducts(_products)
      setPages(_pages)
    } catch {
      console.error('error')
    }
  }

  const handleClose = () => {
    setOpenModal(false)
  }

  const openAlert = (id: number) => {
    setOpenModal(true)
    setSelectedId(id)
  }

  const handlerToggleStatus = async () => {
    try {
      await productService.toggleStatus(seletedId)
      loadProducts()
    } catch {
      console.error('error')
    } finally {
      handleClose()
    }
  }

  const goToCreateProduct = () => {
    navigate(UrlRoutes.CreateProduct, { replace: true })
  }

  const onUpdateHandler = (id: number) => {
    try {
      navigate(`${UrlRoutes.EditProduct}${id}`, { replace: true })
    } catch {
      console.error('error')
    }
  }

  useEffect(() => {
    const timeOutId = setTimeout(() => loadProducts(), 1000)
    return () => clearTimeout(timeOutId)
  }, [searchText])

  useEffect(() => {
    loadProducts()
  }, [page, orderDirection, orderBy])

  return (
    <>
      <ConfirmDialog
        open={openModal}
        setOpen={setOpenModal}
        content='¿Está seguro de cambiar el estatus del producto?'
        onAcept={handlerToggleStatus}
      />
      <Content title='Productos' open={open} toggleDrawer={toggleDrawer}>
        <Grid item xs={12} md={4} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 120,
            }}
          >
            <CustomButton
              aria-label='delete'
              color='primary'
              text='Crear Producto'
              id='create_product'
              startIcon={<PersonAddIcon />}
              onClick={goToCreateProduct}
            ></CustomButton>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8} lg={9}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 120,
            }}
          >
            <CustomTextField
              label='Buscar producto'
              aria-label='delete'
              color='primary'
              variant='outlined'
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            ></CustomTextField>
          </Paper>
        </Grid>
        {/* Recent Orders */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <ProductTable
              pages={pages}
              page={page}
              setPage={setPage}
              orderBy={orderBy}
              setOrderBy={setOrderBy}
              orderDirection={orderDirection}
              setOrderDirection={setOrderDirection}
              data={products}
              onToggle={openAlert}
              onUpdate={onUpdateHandler}
            />
          </Paper>
        </Grid>
      </Content>
    </>
  )
}
