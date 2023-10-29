import { useEffect, useState } from 'react'
import { InvoiceDetail } from '../../domains/invoice.domain'
import { makeInvoiceProductService } from '../../services/invoiceProduct.service'
import { makeInvoiceService } from '../../services/invoice.service'
import { makeDiscountService } from '../../services/discount.service'
import { ToggleDrawerHandler } from '../molecules/CustomAppBar'
import Content from '../organisms/Content'
import InvoiceDetails from '../organisms/InvoiceDetails'
import {
  InvoiceProductItem,
  CreateInvoiceProduct,
  UpdateInvoiceProduct,
} from '../../domains/invoiceProduct.domain'
import { ProductItem } from '../../domains/product.domain'
import { useParams } from 'react-router-dom'
import { makeProductService } from '../../services/product.service'
import ConfirmDialog from '../atoms/ConfirmDialog'
import { CreateDiscount, DiscountItem, UpdateDiscount } from '../../domains/discount.domain'
import InvoiceProductForm from '../molecules/InvoiceProductForm'
import { SupplierDetail } from '../../domains/supplier.domain'
import { makeSupplierService } from '../../services/supplier.service'
import { makeCustomerService } from '../../services/customer.service'
import { CustomerDetail } from '../../domains/customer.domain'
import { Grid, Paper } from '@mui/material'
import InvoiceProductTable from '../organisms/InvoiceProductTable'
import Prices from '../organisms/Prices'

type InvoicePageProps = {
  open: boolean
  toggleDrawer: ToggleDrawerHandler
}

