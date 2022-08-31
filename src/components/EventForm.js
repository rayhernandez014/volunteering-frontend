import { useDispatch, useSelector } from 'react-redux'
import { createEvent } from '../reducers/eventReducer'

import { useNavigate } from 'react-router-dom'

import { setOpen } from '../reducers/confirmationReducer'

import { setStartDate, setEndDate, resetDates } from '../reducers/calendarReducer'

import Calendar from './Calendar'
import MyMap from './MyMap'

import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import Autocomplete from '@mui/material/Autocomplete'

const EventForm = () => {

  const dispatch = useDispatch()
  const selectedDate = useSelector( (state) => state.calendar )
  const loggedUser = useSelector((state) => state.login)

  const navigate = useNavigate()

  const handleEventCreation = (event) => {
    event.preventDefault()

    if (loggedUser) {

      const newEvent = {
        title: event.target.title.value,
        description: event.target.description.value,
        latitude: event.target.latitude.value,
        longitude: event.target.longitude.value,
        category: event.target.category.value,
        spots: event.target.spots.value,
        startDate: selectedDate.startDate,
        endDate: selectedDate.endDate
      }
      dispatch(createEvent(newEvent))
      event.target.title.value = ''
      event.target.description.value = ''
      event.target.latitude.value = ''
      event.target.longitude.value = ''
      event.target.category.value = ''
      event.target.spots.value = ''
      dispatch(resetDates())

    }

    else{
      dispatch(setOpen(true))
    }

  }

  const handleBackButton = () => {
    navigate('/')
  }

  return (
    <>
      <Button variant="text" startIcon={<ArrowBackIcon />} size="large" onClick={handleBackButton}>
        Back
      </Button>
      <Container>
        <Typography variant="h4" component="h4" color="primary">
          <b>Create a Volunteer Opportunity</b>
        </Typography>
        <Box component="form" onSubmit={handleEventCreation} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Title"
            type="text"
            id="title"
            name="title"
            autoComplete="title"
            autoFocus
          />
          <TextField
            margin="normal"
            fullWidth
            label="Description"
            type="text"
            id="description"
            name="description"
            autoComplete="description"
            autoFocus
            multiline
            minRows={10}
          />
          <Typography gutterBottom noWrap variant="body1" paragraph color="text.secondary" sx={{ mt: '16px' }}>
            Upload an image
          </Typography>
          <ImageList sx={{ height: 450 }} cols={1}>
            <ImageListItem >
              <img
                src={'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg'}
                srcSet={''}
                alt={'uploaded image'}
                loading="lazy"
              />
            </ImageListItem>
          </ImageList>
          <Button variant="outlined" component="label" endIcon={<AddAPhotoIcon />} sx={{ borderRadius: 4, border: 2, mb: '8px' }}>
                  Upload
            <input hidden accept="image/*" multiple type="file" />
          </Button>
          <Typography gutterBottom noWrap variant="body1" paragraph color="text.secondary" sx={{ mt: '16px' }}>
            Date and time
          </Typography>
          <Box>
            <Calendar label='Start Date' value={selectedDate.startDate} setValue={setStartDate} />
            <Calendar label='End Date' value={selectedDate.endDate} setValue={setEndDate} />
          </Box>
          <TextField
            required
            label="Spots"
            type="number"
            id="spots"
            name="spots"
            autoComplete="spots"
            autoFocus
            sx = {{ mt: '16px' }}
          />
          <Autocomplete
            disablePortal
            id="category"
            options={['option1', 'option2']}
            sx={{ width: 300, mt: '16px', mb: '16px' }}
            renderInput={(params) => <TextField {...params} label="Category" />}
          />
          <MyMap />
        </Box>
        <Button variant="outlined" sx={{ flexGrow: 1, marginBottom: '1%', borderRadius: 4,  border: 2, width: 289, my:2 }} type="submit">
          Submit
        </Button>
      </Container>
    </>
  )
}

export default EventForm