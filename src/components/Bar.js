import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'

import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/loginReducer'
import { useNavigate, Link as RouterLink } from 'react-router-dom'

const Bar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const loggedUser = useSelector((state) => state.login)

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h5" component={ RouterLink } to="/" sx={{ flexGrow: 1 }} color="primary.contrastText" style={{ textDecoration: 'none' }}>
              Volunteer.app
        </Typography>
        {
          loggedUser ? (
            <>
              <Typography variant="body1" component="span" sx={{ mx: 2 }}>
                {`${loggedUser.name} is logged in`}
              </Typography>
              <Button color="inherit" onClick={() => dispatch(logout())} id="logout-button" sx={{ mx: 2 }}>Log out</Button>
            </>
          ) : (
            <>
              <Link component={ RouterLink } to="/login" underline="hover" color="white" sx={{ mx: 2 }}>Already have an account? Sign in</Link>
              <Button variant="contained" color="secondary" sx={{ borderRadius: 4, mx: 2 }} onClick={() => {navigate('/register')}}>Register</Button>
            </>
          )
        }

      </Toolbar>
    </AppBar>
  )
}

export default Bar