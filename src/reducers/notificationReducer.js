import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: '',
  type: 'info',
  show: false

}

let timeoutID = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    removeNotification(state) {
      return { ...state, show: false }
    }
  }
})

export const { setNotification, removeNotification } = notificationSlice.actions

export const callNotification = (message, type, time) => {
  return async (dispatch) => {
    if (timeoutID) {
      clearTimeout(timeoutID)
    }
    const timeout = time * 1000
    dispatch(setNotification({ message, type, show: true }))
    timeoutID = setTimeout(() => {
      dispatch(removeNotification())
    }, timeout)
  }
}

export default notificationSlice.reducer