import { Fragment, useState } from 'react'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import PrintIcon from '@mui/icons-material/Print'
import CircularProgress from '@mui/material/CircularProgress'
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
  onReport?: (id: number, item: any) => Promise<void> | undefined
  onToggle?: (id: number) => void | undefined
}

function TableAction({
  item,
  identify,
  onShow = undefined,
  onDelete = undefined,
  onUpdate = undefined,
  onReport = undefined,
  onToggle = undefined,
}: TableAction) {
  const [isLoading, setIsLoading] = useState(false)

  const handlerOnReport = async (id: number, item: any) => {
    if (isLoading || !onReport) {
      return
    }

    setIsLoading(true)

    await onReport(id, item)

    setIsLoading(false)
  }

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
      {onReport && (
        <IconButton color='primary' onClick={() => handlerOnReport(item[identify], item)}>
          {isLoading ? <CircularProgress size={20} /> : <PrintIcon />}
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
  onReport?: (id: number, item: any) => Promise<void> | undefined
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
  onReport = undefined,
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
              onReport={onReport}
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
                        <Fragment key={tableRow.key}>
                          <Grid item xs={6}>
                            <b>{tableRow.title}</b>
                          </Grid>
                          <Grid item xs={6}>
                            {tableRow.render ? tableRow.render(tableRow, item) : item[tableRow.key]}
                          </Grid>
                        </Fragment>
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
                      onReport={onReport}
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
