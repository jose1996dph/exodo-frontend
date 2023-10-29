import { InvoiceDetail } from '../../domains/invoice.domain'
import { formatDate } from '../../framework/helpers/formatter.helper'
import Details, { DetailsItem } from '../molecules/Details'

const ObjectFields: DetailsItem[] = [
  { title: 'Proveedor', render: (_, invoice) => invoice.supplier.name },
  { title: 'Tel. del Proveedor', render: (_, invoice) => invoice.supplier.phone },
  { title: 'Nombre del Negocio', render: (_, invoice) => invoice.customer.businessName },
  { title: 'Tel. del Negocio', render: (_, invoice) => invoice.customer.phone },
  { title: 'Nombre del Contacto', render: (_, invoice) => invoice.customer.contactName },
  { title: 'Tel. del Contacto', render: (_, invoice) => invoice.customer.contactPhone },
  { title: 'Total', render: (_, invoice) => invoice.total },
  { title: 'Fecha', render: (_, invoice) => formatDate(invoice.createAt) },
]

type InvoiceDetailsProps = {
  title: string
  obj: InvoiceDetail | undefined
}

export default function InvoiceDetails({ title, obj }: InvoiceDetailsProps) {
  return <Details title={title} obj={obj} items={ObjectFields} />
}
