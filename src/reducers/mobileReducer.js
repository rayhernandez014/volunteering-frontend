import { createSlice } from '@reduxjs/toolkit'

const mobileSlice = createSlice({
  name: 'mobile',
  initialState: false,
  reducers: {
    setMobile(state, action) {
      return action.payload
    }
  }
})

export const { setMobile } = mobileSlice.actions

export default mobileSlice.reducer