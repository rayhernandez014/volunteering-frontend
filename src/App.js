import Login from './components/Login'
import Notification from './components/Notification'
import Users from './components/Users'
import Bar from './components/Bar'
import Register from './components/Register'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeLoggedUser } from './reducers/loginReducer'

import { Routes, Route } from 'react-router-dom'

import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeLoggedUser())
  }, [dispatch])

  const loggedUser = useSelector((state) => state.login)

  return (
    <Container maxWidth={false} disableGutters={true}>
      <CssBaseline />
      {loggedUser ? (
        <>
          <Bar />
          <Notification />
          <Routes>
            <Route path="/" element={<Users />} />
          </Routes>
        </>
      ) : (
        <>
          <Notification />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </>
      )}
    </Container>
  )
}

export default App