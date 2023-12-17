import CustomTable, { CustomRow } from '../molecules/CustomTable'
import { SupplierProductItem } from '../../domains/supplierProduct.domain'

const propRows: CustomRow[] = [
  {
    title: 'Nombre',
    key: 'name',
    isImportant: true,
    render: (_, item: SupplierProductItem) => item.product.name,
  },
  {
    title: 'Presentación',
    key: 'presentation',
    isImportant: true,
    render: (_, item: SupplierProductItem) => item.product.presentation,
  },
  { title: 'Precio', key: 'price', isImportant: false },
]

type SupplierProductTableProps = {
  pages: number
  page: number
  setPage: (value: number) => void
  orderBy: string
  setOrderBy: (attribute: string) => void
  orderDirection: 'asc' | 'desc'
  setOrderDirection: (attribute: 'asc' | 'desc') => void
  data: SupplierProductItem[]
  onDelete: (id: number) => void
  onUpdate: (id: number, item: any) => void
}

export default function SupplierProductTable({
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
}: SupplierProductTableProps) {
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
