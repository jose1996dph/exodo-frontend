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
  data: UserItem[]
  onDelete: (id: number) => void
  onUpdate: (id: number) => void
}

export default function UserTable({
  pages,
  page,
  setPage,
  data,
  onDelete,
  onUpdate,
}: UserTableProps) {
  return (
    <CustomTable
      title='Usuarios'
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
