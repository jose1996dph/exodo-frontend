import CustomTable, { CustomTableRow } from '../molecules/CustomTable'
import { CustomerItem } from '../../domains/customer.domain'

const propRows: CustomTableRow[] = [
  { title: 'Rif', key: 'dni' },
  { title: 'Razón social', key: 'businessName' },
  { title: 'Nombre del local', key: 'storeName' },
  { title: 'Teléfono', key: 'phone' },
  { title: 'Persona de contacto', key: 'contactName' },
]

type CustomerTableProps = {
  pages: number
  page: number
  setPage: (value: number) => void
  orderBy: string
  setOrderBy: (attribute: string) => void
  orderDirection: 'asc' | 'desc'
  setOrderDirection: (attribute: 'asc' | 'desc') => void
  data: CustomerItem[]
  onToggle: (id: number) => void
  onUpdate: (id: number) => void
}

export default function CustomerTable({
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
}: CustomerTableProps) {
  return (
    <CustomTable
      title='Clientes'
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
