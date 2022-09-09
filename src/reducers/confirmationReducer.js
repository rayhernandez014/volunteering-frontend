import { createSlice } from '@reduxjs/toolkit'

const initialState = false

const confirmationSlice = createSlice({
  name: 'confirmation',
  initialState,
  reducers: {
    setOpen(state, action) {
      return action.payload
    }
  }
})

export const { setOpen } = confirmationSlice.actions

export default confirmationSlice.reducer