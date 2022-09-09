import { createSlice } from '@reduxjs/toolkit'
import dayjs from 'dayjs'

const initialState = {
  title: '',
  description: '',
  latitude: 0,
  longitude: 0,
  address: '',
  category: '',
  spots: 0,
  startDate: dayjs().toJSON(),
  endDate: dayjs().toJSON(),
  image: ''
}

const eventFormSlice = createSlice({
  name: 'eventForm',
  initialState,
  reducers: {
    setEvent(state, action) {
      const key = Object.keys(action.payload)[0]
      const value = Object.values(action.payload)[0]
      const stateCopy = { ...state }
      stateCopy[key] = value
      return stateCopy
    },
    setLocationInfo(state, action) {
      const latitude = action.payload.latitude
      const longitude = action.payload.longitude
      const address = action.payload.address
      return { ...state, address, latitude, longitude }
    },
    resetEventForm() {
      return {
        title: '',
        description: '',
        latitude: 0,
        longitude: 0,
        address: '',
        category: '',
        spots: 0,
        startDate: dayjs().toJSON(),
        endDate: dayjs().toJSON(),
        image: ''
      }
    }
  }
})

export const { setEvent, setLocationInfo, resetEventForm } = eventFormSlice.actions

export default eventFormSlice.reducer