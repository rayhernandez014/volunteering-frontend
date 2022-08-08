import Login from './components/Login'
import Notification from './components/Notification'
import Users from './components/Users'
import Bar from './components/Bar'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeLoggedUser } from './reducers/loginReducer'

import { Routes, Route } from 'react-router-dom'

import { Container } from '@mui/material'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeLoggedUser())
  }, [dispatch])

  const loggedUser = useSelector((state) => state.login)

  return (
    <Container>
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
          <Login />
        </>
      )}
    </Container>
  )
}

export default App