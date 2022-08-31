import { useMap } from 'react-leaflet'

const ChangeView = ({ coordinates }) => {
  const map = useMap()
  const currentZoom = map.getZoom()
  map.setView(coordinates, currentZoom)
  return null
}

export default ChangeView