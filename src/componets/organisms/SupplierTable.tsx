import CustomTable, { CustomTableRow } from '../molecules/CustomTable'
import { SupplierItem } from '../../domains/supplier.domain'

const propRows: CustomTableRow[] = [
  { title: 'Rif', key: 'dni' },
  { title: 'Nombre', key: 'name' },
  { title: 'Dirección', key: 'address' },
  { title: 'Teléfono', key: 'phone' },
]

type SupplierTableProps = {
  pages: number
  page: number
  setPage: (value: number) => void
  orderBy: string
  setOrderBy: (attribute: string) => void
  orderDirection: 'asc' | 'desc'
  setOrderDirection: (attribute: 'asc' | 'desc') => void
  data: SupplierItem[]
  onShow: (id: number) => void
  onToggle: (id: number) => void
  onUpdate: (id: number) => void
}

export default function SupplierTable({
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
  onUpdate,
}: SupplierTableProps) {
  return (
    <CustomTable
      title='Proveedores'
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
      onUpdate={onUpdate}
    ></CustomTable>
  )
}
