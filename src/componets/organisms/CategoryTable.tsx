import CustomTable, { CustomTableRow } from '../molecules/CustomTable'
import { CategoryItem } from '../../domains/category.domain'

const propRows: CustomTableRow[] = [{ title: 'Descripción', key: 'description' }]

type CategoryTableProps = {
  pages: number
  page: number
  setPage: (value: number) => void
  data: CategoryItem[]
  onDelete: (id: number) => void
  onUpdate: (id: number) => void
}

export default function CategoryTable({
  pages,
  page,
  setPage,
  data,
  onDelete,
  onUpdate,
}: CategoryTableProps) {
  return (
    <CustomTable
      title='Clientes'
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
