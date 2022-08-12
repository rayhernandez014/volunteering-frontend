import { useDispatch } from 'react-redux'
import { useNavigate, Link as RouterLink } from 'react-router-dom'
import userService from '../services/users'
import { callNotification } from '../reducers/notificationReducer'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'

const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submitUser = async (event) => {
    event.preventDefault()
    const newUser = {
      name: event.target.name.value,
      email: event.target.email.value,
      password: event.target.password.value
    }
    try {
      const returnedUser = await userService.create(newUser)
      dispatch(
        callNotification(
          `User ${returnedUser.name} created successfully`,
          'success',
          5
        )
      )
      navigate('/')
    } catch (exception) {
      dispatch(callNotification(exception.response.data.error, 'error', 5))
    }
    event.target.name.value = ''
    event.target.email.value = ''
    event.target.password.value = ''
  }

  return (
    <Box
      sx={{
        marginTop: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <Typography variant="h4" component="h4">
        Sign up
      </Typography>
      <Box component="form" onSubmit={submitUser} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          label="Name"
          type="text"
          id="name"
          name="name"
          autoComplete="name"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Email Address"
          type="text"
          id="email"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Password"
          type="password"
          id="password"
          name="password"
          autoComplete="current-password"
        />
        <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 3, mb: 2 }}>
          Sign up
        </Button>
        <Link component={ RouterLink } to="/">Already have an account? Sign in</Link>
      </Box>
    </Box>
  )
}

export default Register