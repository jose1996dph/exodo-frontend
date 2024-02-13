import CustomTable, { CustomRow } from '../molecules/CustomTable'
import { formatFloat, formatInteger } from '../../framework/helpers/formatter.helper'
import { SupplierReport } from '../../domains/supplierReport.domain'

const propRows: CustomRow[] = [
  { title: 'Distribuidores', isImportant: true, key: 'name' },
  {
    title: 'Cantidad de facturas',
    isImportant: true,
    key: 'count',
    render: (_, item: SupplierReport) => formatInteger(item.count || 0),
  },
  {
    title: 'Total facturado',
    key: 'total',
    isImportant: false,
    render: (_, item: SupplierReport) => formatFloat(item.total || 0),
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
}: SupplierReportTableProps) {
  return (
    <CustomTable
      title='Distribuidores'
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
