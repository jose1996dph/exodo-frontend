import CustomTable, { CustomTableRow } from '../molecules/CustomTable'
import { InvoiceProductItem } from '../../domains/invoiceProduct.domain'

const propRows: CustomTableRow[] = [
  { title: 'Nombre', key: 'name', render: (_, item: InvoiceProductItem) => item.product.name },
  {
    title: 'Presentación',
    key: 'presentation',
    render: (_, item: InvoiceProductItem) => item.product.presentation,
  },
  {
    title: 'Precio',
    key: 'price',
    render: (_, item: InvoiceProductItem) => {
      if (!item.product.supplierProducts || item.product.supplierProducts.length === 0) {
        return
      }

      return item.product.supplierProducts[0].price
    },
  },
  {
    title: 'Total',
    key: 'total',
    render: (_, item: InvoiceProductItem) => {
      if (!item.product.supplierProducts || item.product.supplierProducts.length === 0) {
        return
      }

      return item.product.supplierProducts[0].price * item.quantity
    },
  },
]

export type InvoiceProductTableProps = {
  pages: number
  page: number
  setPage: (value: number) => void
  orderBy: string
  setOrderBy: (attribute: string) => void
  orderDirection: 'asc' | 'desc'
  setOrderDirection: (attribute: 'asc' | 'desc') => void
  data: InvoiceProductItem[]
  onDelete?: (id: number, item: any) => void
  onUpdate?: (id: number, item: any) => void
}

export default function InvoiceProductTable({
  pages,
  page,
  setPage,
  orderBy,
  setOrderBy,
  orderDirection,
  setOrderDirection,
  data,
  onDelete,
  onUpdate,
}: InvoiceProductTableProps) {
  return (
    <CustomTable
      title='Productos'
      pages={pages}
      page={page}
      setPage={setPage}
      items={data}
      orderBy={orderBy}
      setOrderBy={setOrderBy}
      orderDirection={orderDirection}
      setOrderDirection={setOrderDirection}
      tableRows={propRows}
      onDelete={onDelete}
      onUpdate={onUpdate}
      identify='productId'
    ></CustomTable>
  )
}
