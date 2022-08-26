import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { useDispatch, useSelector } from 'react-redux'
import { setOpen } from '../reducers/confirmationReducer'
import { useNavigate } from 'react-router-dom'

const Confirmation = () => {
  const open = useSelector ((state) => state.confirmation)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleClose = () => {
    dispatch(setOpen(false))
  }

  const handleAccept = () => {
    dispatch(setOpen(false))
    navigate('/login')
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {'Do you wish to sign in first?'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
            In order to perform this action you need to sign in or register
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleAccept} autoFocus>
            Accept
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default Confirmation