import { useState } from 'react'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})


function LocationSelector({ onLocationChange }) {
  const [markerPosition, setMarkerPosition] = useState(null)

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng
      setMarkerPosition([lat, lng])
      onLocationChange([lng, lat]) 
    },
  })

  return markerPosition ? <Marker position={markerPosition} /> : null
}

export default function ItemLocationPicker({ onLocationChange }) {
  return (
    <MapContainer
      center={[26.0667, 50.5577]} 
      zoom={9}
      style={{ height: '250px', width: '350px', margin: 'auto' }} 
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <LocationSelector onLocationChange={onLocationChange} />
    </MapContainer>
  )
}
