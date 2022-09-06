import { MapContainer, TileLayer } from 'react-leaflet'
import MapControl from './MapControl'
import '../../node_modules/leaflet-geosearch/dist/geosearch.css'

import { useSelector } from 'react-redux'

const MyMap = () => {

  const mapState = useSelector( (state) => state.eventForm)
  const coordinates = [mapState.latitude, mapState.longitude]

  return (
    <MapContainer center={coordinates} zoom={5} scrollWheelZoom={false} style={{ width:'100%', height:'500px' }} >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapControl/>
    </MapContainer>
  )
}

export default MyMap