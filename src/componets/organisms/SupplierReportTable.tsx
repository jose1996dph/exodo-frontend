import CustomTable, { CustomRow } from '../molecules/CustomTable'
import { formatInteger } from '../../framework/helpers/formatter.helper'
import { SupplierReport } from '../../domains/supplierReport.domain'
import Price from '../atoms/Price'

const propRows: CustomRow[] = [
  { title: 'Proveedores', isImportant: true, key: 'name' },
  {
    title: 'Cantidad de facturas',
    isImportant: true,
    key: 'count',
    render: (_, item: SupplierReport) => formatInteger(item.count || 0),
  },
  {
    title: 'Total cobrado',
    key: 'total',
    isImportant: false,
    render: (_, item: SupplierReport) => <Price mount={item.total || 0} />,
  },
]

type SupplierReportTableProps = {
  pages: number
  page: number
  setPage: (value: number) => void
  orderBy: string
  setOrderBy: (attribute: string) => void
  orderDirection: 'asc' | 'desc'
  setOrderDirection: (attribute: 'asc' | 'desc') => void
  data: SupplierReport[]
  onReport: (id: number, item: any) => Promise<void>
}

export default function SupplierReportTable({
  pages,
  page,
  setPage,
  orderBy,
  setOrderBy,
  orderDirection,
  setOrderDirection,
  data,
  onReport,
}: SupplierReportTableProps) {
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
      onReport={onReport}
    ></CustomTable>
  )
}
