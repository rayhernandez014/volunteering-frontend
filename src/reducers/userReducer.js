import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'
import { callNotification } from './notificationReducer'

const initialState = null

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsers(state, action) {
      return action.payload
    }
  }
})

export const { setUsers } = userSlice.actions

export const initializeUsers = () => {
  return async (dispatch) => {
    try{
      const users = await userService.getAll()
      dispatch(setUsers(users))
    }
    catch (exception) {
      dispatch(callNotification(exception.response.data.error, 'error', 5))
    }
  }
}

export default userSlice.reducer