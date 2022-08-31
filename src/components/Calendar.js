import TextField from '@mui/material/TextField'

import { useDispatch } from 'react-redux'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'

import Box from '@mui/material/Box'

const Calendar = ({ label, setValue, value }) => {

  const dispatch = useDispatch()

  return (
    <Box sx={{ mr: '16px', mt: '16px' }}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          renderInput={(props) => <TextField {...props} />}
          label={label}
          value={value}
          onChange={(newValue) => {
            dispatch(setValue(newValue.toJSON()))
          }}
        />
      </LocalizationProvider>
    </Box>
  )
}

export default Calendar