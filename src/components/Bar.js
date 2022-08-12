import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/loginReducer'

const Bar = () => {
  const dispatch = useDispatch()
  const loggedUser = useSelector( (state) => state.login )

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h5" component="h5" sx={{ flexGrow: 1 }}>
              Volunteering App
        </Typography>
        <Typography variant="body1" component="span" sx={{ mx: 2 }}>
          {`${loggedUser.name} is logged in`}
        </Typography>
        <Button color="inherit" onClick={() => dispatch(logout())} id="logout-button">Log out</Button>
      </Toolbar>
    </AppBar>
  )
}

export default Bar