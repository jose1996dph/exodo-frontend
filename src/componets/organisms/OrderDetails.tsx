import { OrderDetail } from '../../domains/order.domain'
import { formatDate } from '../../framework/helpers/formatter.helper'
import Price from '../atoms/Price'
import Details, { DetailsItem, OptionDetails } from '../molecules/Details'

const ObjectFields: DetailsItem[] = [
  { title: 'Proveedor', render: (_, order) => order.supplier.name },
  { title: 'Tel. del Proveedor', render: (_, order) => order.supplier.phone },
  { title: 'Nombre del Negocio', render: (_, order) => order.customer.businessName },
  { title: 'Tel. del Negocio', render: (_, order) => order.customer.phone },
  { title: 'Nombre del Contacto', render: (_, order) => order.customer.contactName },
  { title: 'Tel. del Contacto', render: (_, order) => order.customer.contactPhone },
  { title: 'Total', render: (_, order) => <Price mount={order.total} /> },
  { title: 'Fecha', render: (_, order) => formatDate(order.createAt) },
]

type OrderDetailsProps = {
  title: string
  obj: OrderDetail | undefined
  option: OptionDetails
  errors: string[]
}

export default function OrderDetails({ title, obj, option, errors }: OrderDetailsProps) {
  return <Details title={title} obj={obj} items={ObjectFields} option={option} errors={errors} />
}
