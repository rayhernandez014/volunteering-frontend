import { useMap } from 'react-leaflet'

import { useDispatch } from 'react-redux'

import { useEffect } from 'react'

import IconButton from '@mui/material/IconButton'

import MyLocationIcon from '@mui/icons-material/MyLocation'

const LocationControl = () => {

  const dispatch = useDispatch()

  const map = useMap()

  return (<IconButton color="primary" aria-label="add to shopping cart">
    <MyLocationIcon />
  </IconButton>)

}

export default LocationControl