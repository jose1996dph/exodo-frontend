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
  data: CustomerItem[]
  onDelete: (id: number) => void
  onUpdate: (id: number) => void
}

export default function CustomerTable({
  pages,
  page,
  setPage,
  data,
  onDelete,
  onUpdate,
}: CustomerTableProps) {
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
