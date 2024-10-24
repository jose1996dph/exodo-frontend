import CustomTable, { CustomRow } from '../molecules/CustomTable'
import { SellerReport } from '../../domains/sellerReport.domain'
import { formatInteger } from '../../framework/helpers/formatter.helper'
import Price from '../atoms/Price'

const propRows: CustomRow[] = [
  { title: 'Vendedor', isImportant: true, key: 'name' },
  {
    title: 'Cantidad de facturas',
    isImportant: true,
    key: 'count',
    render: (_, item: SellerReport) => formatInteger(item.count),
  },
  {
    title: 'Total cobrado',
    key: 'total',
    isImportant: false,
    render: (_, item: SellerReport) => <Price mount={item.total} />,
  },
  {
    title: 'Comision de venta (2 %)',
    key: 'commission',
    isImportant: true,
    render: (_, item: SellerReport) => <Price mount={item.commission} />,
  },
]

type SellerReportTableProps = {
  pages: number
  page: number
  setPage: (value: number) => void
  orderBy: string
  setOrderBy: (attribute: string) => void
  orderDirection: 'asc' | 'desc'
  setOrderDirection: (attribute: 'asc' | 'desc') => void
  data: SellerReport[]
}

export default function SellerReportTable({
  pages,
  page,
  setPage,
  orderBy,
  setOrderBy,
  orderDirection,
  setOrderDirection,
  data,
}: SellerReportTableProps) {
  return (
    <CustomTable
      title='Vendedores'
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
