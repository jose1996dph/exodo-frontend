import { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import SearchIcon from '@mui/icons-material/Search'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import InputAdornment from '@mui/material/InputAdornment'

import SupplierTable from '../organisms/SupplierTable'
import CustomButton from '../atoms/CustomButton'
import CustomTextField from '../atoms/CustomTextField'
import Content from '../organisms/Content'
import { ToggleDrawerHandler } from '../molecules/CustomAppBar'
import { makeSupplierService } from '../../services/supplier.service'
import { SupplierItem } from '../../domains/supplier.domain'
import ConfirmDialog from '../atoms/ConfirmDialog'
import { useNavigate } from 'react-router-dom'
import { UrlRoutes } from '../../framework/routes/routes'

type SuppliersPageProps = {
  open: boolean
  toggleDrawer: ToggleDrawerHandler
}

export default function Suppliers({ open, toggleDrawer }: SuppliersPageProps) {
  const [searchText, setSearchText] = useState('')
  const [suppliers, setSuppliers] = useState<SupplierItem[]>([])
  const [openModal, setOpenModal] = useState(false)
  const [selectedId, setSelectedId] = useState(0)
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(0)

  const supplierService = makeSupplierService()

  const navigate = useNavigate()

  const loadSuppliers = async () => {
    try {
      const [_suppliers, _pages] = await supplierService.getAll(page, searchText)
      setSuppliers(_suppliers)
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
      await supplierService.toggleStatus(selectedId)
      loadSuppliers()
    } catch {
      console.error('error')
    } finally {
      handleClose()
    }
  }

  const goToCreateSupplier = () => {
    navigate(UrlRoutes.CreateSupplier, { replace: true })
  }

  const onShowHandler = (id: number) => {
    try {
      navigate(`${UrlRoutes.Supplier}${id}`, { replace: true })
    } catch {
      console.error('error')
    }
  }

  const onUpdateHandler = (id: number) => {
    try {
      navigate(`${UrlRoutes.EditSupplier}${id}`, { replace: true })
    } catch {
      console.error('error')
    }
  }

  useEffect(() => {
    const timeOutId = setTimeout(() => loadSuppliers(), 1000)
    return () => clearTimeout(timeOutId)
  }, [searchText])

  useEffect(() => {
    loadSuppliers()
  }, [page])

  return (
    <>
      <ConfirmDialog
        open={openModal}
        setOpen={setOpenModal}
        content='¿Está seguro de cambiar el estatus del proveedor?'
        onAcept={handlerToggleStatus}
      />
      <Content title='Proveedores' open={open} toggleDrawer={toggleDrawer}>
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
              text='Crear proveedor'
              id='create_supplier'
              startIcon={<PersonAddIcon />}
              onClick={goToCreateSupplier}
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
              label='Buscar proveeder'
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
            <SupplierTable
              pages={pages}
              page={page}
              setPage={setPage}
              data={suppliers}
              onShow={onShowHandler}
              onToggle={openAlert}
              onUpdate={onUpdateHandler}
            />
          </Paper>
        </Grid>
      </Content>
    </>
  )
}
