import { SupplierDetail } from '../../domains/supplier.domain'
import Details, { DetailsItem } from '../molecules/Details'

const ObjectFields: DetailsItem[] = [
  { title: 'Nombre', render: (_, supplier) => supplier.name },
  { title: 'Rif', render: (_, supplier) => supplier.dni },
  { title: 'Dirección', render: (_, supplier) => supplier.address },
  { title: 'Teléfono', render: (_, supplier) => supplier.phone },
]

type SupplierDetailsProps = {
  title: string
  obj: SupplierDetail | undefined
}

export default function SupplierDetails({ title, obj }: SupplierDetailsProps) {
  return <Details title={title} obj={obj} items={ObjectFields} />
}
