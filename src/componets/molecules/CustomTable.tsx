import { Fragment, ReactNode } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { TableCellProps } from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'

import Title from '../atoms/Title'
import { Pagination, Switch } from '@mui/material'

export type CustomTableRow = {
  title: string
  key: string
  render?: (tableRow: CustomTableRow, item: any) => ReactNode
  props?: TableCellProps | undefined
}

type CustomTableProps = {
  title: string
  pages: number
  page: number
  setPage: (value: number) => void
  tableRows: CustomTableRow[]
  items: any[]
  identify?: string
  onShow?: (id: number) => void | undefined
  onDelete?: (id: number) => void | undefined
  onUpdate?: (id: number, item: any) => void | undefined
  onToggle?: (id: number) => void | undefined
}

export default function CustomTable({
  title,
  pages,
  page,
  setPage,
  tableRows,
  items,
  identify = 'id',
  onShow = undefined,
  onDelete = undefined,
  onUpdate = undefined,
  onToggle = undefined,
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
          {items.map((item) => {
            return (
              <TableRow key={item[identify]}>
                {tableRows.map((tableRow) => (
                  <TableCell key={tableRow.key} {...tableRow.props}>
                    {tableRow.render ? tableRow.render(tableRow, item) : item[tableRow.key]}
                  </TableCell>
                ))}
                <TableCell align='right'>
                  {onShow && (
                    <IconButton color='primary' onClick={() => onShow(item[identify])}>
                      <VisibilityIcon />
                    </IconButton>
                  )}
                  {onUpdate && (
                    <IconButton color='primary' onClick={() => onUpdate(item[identify], item)}>
                      <EditIcon />
                    </IconButton>
                  )}
                  {onDelete && (
                    <IconButton color='error' onClick={() => onDelete(item[identify])}>
                      <DeleteIcon />
                    </IconButton>
                  )}
                  {onToggle && (
                    <Switch checked={item['isActive']} onChange={() => onToggle(item[identify])} />
                  )}
                </TableCell>
              </TableRow>
            )
          })}
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
