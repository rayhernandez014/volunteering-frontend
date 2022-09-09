import { createSlice } from '@reduxjs/toolkit'

const initialState = false

const mobileSlice = createSlice({
  name: 'mobile',
  initialState,
  reducers: {
    setMobile(state, action) {
      return action.payload
    }
  }
})

export const { setMobile } = mobileSlice.actions

export default mobileSlice.reducer