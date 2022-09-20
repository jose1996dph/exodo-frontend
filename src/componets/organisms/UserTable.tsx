import CustomTable, { CustomTableRow } from '../molecules/CustomTable'
import { UserItem } from '../../domains/user.domain'

function preventDefault(event: React.MouseEvent) {
  event.preventDefault()
}

const propRows: CustomTableRow[] = [
  { title: 'Cédula', key: 'dni' },
  { title: 'Nombre', key: 'firstName' },
  { title: 'Apellido', key: 'lastName' },
  { title: 'Teléfono', key: 'phone' },
  { title: 'Correo', key: 'email' },
]

type UserTableProps = {
  data: UserItem[]
  onDelete: (id: number) => void
  onUpdate: (id: number) => void
}

export default function UserTable({ data, onDelete, onUpdate }: UserTableProps) {
  return (
    <CustomTable
      title='Usuarios'
      items={data}
      tableRows={propRows}
      preventDefault={preventDefault}
      onDelete={onDelete}
      onUpdate={onUpdate}
    ></CustomTable>
  )
}