export default function Invoice({ open, toggleDrawer }: InvoicePageProps) {
  const [discounts, setDiscounts] = useState<DiscountItem[]>([])
  const [orderDiscountBy, setOrderDiscountBy] = useState<string>('percentage')
  const [orderDiscountDirection, setOrderDiscountDirection] = useState<'asc' | 'desc'>('asc')
  const [pageDiscounts, setPageDiscounts] = useState(1)
  const [pagesDiscounts, setPagesDiscounts] = useState(0)
  const [openModalToDeleteDiscount, setOpenModalToDeleteDiscount] = useState(false)
  const [selectedDiscountIdToDelete, setSelectedDiscountIdToDelete] = useState(0)
  const [selectedDiscountToEdit, setSelectedDiscountToEdit] = useState<DiscountItem>()

  const [invoice, setInvoice] = useState<InvoiceDetail | undefined>(undefined)
  const [supplier, setSupplier] = useState<SupplierDetail | undefined>(undefined)
  const [customer, setCustomer] = useState<CustomerDetail | undefined>(undefined)
  const [products, setProducts] = useState<ProductItem[]>([])
  const [invoiceProducts, setInvoiceProducts] = useState<InvoiceProductItem[]>([])
  const [orderBy, setOrderBy] = useState<string>('name')
  const [orderDirection, setOrderDirection] = useState<'asc' | 'desc'>('asc')
  // const [productsNoInvoice, setProductsNoInvoice] = useState<ProductItem[]>([])
  const [productSelected, setProductSelected] = useState<ProductItem>()
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [searchText, setSearchText] = useState<string>('')
  const [quantity, setQuantity] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [productPages, setProductPages] = useState(0)
  const [productPage, setProductPage] = useState(1)
  const [openModal, setOpenModal] = useState(false)
  const [selectedIdToDelete, setSelectedIdToDelete] = useState(0)
  const [selectedToEdit, setSelectedToEdit] = useState<InvoiceProductItem>()
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(0)

  const invoiceService = makeInvoiceService()
  const invoiceProductService = makeInvoiceProductService()
  const productService = makeProductService()
  const discountService = makeDiscountService()
  const supplierService = makeSupplierService()
  const customerService = makeCustomerService()

  const { id } = useParams()

  const loadDiscounts = async () => {
    try {
      if (!supplier) {
        return
      }
      const [_discounts, _pages] = await discountService.getAll(
        supplier.id,
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

      const invoiceId = parseInt(id)
      const _discountId = selectedDiscountToEdit?.id || 0
      await discountService.update(invoiceId, _discountId, discount)

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

      const invoiceId = parseInt(id)
      await discountService.create(invoiceId, discount)

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

      const invoiceId = parseInt(id)
      await discountService.delete(invoiceId, selectedDiscountIdToDelete)

      loadDiscounts()
      setSelectedDiscountIdToDelete(0)
      setSelectedDiscountToEdit(undefined)
    } catch (e) {
      console.error(e)
    }
  }

  const loadInvoice = async () => {
    try {
      if (!id) {
        return
      }
      const invoiceId = parseInt(id)
      const _invoice = await invoiceService.getById(invoiceId)
      setInvoice(_invoice)

      loadSupplier(_invoice.supplierId)
      loadCustomer(_invoice.customerId)
    } catch {
      console.error('error')
    }
  }

  const loadSupplier = async (supplierId: number) => {
    try {
      const _supplier = await supplierService.getById(supplierId)
      setSupplier(_supplier)
      loadProductsNotInvoice()
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
      const invoiceId = parseInt(id)
      const [_invoiceProducts, _pages] = await invoiceProductService.getAll(
        invoiceId,
        page,
        '',
        orderBy,
        orderDirection,
      )
      setInvoiceProducts(_invoiceProducts)
      setPages(_pages)
    } catch {
      console.error('error')
    } finally {
      setIsLoading(false)
    }
  }

  const submitInvoiceProduct = async () => {
    if (selectedToEdit) {
      await editInvoiceProduct()
      return
    }
    await addInvoiceProduct()
  }

  const editInvoiceProduct = async () => {
    try {
      if (!id) {
        return
      }

      if (!selectedToEdit) {
        return
      }

      const invoiceId = parseInt(id)
      const _quantity = parseFloat(quantity)

      const invoiceProduct = new UpdateInvoiceProduct(selectedToEdit.product, _quantity)

      const _errors = invoiceProduct.isValid()

      setErrors(_errors)
      if (Object.keys(_errors).length) {
        return
      }

      const _productId = selectedToEdit?.productId || 0
      await invoiceProductService.update(invoiceId, _productId, invoiceProduct)

      loadInvoice()
      loadProducts()
      clearForm()
    } catch {
      console.error('error')
    }
  }

  const addInvoiceProduct = async () => {
    try {
      if (!id) {
        return
      }

      if (!productSelected) {
        return
      }

      const invoiceId = parseInt(id)
      const _quantity = parseFloat(quantity)

      const invoiceProduct = new CreateInvoiceProduct(productSelected, _quantity)

      const _errors = invoiceProduct.isValid()

      setErrors(_errors)
      if (Object.keys(_errors).length) {
        return
      }

      await invoiceProductService.create(invoiceId, invoiceProduct)

      loadInvoice()
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

      const invoiceId = parseInt(id)
      const supplierId = supplier.id
      const _products = await productService.getAll(nextPage, searchText, supplierId, 0, invoiceId)
      setProducts([...products, ..._products[0]])
      setProductPages(_products[1])
      setProductPage(nextPage)
    } catch {
      console.error('error')
    }
  }

  const handlerDeleteInvoiceProduct = async () => {
    try {
      if (!id) {
        return
      }

      const invoiceId = parseInt(id)
      await invoiceProductService.delete(invoiceId, selectedIdToDelete)

      clearForm()
      loadInvoice()
      loadProducts()
      loadProductsNotInvoice()
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

  const loadProductsNotInvoice = async () => {
    try {
      if (!id) {
        return
      }
      if (!supplier) {
        return
      }
      const invoiceId = parseInt(id)
      const _product = await productService.getAll(1, searchText, supplier.id, 0, invoiceId)
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

  const handlerSelectToEdit = (item: InvoiceProductItem) => {
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

  const openAlert = (id: number) => {
    setOpenModal(true)
    setSelectedIdToDelete(id)
  }

  useEffect(() => {
    loadInvoice()
  }, [])

  useEffect(() => {
    loadDiscounts()
  }, [pageDiscounts, orderDiscountDirection, orderDiscountBy, supplier])

  useEffect(() => {
    loadProducts()
  }, [page, orderDirection, orderBy])

  useEffect(() => {
    setIsLoading(true)
    const timeOutId = setTimeout(() => loadProductsNotInvoice(), 1000)
    return () => clearTimeout(timeOutId)
  }, [searchText, supplier])

  return (
    <>
      <ConfirmDialog
        open={openModal}
        setOpen={setOpenModal}
        onCancel={() => setSelectedIdToDelete(0)}
        content='¿Está seguro de eliminar este producto de la orden?'
        onAcept={handlerDeleteInvoiceProduct}
      />
      <Content title='Factura' open={open} toggleDrawer={toggleDrawer}>
        <InvoiceDetails title='Información del proveedor' obj={invoice}></InvoiceDetails>
        {/*
        <InvoiceProductForm
          pages={pages}
          page={page}
          invoiceTotal={invoice?.total ?? 0}
          setPage={setPage}
          orderBy={orderBy}
          setOrderBy={setOrderBy}
          orderDirection={orderDirection}
          setOrderDirection={setOrderDirection}
          onDelete={(_, item: InvoiceProductItem) => openAlert(item.productId)}
          onUpdate={(_, item: InvoiceProductItem) => handlerSelectToEdit(item)}
          products={products}
          isLoading={isLoading}
          searchProductText={searchText}
          setSearchProductText={setSearchText}
          productSelected={productSelected}
          setProductSelected={setProductSelected}
          invoiceProducts={invoiceProducts}
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
          onAddHandler={() => submitInvoiceProduct()}
          errors={errors}
          data={invoiceProducts}
          discounts={discounts}
        ></InvoiceProductForm>*/}
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
                ></InvoiceProductTable>
              </Grid>
              <Prices discounts={discounts} total={invoice?.total ?? 0}></Prices>
            </Grid>
          </Paper>
        </Grid>
      </Content>
    </>
  )
}
