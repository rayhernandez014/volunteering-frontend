import { createSlice } from '@reduxjs/toolkit'

const mapSlice = createSlice({
  name: 'map',
  initialState: {
    location: [0,0],
    searchMode: true
  },
  reducers: {
    setLocation(state, action) {
      return { ...state, location: action.payload }
    },
    setMode(state, action) {
      return { ...state, searchMode: action.payload }
    }
  }
})

export const { setLocation, setMode } = mapSlice.actions

export default mapSlice.reducer