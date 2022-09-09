import { useDispatch, useSelector } from 'react-redux'
import { switchRSVP } from '../reducers/eventReducer'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

import { setOpen } from '../reducers/confirmationReducer'

import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const Event = () => {

  const loggedUser = useSelector ((state) => state.login)
  const { events } = useSelector((state) => state.event)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const id = useParams().id

  if (!events) {
    return null
  }

  const event = events.find((e) => e.id === id)

  const rsvp = (id) => {
    if (loggedUser){
      dispatch(switchRSVP(id))
    }
    else{
      dispatch(setOpen(true))
    }
  }

  const isGoing = (volunteers) => {
    return volunteers.find((v) => v.email === loggedUser?.email)
  }

  const getDate = (dateString) => {
    const dateObject = new Date(dateString)
    return dateObject.toDateString()
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
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography gutterBottom noWrap variant="h4" component="h4">
              <b>{event.title}</b>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ alignItems: 'center', display: 'flex', justifyContent: 'right' }}>
              <Avatar alt="Remy Sharp" src="https://mui.com/static/images/avatar/1.jpg" sx={{ marginRight: 1 }}/>
              <Typography variant="body1" color="text.secondary">
                {`Hosted by ${event.author.name}`}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Typography gutterBottom noWrap variant="body1" paragraph color="primary">
          {`${getDate(event.startDate)} to ${getDate(event.endDate)}`}
        </Typography>
        <Typography gutterBottom noWrap variant="body1" paragraph>
          {`${event.latitude} , ${event.longitude}`}
        </Typography>
        <Box sx={{ display: 'flex' }}>
          {event.volunteers.length ? (
            <AvatarGroup max={4}>
              <Avatar alt="Remy Sharp" src="https://mui.com/static/images/avatar/1.jpg" />
              <Avatar alt="Travis Howard" src="https://mui.com/static/images/avatar/2.jpg" />
              <Avatar alt="Cindy Baker" src="https://mui.com/static/images/avatar/3.jpg" />
              <Avatar alt="Agnes Walker" src="https://mui.com/static/images/avatar/4.jpg" />
              <Avatar alt="Trevor Henderson" src="https://mui.com/static/images/avatar/5.jpg" />
            </AvatarGroup>
          ) : (
            <Typography gutterBottom noWrap variant="body1" paragraph color="text.secondary">
            Be the first to attend!
            </Typography>
          )
          }
        </Box>
        <Box
          component="img"
          alt="landscape"
          src="https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg"
          sx={{
            height: 315,
            width: '100%',
            borderRadius: 3
          }}
        />
        <Typography gutterBottom noWrap variant="body1" paragraph color="text.secondary">
          {event.description}
        </Typography>
        <Button variant="outlined" sx={{ flexGrow: 1, marginBottom: '1%', borderRadius: 4,  border: 2, width: 289 }} onClick={() => {rsvp(event.id)}}> {isGoing(event.volunteers) ? 'Going' : 'RSVP'} </Button>

      </Container>
    </>
  )
}

export default Event