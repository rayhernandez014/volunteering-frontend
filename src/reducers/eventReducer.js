import { createSlice } from '@reduxjs/toolkit'
import eventService from '../services/events'
import { callNotification } from './notificationReducer'

const eventSlice = createSlice({
  name: 'event',
  initialState: null,
  reducers: {
    replaceEvent(state, action) {
      const returnedEvent = action.payload.returnedEvent
      const id = action.payload.id
      return state.map((event) => (event.id !== id ? event : returnedEvent))
    },
    setEvents(state, action) {
      return action.payload
    },
    appendEvent(state, action) {
      return [...state, action.payload]
    },
    removeEvent(state, action) {
      const id = action.payload
      return state.filter((e) => e.id !== id)
    }
  }
})

export const { appendEvent, replaceEvent, setEvents, removeEvent } =
  eventSlice.actions

export const initializeEvents = () => {
  return async (dispatch) => {
    const events = await eventService.getAll()
    dispatch(setEvents(events))
  }
}

export const createEvent = (newEvent) => {
  return async (dispatch) => {
    try {
      const returnedEvent = await eventService.create(newEvent)
      dispatch(appendEvent(returnedEvent))
      dispatch(
        callNotification(
          `a new event ${returnedEvent.title} by ${returnedEvent.author.name} has been added`,
          'success',
          5
        )
      )
    } catch (exception) {
      dispatch(callNotification(exception.response.data.error, 'error', 5))
    }
  }
}

export const editEvent = (id, modifiedEvent) => {
  return async (dispatch) => {
    try {
      const returnedEvent = await eventService.update(id, modifiedEvent)
      dispatch(replaceEvent({ returnedEvent, id }))
    } catch (exception) {
      dispatch(callNotification(exception.response.data.error, 'error', 5))
    }
  }
}

export const switchRSVP = (id) => {
  return async (dispatch) => {
    try {
      const returnedEvent = await eventService.updateRSVP(id)
      dispatch(replaceEvent({ returnedEvent, id }))
    } catch (exception) {
      dispatch(callNotification(exception.response.data.error, 'error', 5))
    }
  }
}

export const deleteBlog = (id) => {
  return async (dispatch, getState) => {
    const { event } = getState()
    const foundEvent = event.find((e) => {
      return e.id === id
    })
    if (
      window.confirm(
        `are you sure you want to remove ${foundEvent.title} by ${foundEvent.author}?`
      )
    ) {
      try {
        await eventService.remove(id)
        dispatch(removeEvent(id))
        dispatch(
          callNotification(`blog ${foundEvent.title} deleted`, 'success', 5)
        )
      } catch (exception) {
        dispatch(callNotification(exception.response.data.error, 'error', 5))
      }
    }
  }
}

export default eventSlice.reducer