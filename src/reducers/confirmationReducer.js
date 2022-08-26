import { createSlice } from '@reduxjs/toolkit'

const confirmationSlice = createSlice({
  name: 'confirmation',
  initialState: false,
  reducers: {
    setOpen(state, action) {
      return action.payload
    }
  }
})

export const { setOpen } = confirmationSlice.actions

export default confirmationSlice.reducer