import { useDispatch, useSelector } from 'react-redux'
import { createEvent } from '../reducers/eventReducer'

import { useNavigate } from 'react-router-dom'

import { setOpen } from '../reducers/confirmationReducer'

import { resetEventForm, setEvent } from '../reducers/eventFormReducer'

import Calendar from './Calendar'
import CreationMap from './CreationMap'

import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Skeleton from '@mui/material/Skeleton'

const EventForm = () => {

  const dispatch = useDispatch()
  const loggedUser = useSelector((state) => state.login)
  const eventFormState = useSelector ( (state) => state.eventForm)

  const navigate = useNavigate()

  const handleInputChange = (event) => {
    const target = event.target
    const name = target.name
    const value = target.value

    dispatch(setEvent({
      [name]: value
    }))
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      dispatch(setEvent({
        image: reader.result
      }))
    }
  }

  const handleEventCreation = (event) => {
    event.preventDefault()

    if (loggedUser) {

      dispatch(createEvent(eventFormState))
      dispatch(resetEventForm())
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
            value={eventFormState.title}
            onChange={handleInputChange}
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
            value={eventFormState.description}
            onChange={handleInputChange}
          />
          <Typography gutterBottom noWrap variant="body1" paragraph color="text.secondary" sx={{ mt: '16px' }}>
            Upload an image
          </Typography>
          <ImageList sx={{ height: 450 }} cols={1}>
            <ImageListItem >
              {
                eventFormState.image ? (
                  <img
                    alt={'uploaded image'}
                    src={eventFormState.image}
                  />
                ) : (
                  <Skeleton variant="rectangular" height={450} />
                )
              }
            </ImageListItem>
          </ImageList>
          <Button variant="outlined" component="label" endIcon={<AddAPhotoIcon />} sx={{ borderRadius: 4, border: 2, mb: '8px' }}>
                  Upload
            <input hidden accept="image/*" type="file" onChange={handleImageChange} name="image"/>
          </Button>
          <Typography gutterBottom noWrap variant="body1" paragraph color="text.secondary" sx={{ mt: '16px' }}>
            Date and time
          </Typography>
          <Box>
            <Calendar label='Start Date' name="startDate" value={eventFormState.startDate}/>
            <Calendar label='End Date' name="endDate" value={eventFormState.endDate}/>
          </Box>
          <TextField
            required
            label="Spots"
            type="number"
            id="spots"
            name="spots"
            sx = {{ mt: '16px' }}
            value={eventFormState.spots}
            onChange={handleInputChange}
          />
          <br />
          <FormControl sx = {{ mt: '16px', minWidth: 120 }}>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              id="category"
              label="Category"
              value={eventFormState.category}
              onChange={handleInputChange}
              name="category"
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <CreationMap />
          <Button variant="outlined" sx={{ flexGrow: 1, marginBottom: '1%', borderRadius: 4,  border: 2, width: 289, my:2 }} type="submit">
            Submit
          </Button>
        </Box>
      </Container>
    </>
  )
}

export default EventForm