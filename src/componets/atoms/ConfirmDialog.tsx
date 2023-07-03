import Dialog, { DialogProps } from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import ReportProblemIcon from '@mui/icons-material/ReportProblem'

import CustomButton from './CustomButton'
import { Box } from '@mui/material'

type ConfirmDialog = DialogProps & {
  content: string
  setOpen: (value: boolean) => void
  onAcept: () => void
  onCancel?: () => void | undefined
}

export default function ConfirmDialog({
  content,
  setOpen,
  onAcept,
  onCancel = undefined,
  ...props
}: ConfirmDialog) {
  const handlerCancel = () => {
    setOpen(false)

    if (onCancel) {
      onCancel()
    }
  }

  const handlerAcept = () => {
    setOpen(false)
    onAcept()
  }

  return (
    <Dialog
      onClose={handlerCancel}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      {...props}
    >
      <Box display='flex' alignItems='center' justifyContent='center'>
        <ReportProblemIcon sx={{ fontSize: 40 }} color='warning'></ReportProblemIcon>
      </Box>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <CustomButton
          id='no'
          onClick={handlerCancel}
          text='No'
          sx={{ mb: 0, mt: 0 }}
        ></CustomButton>
        <CustomButton
          id='yes'
          onClick={handlerAcept}
          autoFocus
          text='Sí'
          sx={{ mb: 0, mt: 0 }}
        ></CustomButton>
      </DialogActions>
    </Dialog>
  )
}
