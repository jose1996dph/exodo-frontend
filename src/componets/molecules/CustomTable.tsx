import { Fragment, FC } from 'react'
import Link from '@mui/material/Link'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { TableCellProps } from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Title from '../atoms/Title'

type PreventDefault = (event: React.MouseEvent) => void

export type CustomTableRow = {
  title: string
  key: string
  props?: TableCellProps | undefined
}

type CustomTableProps = {
  title: string
  tableRows: CustomTableRow[]
  items: any[]
  preventDefault: PreventDefault
}

const CustomTable: FC<CustomTableProps> = ({ title, tableRows, items, preventDefault }) => {
  return (
    <Fragment>
      <Title>{title}</Title>
      <Table size='small'>
        <TableHead>
          <TableRow>
            {tableRows.map((tableRow) => (
              <TableCell key={tableRow.key} {...tableRow.props}>
                {tableRow.title}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              {tableRows.map((tableRow) => (
                <TableCell key={tableRow.key} {...tableRow.props}>
                  {item[tableRow.key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color='primary' href='#' onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </Fragment>
  )
}

export default CustomTable
