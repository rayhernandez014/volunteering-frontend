import Alert from '@mui/material/Alert'
import { useSelector } from 'react-redux'

const Notification = () => {

  const { message, type } = useSelector((state) => state.notification)

  if (!message || !type) {
    return null
  } else {
    return <Alert severity={type}>{message}</Alert>
  }
}

export default Notification