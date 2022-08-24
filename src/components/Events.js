import { useSelector, useDispatch } from 'react-redux'
import { switchRSVP } from '../reducers/eventReducer'
import { Link as RouterLink } from 'react-router-dom'

import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import CardHeader from '@mui/material/CardHeader'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Link from '@mui/material/Link'

const Events = () => {

  const dispatch = useDispatch()

  const events = useSelector((state) => state.event)
  const loggedUser = useSelector((state) => state.login)

  const rsvp = (id) => {
    dispatch(switchRSVP(id))
  }

  const isGoing = (volunteers) => {
    return volunteers.find((v) => v.email === loggedUser?.email)
  }

  if (!events) {
    return null
  }

  return (
    <Box sx={{ flexGrow: 1, margin: 10 }}>
      <Grid container spacing={2}>
        {events.map((event) => (
          <Grid item xs={4} key={event.id}>
            <Card sx={{
              bgcolor: isGoing(event.volunteers) ? 'primary.light' : 'background.paper'
            }}>
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
              <CardMedia
                component="img"
                alt="green iguana"
                image="https://mui.com/static/images/cards/contemplative-reptile.jpg"

                sx={{
                  height: 140,
                  mx: '3%',
                  width: '94%',
                  borderRadius: 3
                }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h5">
                  <b>{event.title}</b>
                </Typography>
                <Typography gutterBottom variant="body1" paragraph color="primary">
                  {`${event.startDate} to ${event.endDate}`}
                </Typography>
                <Typography gutterBottom variant="body1" paragraph>
                  {`${event.latitude} , ${event.longitude}`}
                </Typography>
                <Typography gutterBottom variant="body1" paragraph color="text.secondary">
                  {event.description}
                </Typography>
                <Link component={ RouterLink } to={`/events/${event.id}`} underline="hover">Read More...</Link>
              </CardContent>
              <CardActions>
                <Button variant="outlined" sx={{ flexGrow: 1, mx: '1%', marginBottom: '1%', borderRadius: 4,  border: 2 }} onClick={() => {rsvp(event.id)}}> {isGoing(event.volunteers) ? 'Going' : 'RSVP'} </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default Events