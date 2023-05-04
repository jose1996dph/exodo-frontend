import CustomTable, { CustomTableRow } from '../molecules/CustomTable'
import { UserItem } from '../../domains/user.domain'

const propRows: CustomTableRow[] = [
  { title: 'Cédula', key: 'dni' },
  { title: 'Nombre', key: 'firstName' },
  { title: 'Apellido', key: 'lastName' },
  { title: 'Teléfono', key: 'phone' },
  { title: 'Correo', key: 'email' },
]

type UserTableProps = {
  pages: number
  page: number
  setPage: (value: number) => void
  orderBy: string
  setOrderBy: (attribute: string) => void
  orderDirection: 'asc' | 'desc'
  setOrderDirection: (attribute: 'asc' | 'desc') => void
  data: UserItem[]
  onToggle: (id: number) => void
  onUpdate: (id: number) => void
}

export default function UserTable({
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
}: UserTableProps) {
  return (
    <CustomTable
      title='Usuarios'
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
