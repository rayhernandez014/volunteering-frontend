import { useDispatch } from 'react-redux'
import { createEvent } from '../reducers/eventReducer'

const EventForm = () => {

  const dispatch = useDispatch()

  const handleEventCreation = (event) => {
    event.preventDefault()
    const newEvent = {
      title: event.target.title.value,
      description: event.target.description.value,
      latitude: event.target.latitude.value,
      longitude: event.target.longitude.value,
      category: event.target.category.value,
      spots: event.target.spots.value,
      startDate: event.target.startDate.value,
      endDate: event.target.endDate.value
    }
    dispatch(createEvent(newEvent))
    event.target.title.value = ''
    event.target.description.value = ''
    event.target.latitude.value = ''
    event.target.longitude.value = ''
    event.target.category.value = ''
    event.target.spots.value = ''
    event.target.startDate.value = ''
    event.target.endDate.value = ''
  }

  return (
    <form onSubmit={handleEventCreation}>
      <div>
        title <input type="text" id="title" name="title" label="title" />
      </div>
      <div>
        description <input type="text" id="description" name="description" label="description" />
      </div>
      <div>
        locationlat <input type="text" id="latitude" name="latitude" label="latitude" />
      </div>
      <div>
        locationlon <input type="text" id="longitude" name="longitude" label="longitude" />
      </div>
      <div>
        category <input type="text" id="category" name="category" label="category" />
      </div>
      <div>
        spots <input type="text" id="spots" name="spots" label="spots" />
      </div>
      <div>
        dateS <input type="text" id="startDate" name="startDate" label="startDate" />
      </div>
      <div>
        dateE <input type="text" id="endDate" name="endDate" label="endDate" />
      </div>
      <button type="submit" id="create-button">
          create
      </button>
    </form>
  )
}

export default EventForm