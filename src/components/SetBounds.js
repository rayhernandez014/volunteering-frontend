import { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setEventsBounds } from '../reducers/eventReducer'
import { initializeEvents } from '../reducers/eventReducer'

import Fab from '@mui/material/Fab'
import MyLocationIcon from '@mui/icons-material/MyLocation'

const DisplayPosition = ({ map }) => {

  const dispatch = useDispatch()
  const { currentLocation, zoom } = useSelector((state) => state.event)

  const handleFabClick = useCallback(() => {
    navigator.geolocation.getCurrentPosition(
      (location) => {
        map.setView([location.coords.latitude, location.coords.longitude], map.getZoom())
      },)
  }, [map])

  const onMove = useCallback(() => {
    const rawBounds = map.getBounds()
    const bounds = transformObject(rawBounds)
    dispatch(setEventsBounds(bounds))
    dispatch(initializeEvents())
  }, [map])

  useEffect(() => {
    map.on('moveend', onMove)
    return () => {
      map.off('moveend', onMove)
    }
  }, [map, onMove])

  useEffect(() => {
    map.setView([currentLocation.latitude, currentLocation.longitude], zoom)
  }, [currentLocation, zoom])

  const fabStyleData = {
    color: 'primary',
    sx: {
      position: 'absolute',
      top: 80,
      right: 16,
      zIndex: 1201
    },
    icon: <MyLocationIcon />,
    label: 'Locate',
  }

  const transformObject = (rawBounds) => {
    return {
      nelat: rawBounds._northEast.lat,
      nelng: rawBounds._northEast.lng,
      swlat: rawBounds._southWest.lat,
      swlng: rawBounds._southWest.lng
    }
  }

  return (
    <>
      <Fab color="primary" aria-label="add" sx={fabStyleData.sx} onClick={handleFabClick}>
        {fabStyleData.icon}
      </Fab>
    </>
  )
}

export default DisplayPosition