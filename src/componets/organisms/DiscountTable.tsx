import CustomTable, { CustomRow } from '../molecules/CustomTable'
import { DiscountItem } from '../../domains/discount.domain'

const propRows: CustomRow[] = [
  { title: 'Porcentaje', key: 'percentage', isImportant: true },
  { title: 'Tiempo limite', key: 'deadline', isImportant: true },
]
type DiscountTableProps = {
  pages: number
  page: number
  setPage: (value: number) => void
  orderBy: string
  setOrderBy: (attribute: string) => void
  orderDirection: 'asc' | 'desc'
  setOrderDirection: (attribute: 'asc' | 'desc') => void
  data: DiscountItem[]
  onDelete: (id: number) => void
  onUpdate: (id: number, item: any) => void
}

export default function DiscountTable({
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
}: DiscountTableProps) {
  return (
    <CustomTable
      title='Descuentos'
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
    ></CustomTable>
  )
}
