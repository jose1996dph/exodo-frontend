import CustomTable, { CustomRow } from '../molecules/CustomTable'
import { PaymentItem, PaymentType } from '../../domains/payment.domain'
import { formatDate } from '../../framework/helpers/formatter.helper'

const propRows: CustomRow[] = [
  {
    title: 'Tipo de pago',
    key: 'paymentType',
    isImportant: true,
    render: (_, item: PaymentItem) => {
      if (item.paymentType === PaymentType.CASH) {
        return 'Efectivo'
      } else if (item.paymentType === PaymentType.MOBILE_PAYMENT) {
        return 'Pago movil'
      } else if (item.paymentType === PaymentType.TRANSFERENCE) {
        return 'Transferencia'
      }
      return ''
    },
  },
  { title: 'Codigo de referencia', isImportant: false, key: 'referenceCode' },
  {
    title: 'Fecha de transferencia',
    key: 'transferDate',
    isImportant: false,
    render: (_, item: PaymentItem) => item.transferDate && formatDate(item.transferDate),
  },
  {
    title: 'Fecha de recibimiento',
    key: 'createAt',
    isImportant: true,
    render: (_, item: PaymentItem) => formatDate(item.createAt),
  },
  {
    title: 'Monto',
    key: 'mount',
    isImportant: true,
    render: (_, item: PaymentItem) => item.mount.toFixed(2),
  },
]

type PaymentTableProps = {
  pages: number
  page: number
  setPage: (value: number) => void
  orderBy: string
  setOrderBy: (attribute: string) => void
  orderDirection: 'asc' | 'desc'
  setOrderDirection: (attribute: 'asc' | 'desc') => void
  data: PaymentItem[]
}

export default function PaymentTable({
  pages,
  page,
  setPage,
  orderBy,
  setOrderBy,
  orderDirection,
  setOrderDirection,
  data,
}: PaymentTableProps) {
  return (
    <CustomTable
      title='Pagos'
      pages={pages}
      page={page}
      setPage={setPage}
      items={data}
      orderBy={orderBy}
      setOrderBy={setOrderBy}
      orderDirection={orderDirection}
      setOrderDirection={setOrderDirection}
      tableRows={propRows}
    ></CustomTable>
  )
}
