import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import logoutService from '../services/logout'
import userService from '../services/users'
import { callNotification } from './notificationReducer'
import { initializeUsers } from './userReducer'

const loginSlice = createSlice({
  name: 'login',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    }
  }
})

export const { setUser } = loginSlice.actions

export const login = (credentials) => {
  return async (dispatch) => {
    const email = credentials.email
    const password = credentials.password
    try {
      const receivedUser = await loginService.login({
        email,
        password
      })
      window.localStorage.setItem(
        'loggedVolunteeringAppUser',
        JSON.stringify(receivedUser)
      )
      userService.setToken(receivedUser.token)
      logoutService.setToken(receivedUser.token)
      dispatch(initializeUsers())
      dispatch(setUser(receivedUser))
      dispatch(
        callNotification(`You logged in as ${receivedUser.name}!`, 'success', 5)
      )
    } catch (exception) {
      dispatch(callNotification(exception.response.data.error, 'error', 5))
    }
  }
}

export const logout = () => {
  return async (dispatch, getState) => {
    const { login } = getState()
    try{
      await logoutService.logout()
      window.localStorage.removeItem('loggedVolunteeringAppUser')
      dispatch(
        callNotification(`${login.name} has logged out!`, 'success', 5)
      )
      userService.setToken(null)
      logoutService.setToken(null)
      dispatch(setUser(null))
    }
    catch (exception) {
      dispatch(callNotification(exception.response.data.error, 'error', 5))
    }
  }
}

export const initializeLoggedUser = () => {
  return (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedVolunteeringAppUser')
    if (loggedUserJSON) {
      const storedUser = JSON.parse(loggedUserJSON)
      userService.setToken(storedUser.token)
      logoutService.setToken(storedUser.token)
      dispatch(initializeUsers())
      dispatch(setUser(storedUser))
    }
  }
}

export default loginSlice.reducer