import { CustomerDetail } from '../../domains/customer.domain'
import Details, { DetailsItem } from '../molecules/Details'

const ObjectFields: DetailsItem[] = [
  { title: 'Rif', render: (_, customer) => customer.dni },
  { title: 'Razón social', render: (_, customer) => customer.businessName },
  { title: 'Nombre de la tienda', render: (_, customer) => customer.storeName },
  { title: 'Dirección', render: (_, customer) => customer.address },
  { title: 'Punto de referencia', render: (_, customer) => customer.referencePoint },
  { title: 'Teléfono', render: (_, customer) => customer.phone },
  { title: 'Persona de contacto', render: (_, customer) => customer.contactName },
  { title: 'Tel. persona de contacto', render: (_, customer) => customer.contactPhone },
  { title: 'Nº F.ª pagadas', render: (_, customer) => customer.countInvoicePayed },
  { title: 'Nº F.ª por pagar', render: (_, customer) => customer.countInvoiceNoPayed },
]

type CustomerDetailsProps = {
  title: string
  obj: CustomerDetail | undefined
}

export default function CustomerDetails({ title, obj }: CustomerDetailsProps) {
  return <Details title={title} obj={obj} items={ObjectFields} />
}
