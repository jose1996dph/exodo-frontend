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
  orderBy: string
  setOrderBy: (attribute: string) => void
  orderDirection: 'asc' | 'desc'
  setOrderDirection: (attribute: 'asc' | 'desc') => void
  data: ProductItem[]
  onToggle: (id: number) => void
  onUpdate: (id: number) => void
}

export default function ProductTable({
  pages,
  page,
  setPage,
  orderBy,
  setOrderBy,
  orderDirection,
  setOrderDirection,
  data,
  onToggle,
  onUpdate,
}: ProductTableProps) {
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
      onToggle={onToggle}
      onUpdate={onUpdate}
    ></CustomTable>
  )
}
