import { useSelector, useDispatch } from 'react-redux'
import { setCurrentLocation, switchRSVP, setZoom } from '../reducers/eventReducer'
import { Link as RouterLink } from 'react-router-dom'

import { setOpen } from '../reducers/confirmationReducer'

import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Box from '@mui/material/Box'
import CardHeader from '@mui/material/CardHeader'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Link from '@mui/material/Link'
import Toolbar from '@mui/material/Toolbar'

import { AdvancedImage } from '@cloudinary/react'
import { Cloudinary } from '@cloudinary/url-gen'
import { fill } from '@cloudinary/url-gen/actions/resize'
import Skeleton from '@mui/material/Skeleton'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import IconButton from '@mui/material/IconButton'

const Events = () => {

  const dispatch = useDispatch()

  const { events } = useSelector((state) => state.event)
  const loggedUser = useSelector((state) => state.login)

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

  const handleLocateButton = (event) => {
    dispatch(setCurrentLocation([event.latitude, event.longitude]))
    dispatch(setZoom(15))
  }

  const cld = new Cloudinary({
    cloud: {
      cloudName: 'dhfcmzg6o'
    }
  })

  const getImgObj = (public_id) => {
    const imgObj = cld.image(public_id)
    imgObj.resize(fill().height(140))
    return imgObj
  }

  if (!events) {
    return null
  }

  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, width: '100%' }}
    >
      <Toolbar />
      <List sx={{ overflow: 'auto', width: '100%', height: '93vh' }}>
        {events.map((event) => (
          <ListItem key={event.id} sx={{ paddingRight:'2px' }}>
            <Card sx={{
              bgcolor: isGoing(event.volunteers) ? 'primary.light' : 'background.paper',
              width: '100%',
            }} elevation={3}>
              <CardHeader
                avatar={ event.volunteers.length ?
                  <AvatarGroup max={4}>
                    <Avatar alt="Remy Sharp" src="https://mui.com/static/images/avatar/1.jpg" />
                    <Avatar alt="Travis Howard" src="https://mui.com/static/images/avatar/2.jpg" />
                    <Avatar alt="Cindy Baker" src="https://mui.com/static/images/avatar/3.jpg" />
                    <Avatar alt="Agnes Walker" src="https://mui.com/static/images/avatar/4.jpg" />
                    <Avatar alt="Trevor Henderson" src="https://mui.com/static/images/avatar/5.jpg" />
                  </AvatarGroup>
                  : null
                }
                subheader={event.volunteers.length ? null : 'Be the first to attend!'}
                sx={{
                  minHeight: 76
                }}
              />
              {event.image ? (
                <CardMedia component={ AdvancedImage } cldImg={getImgObj(event.image)} sx={{
                  height: 140,
                  mx: '3%',
                  width: '94%',
                  borderRadius: 3
                }}
                />
              ) : (
                <CardMedia component={ Skeleton } sx={{
                  height: 140,
                  mx: '3%',
                  width: '94%',
                  borderRadius: 3
                }}
                />
              )}

              <CardContent>
                <Typography gutterBottom noWrap variant="h5" component="h5">
                  <b>{event.title}</b>
                </Typography>
                <Typography gutterBottom noWrap variant="body1" paragraph color="primary">
                  {`${getDate(event.startDate)} to ${getDate(event.endDate)}`}
                </Typography>
                <IconButton color="primary" aria-label="Locate" onClick={() => handleLocateButton(event)}>
                  <LocationOnIcon />
                </IconButton>
                <Typography gutterBottom noWrap variant="body1" paragraph color="text.secondary">
                  {event.description}
                </Typography>
                <Link component={ RouterLink } to={`/events/${event.id}`} underline="hover">Read More...</Link>
              </CardContent>
              <CardActions>
                <Button variant="outlined" sx={{ flexGrow: 1, mx: '1%', marginBottom: '1%', borderRadius: 4,  border: 2 }} onClick={() => {rsvp(event.id)}}> {isGoing(event.volunteers) ? 'Going' : 'RSVP'} </Button>
              </CardActions>
            </Card>
          </ListItem>
        ))}
      </List>
    </Box>
  )
}

export default Events