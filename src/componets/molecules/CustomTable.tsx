import { Fragment } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { TableCellProps } from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

import Title from '../atoms/Title'
import { Pagination } from '@mui/material'

export type CustomTableRow = {
  title: string
  key: string
  props?: TableCellProps | undefined
}

type CustomTableProps = {
  title: string
  pages: number
  page: number
  setPage: (value: number) => void
  tableRows: CustomTableRow[]
  items: any[]
  onDelete: (id: number) => void
  onUpdate: (id: number) => void
}

export default function CustomTable({
  title,
  pages,
  page,
  setPage,
  tableRows,
  items,
  onDelete,
  onUpdate,
}: CustomTableProps) {
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
            <TableCell></TableCell>
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
              <TableCell align='right'>
                <IconButton color='primary' onClick={() => onUpdate(item.id)}>
                  <EditIcon />
                </IconButton>
                <IconButton color='error' onClick={() => onDelete(item.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {items.length == 0 && (
        <Typography variant='body2' color='text.secondary' align='center'>
          {'No se encontraron registros'}
        </Typography>
      )}
      {pages > 0 && (
        <Pagination
          sx={{ marginLeft: 'auto', marginRight: 'auto', marginTop: '15px' }}
          count={pages}
          page={page}
          onChange={(_, value) => setPage(value)}
        />
      )}
    </Fragment>
  )
}
