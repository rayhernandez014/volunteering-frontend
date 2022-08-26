import { setMobile } from '../reducers/mobileReducer'

import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/loginReducer'
import { useNavigate, Link as RouterLink } from 'react-router-dom'

import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'

const Bar = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const loggedUser = useSelector((state) => state.login)
  const mobileOpen = useSelector( (state) => state.mobile)

  const handleDrawerToggle = () => {
    dispatch(setMobile(!mobileOpen))
  }

  return (
    <AppBar position="fixed" sx={{ zIndex: 1201 }}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
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