import CustomTable, { CustomTableRow } from '../molecules/CustomTable'
import { InvoiceItem } from '../../domains/invoice.domain'
import { formatDate } from '../../framework/helpers/formatter.helper'

const propRows: CustomTableRow[] = [
  { title: 'Proveedor', key: 'supplier', render: (_, item: InvoiceItem) => item.supplier.name },
  {
    title: 'Cliente',
    key: 'customer',
    render: (_, item: InvoiceItem) => item.customer.businessName,
  },
  { title: 'Total', key: 'total' },
  { title: 'Fecha', key: 'createAt', render: (_, item: InvoiceItem) => formatDate(item.createAt) },
]

type InvoiceTableProps = {
  pages: number
  page: number
  setPage: (value: number) => void
  orderBy: string
  setOrderBy: (attribute: string) => void
  orderDirection: 'asc' | 'desc'
  setOrderDirection: (attribute: 'asc' | 'desc') => void
  data: InvoiceItem[]
  onShow: (id: number) => void
  onToggle: (id: number) => void
}

export default function InvoiceTable({
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
}: InvoiceTableProps) {
  return (
    <CustomTable
      title='Facturas'
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
