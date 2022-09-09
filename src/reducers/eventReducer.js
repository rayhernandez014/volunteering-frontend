import { createSlice } from '@reduxjs/toolkit'
import eventService from '../services/events'
import { callNotification } from './notificationReducer'

const initialState = {
  events: null,
  bounds: null,
  currentLocation: [20,20],
  zoom: 8
}

const eventtSlice = createSlice({
  name: 'eventt',
  initialState,
  reducers: {
    replaceEvent(state, action) {
      const returnedEvent = action.payload.returnedEvent
      const id = action.payload.id
      const modifiedEventList = state.events.map((event) => (event.id !== id ? event : returnedEvent))
      return { ...state, events: modifiedEventList }
    },
    setEvents(state, action) {
      return { ...state, events: action.payload }
    },
    appendEvent(state, action) {
      return { ...state, events: [...state.events, action.payload] }
    },
    removeEvent(state, action) {
      const id = action.payload
      return state.events.filter((e) => e.id !== id)
    },
    setEventsBounds(state, action) {
      return { ...state, bounds: action.payload }
    },
    setCurrentLocation(state, action) {
      return { ...state, currentLocation: action.payload }
    },
    setZoom(state, action) {
      return { ...state, zoom: action.payload }
    }
  }
})

export const { appendEvent, replaceEvent, setEvents, removeEvent, setEventsBounds, setCurrentLocation, setZoom } =
  eventtSlice.actions

export const initializeEvents = () => {
  return async (dispatch, getState) => {
    const { event } = getState()
    const events = await eventService.getAll(event.bounds)
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
    const foundEvent = event.events.find((e) => {
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

export default eventtSlice.reducer