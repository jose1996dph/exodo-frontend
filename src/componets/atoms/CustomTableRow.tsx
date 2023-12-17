import { Fragment, useState } from 'react'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import { CustomRow } from '../molecules/CustomTable'
import { Box, Collapse, Grid, Switch } from '@mui/material'

type TableAction = {
  item: any
  identify: string
  onShow?: (id: number) => void | undefined
  onDelete?: (id: number, item: any) => void | undefined
  onUpdate?: (id: number, item: any) => void | undefined
  onToggle?: (id: number) => void | undefined
}

function TableAction({
  item,
  identify,
  onShow = undefined,
  onDelete = undefined,
  onUpdate = undefined,
  onToggle = undefined,
}: TableAction) {
  return (
    <>
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
        <IconButton color='error' onClick={() => onDelete(item[identify], item)}>
          <DeleteIcon />
        </IconButton>
      )}
      {onToggle && <Switch checked={item['isActive']} onChange={() => onToggle(item[identify])} />}
    </>
  )
}

type CustomTableRowProps = {
  doShowCollapse: boolean
  item: any
  identify: string
  tableRows: CustomRow[]
  onShow?: (id: number) => void | undefined
  onDelete?: (id: number, item: any) => void | undefined
  onUpdate?: (id: number, item: any) => void | undefined
  onToggle?: (id: number) => void | undefined
}

export default function CustomTableRow({
  doShowCollapse,
  item,
  identify = 'id',
  tableRows,
  onShow = undefined,
  onDelete = undefined,
  onUpdate = undefined,
  onToggle = undefined,
}: CustomTableRowProps) {
  const [open, setOpen] = useState(false)

  return (
    <Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        {doShowCollapse && (
          <TableCell size='small'>
            <IconButton size='small' onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
        )}
        {tableRows.map(
          (tableRow) =>
            (!doShowCollapse || tableRow.isImportant) && (
              <TableCell size='medium' key={tableRow.key} {...tableRow.props}>
                {tableRow.render ? tableRow.render(tableRow, item) : item[tableRow.key]}
              </TableCell>
            ),
        )}
        {!doShowCollapse && (
          <TableCell align='right'>
            <TableAction
              item={item}
              identify={identify}
              onDelete={onDelete}
              onShow={onShow}
              onToggle={onToggle}
              onUpdate={onUpdate}
            ></TableAction>
            {/**
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
            <IconButton color='error' onClick={() => onDelete(item[identify], item)}>
              <DeleteIcon />
            </IconButton>
          )}
          {onToggle && (
            <Switch checked={item['isActive']} onChange={() => onToggle(item[identify])} />
          )}
           */}
          </TableCell>
        )}
      </TableRow>
      {doShowCollapse && (
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout='auto' unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Grid container>
                  {tableRows.map(
                    (tableRow) =>
                      !tableRow.isImportant && (
                        <>
                          <Grid item xs={6} key={tableRow.key}>
                            <b>{tableRow.title}</b>
                          </Grid>
                          <Grid item xs={6} key={tableRow.key}>
                            {tableRow.render ? tableRow.render(tableRow, item) : item[tableRow.key]}
                          </Grid>
                        </>
                      ),
                  )}
                  <Grid
                    item
                    xs={12}
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      p: 1,
                      m: 1,
                      bgcolor: 'background.paper',
                      borderRadius: 1,
                    }}
                  >
                    <TableAction
                      item={item}
                      identify={identify}
                      onDelete={onDelete}
                      onShow={onShow}
                      onToggle={onToggle}
                      onUpdate={onUpdate}
                    ></TableAction>
                  </Grid>
                </Grid>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </Fragment>
  )
}
