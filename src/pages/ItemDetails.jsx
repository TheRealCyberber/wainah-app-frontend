import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { GetItemById } from '../services/item'
import ItemCard from '../components/ItemCard' 

const ItemDetails = ({ user }) => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const data = await GetItemById(id)
        setItem(data)
      } catch (err) {
        console.error('Error fetching item:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchItem()
  }, [id])

  if (loading) return <p>Loading item...</p>
  if (!item) return <p>Item not found.</p>

  const itemOwnerId = typeof item.userId === 'string' ? item.userId : item.userId?._id
  const isOwner = user && itemOwnerId === user._id
  const canClaim = user && !item.isClaimed && !isOwner

  return (
    <div className="lf-form">
      <ItemCard item={item} />

      {user ? (
        isOwner ? (
          <button onClick={() => navigate(`/items/${item._id}/claims`)}>
            Manage Claims
          </button>
        ) : (
          canClaim && (
            <>
              {item.status === 'lost' && (
                <button onClick={() => navigate(`/items/${item._id}/claim`)}>
                  I found this item
         </button>
              )}
              {item.status === 'found' && (
                <button onClick={() => navigate(`/items/${item._id}/claim`)}>
                  This is mine
                </button>
              )}
            </>
          )
        )
      ) : (
        <p>
          Please <a href="/signin">sign in</a> to claim this item.
        </p>
      )}
    </div>
  )
}

export default ItemDetails
