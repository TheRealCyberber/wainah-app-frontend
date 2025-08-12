const ItemLocationLink = ({ coordinates }) => {
    if (!coordinates || coordinates.length !== 2) return null
  
    const [lng, lat] = coordinates
    const googleMapsUrl = `https://www.google.com/maps?q=${lat},${lng}`
  
    return (
      <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
        View Location on Google Maps
      </a>
    )
  }
  
  export default ItemLocationLink
  