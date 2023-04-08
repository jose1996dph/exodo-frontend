import CustomTable, { CustomTableRow } from '../molecules/CustomTable'
import { SupplierProductItem } from '../../domains/supplierProduct.domain'

const propRows: CustomTableRow[] = [
  { title: 'Nombre', key: 'name', render: (_, item: SupplierProductItem) => item.product.name },
  {
    title: 'Presentación',
    key: 'presentation',
    render: (_, item: SupplierProductItem) => item.product.presentation,
  },
  { title: 'Precio', key: 'price' },
]

type SupplierProductTableProps = {
  pages: number
  page: number
  setPage: (value: number) => void
  data: SupplierProductItem[]
  onDelete: (id: number) => void
  onUpdate: (id: number, item: any) => void
}

export default function SupplierProductTable({
  pages,
  page,
  setPage,
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
      tableRows={propRows}
      onDelete={onDelete}
      onUpdate={onUpdate}
      identify='productId'
    ></CustomTable>
  )
}
