import Alert from '@mui/material/Alert'
import { useSelector } from 'react-redux'
import Snackbar from '@mui/material/Snackbar'

const Notification = () => {

  const { message, type, show } = useSelector((state) => state.notification)

  return (

    <Snackbar open={show} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
      <Alert severity={type}> {message} </Alert>
    </Snackbar>

  )

}

export default Notification