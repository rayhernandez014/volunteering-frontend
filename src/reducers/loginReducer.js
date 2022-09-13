import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import logoutService from '../services/logout'
import userService from '../services/users'
import eventService from '../services/events'
import { callNotification } from './notificationReducer'
import { setCurrentLocation } from './eventReducer'

const initialState = null

const loginSlice = createSlice({
  name: 'login',
  initialState,
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
      eventService.setToken(receivedUser.token)
      dispatch(setUser(receivedUser))
      dispatch(setCurrentLocation([receivedUser.latitude, receivedUser.longitude]))
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
      dispatch(
        callNotification(`${login.name} has logged out!`, 'success', 5)
      )
    }
    catch (exception) {
      dispatch(callNotification(exception.response.data.error, 'error', 5))
    }
    window.localStorage.removeItem('loggedVolunteeringAppUser')
    userService.setToken(null)
    logoutService.setToken(null)
    eventService.setToken(null)
    dispatch(setUser(null))
  }
}

export const initializeLoggedUser = () => {
  return (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedVolunteeringAppUser')
    if (loggedUserJSON) {
      const storedUser = JSON.parse(loggedUserJSON)
      userService.setToken(storedUser.token)
      logoutService.setToken(storedUser.token)
      eventService.setToken(storedUser.token)
      dispatch(setUser(storedUser))
      dispatch(setCurrentLocation([storedUser.latitude, storedUser.longitude]))
    }
  }
}

export default loginSlice.reducer