import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet'

import { useSelector, useDispatch } from 'react-redux'

import { useMemo, useState } from 'react'

import { setCurrentLocation, setZoom } from '../reducers/eventReducer'

import SetBounds from './SetBounds'

import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'

const HomeMap = () => {

  const [theMap, setTheMap] = useState(null)
  const { currentLocation, events, zoom } = useSelector( (state) => state.event)

  const dispatch = useDispatch()

  const handleMarkerClick = (e) => {
    const { _latlng } = e.target
    dispatch(setCurrentLocation([_latlng.lat, _latlng.lng]))
    dispatch(setZoom(15))
  }

  const displayMap = useMemo(
    () => (
      <MapContainer
        center={currentLocation}
        zoom={zoom}
        scrollWheelZoom={false}
        style={{ width:'100%', height: 'calc(100vh - 64px)' }}
        ref={setTheMap}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {events && events.map( (event) => {
          return (
            <Marker position={[event.latitude, event.longitude]} key={event.id} eventHandlers={{ click: handleMarkerClick }}>
              <Tooltip sticky direction='top'>{event.title}</Tooltip>
            </Marker>
          )
        })}
      </MapContainer>
    ),
    [events],
  )

  return (
    <Box>
      <Toolbar />
      {theMap ? <SetBounds map={theMap} /> : null}
      {displayMap}
    </Box>
  )
}

export default HomeMap