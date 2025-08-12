import { Link } from 'react-router-dom'

const ItemCard = ({ item }) => {
  const hasCoordinates =
    item.location &&
    item.location.coordinates &&
    Array.isArray(item.location.coordinates) &&
    item.location.coordinates.length === 2

  const [lng, lat] = hasCoordinates ? item.location.coordinates : [null, null]

  const googleMapsUrl = hasCoordinates
    ? `https://www.google.com/maps?q=${lat},${lng}`
    : null

  return (
    <div className="item-card">
      <div className="item-card-text">
    <Link to={`/items/${item._id}`} className="item-name-link">
          <h3>Item name: {item.name}</h3>
        </Link>
        <p>Description: {item.description}</p>
        <p>Category: {item.category}</p>
        <p>Lost/Found: {item.status}</p>

        <p>
          Location:{' '}
          {googleMapsUrl ? (
            <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
              View Location on Google Maps
            </a>
          ) : (
            'Location not available'
          )}
        </p>

        <p>Date Lost/Found: {new Date(item.date).toLocaleDateString()}</p>

        {item.isClaimed ? (
          <p className="status-claimed">Status: Claimed ✅</p>
        ) : (
          <p className="status-not-claimed">Status: Not Claimed ❌</p>
        )}
      </div>

      {item.picture && (
        <div className="item-card-image">
          <img src={item.picture} alt={item.name} />
        </div>
      )}
    </div>
  )
}

export default ItemCard