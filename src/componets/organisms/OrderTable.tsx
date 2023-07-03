import CustomTable, { CustomTableRow } from '../molecules/CustomTable'
import { OrderItem } from '../../domains/order.domain'
import { formatDate } from '../../framework/helpers/formatter.helper'

const propRows: CustomTableRow[] = [
  { title: 'Proveedor', key: 'supplier', render: (_, item: OrderItem) => item.supplier.name },
  { title: 'Cliente', key: 'customer', render: (_, item: OrderItem) => item.customer.businessName },
  { title: 'Total', key: 'total' },
  { title: 'Fecha', key: 'createAt', render: (_, item: OrderItem) => formatDate(item.createAt) },
]

type OrderTableProps = {
  pages: number
  page: number
  setPage: (value: number) => void
  orderBy: string
  setOrderBy: (attribute: string) => void
  orderDirection: 'asc' | 'desc'
  setOrderDirection: (attribute: 'asc' | 'desc') => void
  data: OrderItem[]
  onToggle: (id: number) => void
  onUpdate: (id: number) => void
}

export default function OrderTable({
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
}: OrderTableProps) {
  return (
    <CustomTable
      title='Ordenes'
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
