import { createSlice } from '@reduxjs/toolkit'

const mapSlice = createSlice({
  name: 'map',
  initialState: {
    coordinates: [0,0],
    address: ''
  },
  reducers: {
    setCoordinates(state, action) {
      return { ...state, coordinates: action.payload }
    },
    setAddress(state, action) {
      return { ...state, address: action.payload }
    }
  }
})

export const { setCoordinates, setAddress } = mapSlice.actions

export default mapSlice.reducer