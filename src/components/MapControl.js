import { useEffect } from 'react'

import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch'

import { useMap } from 'react-leaflet'

import { useDispatch } from 'react-redux'

import { setLocationInfo } from '../reducers/eventFormReducer'

const provider = new OpenStreetMapProvider()

const MapControl = () => {

  const dispatch = useDispatch()

  const map = useMap()

  const handleOptionSelection = (result) => {
    const locationInfo = {
      latitude: result.location.y,
      longitude: result.location.x,
      address: result.location.label
    }

    dispatch(setLocationInfo(locationInfo))

  }

  const searchControl = new GeoSearchControl({
    provider: provider,
    keepResult: true
  })

  useEffect(() => {
    map.addControl(searchControl)
    map.on('geosearch/showlocation', handleOptionSelection)
    return () => map.removeControl(searchControl)
  }, [])

  return null

}

export default MapControl