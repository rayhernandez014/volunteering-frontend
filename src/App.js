import Login from './components/Login'
import Notification from './components/Notification'
import Event from './components/Event'
import EventForm from './components/EventForm'
import Register from './components/Register'
import Home from './components/Home'
import Confirmation from './components/Confirmation'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeLoggedUser } from './reducers/loginReducer'

import { Routes, Route, Navigate } from 'react-router-dom'

import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'

import { ThemeProvider, createTheme } from '@mui/material/styles'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeLoggedUser())
  }, [dispatch])

  const loggedUser = useSelector ((state) => state.login)

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
        <Notification />
        <Confirmation />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/events/:id" element={<Event/>} />
          <Route path="/eventform" element={ <EventForm />} />
          <Route path="/login" element={!loggedUser ? <Login /> : <Navigate replace to="/" />} />
          <Route path="/register" element={!loggedUser ? <Register /> : <Navigate replace to="/" />} />
        </Routes>
      </Container>
    </ThemeProvider>
  )
}

export default App