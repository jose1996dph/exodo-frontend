import CustomTable, { CustomRow } from '../molecules/CustomTable'
import { OrderItem } from '../../domains/order.domain'
import { formatDate, formatFloat } from '../../framework/helpers/formatter.helper'

const propRows: CustomRow[] = [
  {
    title: 'Proveedor',
    key: 'supplier',
    isImportant: true,
    render: (_, item: OrderItem) => item.supplier.name,
  },
  {
    title: 'Cliente',
    key: 'customer',
    isImportant: true,
    render: (_, item: OrderItem) => item.customer.businessName,
  },
  {
    title: 'Total',
    key: 'total',
    isImportant: false,
    render: (_, item: OrderItem) => formatFloat(item.total),
  },
  {
    title: 'Fecha',
    key: 'createAt',
    isImportant: false,
    render: (_, item: OrderItem) => formatDate(item.createAt),
  },
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
  onShow: (id: number) => void
  onToggle: (id: number) => void
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
  onShow,
  onToggle,
}: OrderTableProps) {
  return (
    <CustomTable
      title='Órdenes'
      pages={pages}
      page={page}
      setPage={setPage}
      items={data}
      orderBy={orderBy}
      setOrderBy={setOrderBy}
      orderDirection={orderDirection}
      setOrderDirection={setOrderDirection}
      tableRows={propRows}
      onShow={onShow}
      onToggle={onToggle}
    ></CustomTable>
  )
}
