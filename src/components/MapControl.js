import { useEffect } from 'react'

import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch'

import { useMap } from 'react-leaflet'

import { useDispatch } from 'react-redux'

import { setCoordinates, setAddress } from '../reducers/mapReducer'

const provider = new OpenStreetMapProvider()

const MapControl = () => {

  const dispatch = useDispatch()

  const map = useMap()

  const handleOptionSelection = (result) => {
    const coordinates = [result.location.y, result.location.x]
    const address = result.location.label
    dispatch(setCoordinates(coordinates))
    dispatch(setAddress(address))
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