import Login from './components/Login'
import Notification from './components/Notification'
import Events from './components/Events'
import Bar from './components/Bar'
import Event from './components/Event'
import EventForm from './components/EventForm'
import Register from './components/Register'

import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initializeLoggedUser } from './reducers/loginReducer'
import { initializeEvents } from './reducers/eventReducer'

import { Routes, Route } from 'react-router-dom'

import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'

import { ThemeProvider, createTheme } from '@mui/material/styles'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeLoggedUser())
    dispatch(initializeEvents())
  }, [dispatch])

  const theme = createTheme({
    palette: {
      primary: {
        main: '#5D4BCA',
        light: '#F2F0FF'
      },
      secondary: {
        main: '#FFFFFF',
        contrastText: '#5D4BCA'
      }
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth={false} disableGutters={true}>
        <CssBaseline />
        <Bar />
        <Notification />
        <Routes>
          <Route path="/" element={<Events/>} />
          <Route path="/events/:id" element={<Event/>} />
          <Route path="/eventform" element={<EventForm/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Container>
    </ThemeProvider>
  )
}

export default App