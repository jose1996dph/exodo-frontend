import { Fragment, ReactNode } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { TableCellProps } from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'

import Title from '../atoms/Title'
import CustomTableRow from '../atoms/CustomTableRow'
import { Box, Pagination, TableSortLabel, useMediaQuery } from '@mui/material'

export type CustomRow = {
  title: string
  key: string
  isImportant: boolean
  render?: (tableRow: CustomRow, item: any) => ReactNode
  props?: TableCellProps | undefined
}

type CustomTableProps = {
  title: string
  pages: number
  page: number
  setPage: (value: number) => void
  tableRows: CustomRow[]
  items: any[]
  identify?: string
  orderBy?: string | undefined
  orderDirection?: 'asc' | 'desc' | undefined
  setOrderBy?: ((attribute: string) => void) | undefined
  setOrderDirection?: ((attribute: 'asc' | 'desc') => void) | undefined
  onShow?: (id: number) => void | undefined
  onDelete?: (id: number, item: any) => void | undefined
  onUpdate?: (id: number, item: any) => void | undefined
  onReport?: (id: number, item: any) => Promise<void> | undefined
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
  orderBy = undefined,
  orderDirection = undefined,
  setOrderBy = undefined,
  setOrderDirection = undefined,
  onShow = undefined,
  onDelete = undefined,
  onUpdate = undefined,
  onReport = undefined,
  onToggle = undefined,
}: CustomTableProps) {
  const isNotAllImportant = tableRows.some((tr) => !tr.isImportant)
  const isXs = useMediaQuery((theme: any) => theme.breakpoints.down('sm'))
  const doShowCollapse = isNotAllImportant && isXs

  const handlerTogglerSort = (attribute: string) => {
    if (!orderBy) {
      return
    }
    if (setOrderBy) {
      setOrderBy(attribute)
    }
    if (!setOrderDirection) {
      return
    }
    if (orderBy === attribute) {
      setOrderDirection(orderDirection === 'asc' ? 'desc' : 'asc')
      return
    }
    setOrderDirection('asc')
  }

  return (
    <Fragment>
      <Title>{title}</Title>
      <Box sx={{ overflowX: 'auto' }}>
        <Box sx={{ width: '100%', display: 'table', tableLayout: 'fixed' }}>
          <Table size='small'>
            <TableHead>
              <TableRow>
                {doShowCollapse && <TableCell size='small'></TableCell>}
                {tableRows.map(
                  (tableRow) =>
                    (!doShowCollapse || tableRow.isImportant) && (
                      <TableCell size='small' key={tableRow.key} {...tableRow.props}>
                        {orderBy && orderDirection ? (
                          <TableSortLabel
                            active={orderBy === tableRow.key}
                            direction={orderBy === tableRow.key ? orderDirection : 'asc'}
                            onClick={() => handlerTogglerSort(tableRow.key)}
                          >
                            {tableRow.title}
                          </TableSortLabel>
                        ) : (
                          <>{tableRow.title}</>
                        )}
                      </TableCell>
                    ),
                )}
                <TableCell size='small'></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => (
                <CustomTableRow
                  doShowCollapse={doShowCollapse}
                  item={item}
                  identify={identify}
                  tableRows={tableRows}
                  key={item[identify]}
                  onDelete={onDelete}
                  onShow={onShow}
                  onToggle={onToggle}
                  onReport={onReport}
                  onUpdate={onUpdate}
                ></CustomTableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Box>
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
