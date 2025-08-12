import { useEffect, useState } from 'react'
import { GetAllItems } from '../services/item'
import ItemCard from '../components/ItemCard'

const Items = () => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await GetAllItems()
        setItems(data)
      } catch (err) {
        console.error('Failed to fetch items:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchItems()
  }, [])

  return (
    <div className="lf-form">
      <h1>All Lost & Found Items</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {items.length ? (
            <div className="item-list">
        {items.map((item) => (
                <ItemCard key={item._id} item={item} />
              ))}
            </div>
          ) : (
            <p>No items yet. Be the first to report!</p>
          )}
        </>
      )}
    </div>
  )
}

export default Items
