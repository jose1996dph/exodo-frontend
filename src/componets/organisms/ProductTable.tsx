import CustomTable, { CustomTableRow } from '../molecules/CustomTable'
import { ProductItem } from '../../domains/product.domain'

const propRows: CustomTableRow[] = [
  { title: 'Nombre', key: 'name' },
  { title: 'Presentación', key: 'presentation' },
  {
    title: 'Categoría',
    key: 'category',
    render: (_, item: ProductItem) => item.category.description,
  },
]

type ProductTableProps = {
  pages: number
  page: number
  setPage: (value: number) => void
  data: ProductItem[]
  onDelete: (id: number) => void
  onUpdate: (id: number) => void
}

export default function ProductTable({
  pages,
  page,
  setPage,
  data,
  onDelete,
  onUpdate,
}: ProductTableProps) {
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
    ></CustomTable>
  )
}
