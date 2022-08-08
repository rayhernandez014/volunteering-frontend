import { useDispatch } from 'react-redux'
import { login } from '../reducers/loginReducer'
import { useNavigate } from 'react-router-dom'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submitCredentials = (event) => {
    event.preventDefault()
    const credentials = {
      email: event.target.email.value,
      password: event.target.password.value
    }
    dispatch(login(credentials))
    event.target.email.value = ''
    event.target.password.value = ''
    navigate('/')
  }

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant="h4" component="h4">
        Sign in
      </Typography>
      <Box component="form" onSubmit={submitCredentials} noValidate sx={{ mt: 1 }}>
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
          Sign in
        </Button>
      </Box>
    </Box>
  )
}

export default Login