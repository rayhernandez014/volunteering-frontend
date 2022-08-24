import { useDispatch, useSelector } from 'react-redux'
import { switchRSVP } from '../reducers/eventReducer'
import { useParams } from 'react-router-dom'

const Event = () => {

  const loggedUser = useSelector ((state) => state.login)
  const events = useSelector((state) => state.event)

  const dispatch = useDispatch()

  const id = useParams().id

  const event = events.find((e) => e.id === id)

  const rsvp = () => {
    dispatch(switchRSVP(event.id))
  }

  const isGoing = event.volunteers.find((v) => v.email === loggedUser.email)

  return (
    <>
      <p>{event.title}</p>
      <p>{event.description}</p>
      <p>{event.author.name}</p>
      <button onClick={rsvp}> {isGoing ? 'Going' : 'RSVP'} </button>
    </>
  )
}

export default Event