import { createSlice } from '@reduxjs/toolkit'
import dayjs from 'dayjs'


const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    startDate: dayjs().toJSON(),
    endDate: dayjs().toJSON()
  },
  reducers: {
    setStartDate(state, action) {
      return { ...state, startDate: action.payload }
    },
    setEndDate(state, action) {
      return { ...state, endDate: action.payload }
    },
    resetDates() {
      return { startDate: dayjs().toJSON(), endDate: dayjs().toJSON() }
    }
  }
})

export const { setEndDate, setStartDate, resetDates } = calendarSlice.actions

export default calendarSlice.reducer