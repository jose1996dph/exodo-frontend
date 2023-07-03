import CustomTable, { CustomTableRow } from '../molecules/CustomTable'
import { CategoryItem } from '../../domains/category.domain'

const propRows: CustomTableRow[] = [{ title: 'Descripción', key: 'description' }]

type CategoryTableProps = {
  pages: number
  page: number
  setPage: (value: number) => void
  orderBy: string
  setOrderBy: (attribute: string) => void
  orderDirection: 'asc' | 'desc'
  setOrderDirection: (attribute: 'asc' | 'desc') => void
  data: CategoryItem[]
  onDelete: (id: number) => void
  onUpdate: (id: number) => void
}

export default function CategoryTable({
  pages,
  page,
  setPage,
  orderBy,
  setOrderBy,
  orderDirection,
  setOrderDirection,
  data,
  onUpdate,
}: CategoryTableProps) {
  return (
    <CustomTable
      title='Categorías'
      pages={pages}
      page={page}
      setPage={setPage}
      items={data}
      orderBy={orderBy}
      setOrderBy={setOrderBy}
      orderDirection={orderDirection}
      setOrderDirection={setOrderDirection}
      tableRows={propRows}
      onUpdate={onUpdate}
    ></CustomTable>
  )
}
