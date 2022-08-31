import { useEffect } from 'react'

import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch'

import { useMap } from 'react-leaflet'

import { useDispatch } from 'react-redux'

import { setLocation } from '../reducers/mapReducer'

const provider = new OpenStreetMapProvider()

const MapControl = () => {

  const dispatch = useDispatch()

  const map = useMap()

  const handleOptionSelection = (result) => {
    const coordinates = [result.location.y, result.location.x]
    dispatch(setLocation(coordinates))
  }

  const handleDragMarker = (result) => {
    const coordinates = [result.location.lat, result.location.lng]
    dispatch(setLocation(coordinates))
  }

  const searchControl = new GeoSearchControl({
    provider: provider,
    keepResult: true,
    marker: {
      draggable: true
    }
  })

  useEffect(() => {
    map.addControl(searchControl)
    map.on('geosearch/showlocation', handleOptionSelection)
    map.on('geosearch/marker/dragend', handleDragMarker)

    return () => map.removeControl(searchControl)
  }, [])

  return null

}

export default MapControl