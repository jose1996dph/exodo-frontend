import Dialog, { DialogProps } from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import ReportProblemIcon from '@mui/icons-material/ReportProblem'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

import CustomButton from './CustomButton'
import { Box } from '@mui/material'

type AlertDialogProps = DialogProps & {
  icon: 'warning' | 'success'
  content: string
  setOpen: (value: boolean) => void
  onAcept: () => void
}

export default function AlertDialog({
  content,
  setOpen,
  onAcept,
  icon,
  ...props
}: AlertDialogProps) {
  const handlerCancel = () => {
    setOpen(false)
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
        {icon == 'success' ? (
          <CheckCircleIcon sx={{ fontSize: 40 }} color={icon}></CheckCircleIcon>
        ) : (
          <ReportProblemIcon sx={{ fontSize: 40 }} color={icon}></ReportProblemIcon>
        )}
      </Box>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <CustomButton
          id='yes'
          onClick={handlerAcept}
          autoFocus
          text='Aceptar'
          sx={{ mb: 0, mt: 0 }}
        ></CustomButton>
      </DialogActions>
    </Dialog>
  )
}
