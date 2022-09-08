import { createSlice } from '@reduxjs/toolkit'

const homeMapSlice = createSlice({
  name: 'homeMap',
  initialState: null,
  reducers: {
    setHomeMap(state, action) {
      return action.payload
    }
  }
})

export const { setHomeMap } = homeMapSlice.actions

export default homeMapSlice.reducer