import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { GetItemsByUserId, DeleteItem } from '../services/item.js'
import { GetClaimsByUserId, DeleteClaimRequest } from '../services/claimRequest.js'
import ItemCard from '../components/ItemCard.jsx'

const Dashboard = ({ user }) => {
  const navigate = useNavigate()
  const [myItems, setMyItems] = useState([])
  const [myClaims, setMyClaims] = useState([])
  const [loadingItems, setLoadingItems] = useState(true)
  const [loadingClaims, setLoadingClaims] = useState(true)

  useEffect(() => {
    if (!user) return

    const fetchItems = async () => {
      try {
        const items = await GetItemsByUserId(user._id)
        setMyItems(items || [])
      } catch (err) {
        console.error('Error fetching items', err)
        setMyItems([])
      } finally {
        setLoadingItems(false)
      }
    }

    const fetchClaims = async () => {
      try {
        const claims = await GetClaimsByUserId(user._id)
        setMyClaims(claims || [])
      } catch (err) {
        console.error('Error fetching claims', err)
        setMyClaims([])
      } finally {
        setLoadingClaims(false)
      }
    }

    fetchItems()
    fetchClaims()
  }, [user])

  const handleNewItem = () => navigate('/new-item')

  const handleDeleteItem = async (itemId) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return
    try {
      await DeleteItem(itemId)
      setMyItems(prev => prev.filter(item => item._id !== itemId))
    } catch (err) {
      console.error('Delete failed', err)
      alert('Something went wrong while deleting')
    }
  }

  const handleDeleteClaim = async (claimId) => {
    if (!window.confirm('Are you sure you want to delete this claim request?')) return
    try {
      await DeleteClaimRequest(claimId)
      setMyClaims(prev => prev.filter(claim => claim._id !== claimId))
    } catch (err) {
      console.error('Delete claim failed', err)
      alert('Failed to delete claim request')
    }
  }

  const handleEditClaim = (claimId) => {
    navigate(`/claims/${claimId}/edit`)
  }

  if (!user) return <p>Please log in to view your dashboard.</p>

  return (
    <div className="dashboard">
      <div className="welcome-container">
        <h1>Dashboard</h1>
    <p>Welcome back, {user.name}.</p>
        <button className="btn primary" onClick={handleNewItem}>
          Report Lost/Found Item
        </button>
      </div>

      <div
        className="dashboard-sections"
        style={{
          display: 'flex',
          gap: '2rem',
          marginTop: '1rem',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
        }}
      >
        <section className="items-section">
          <h2>My Items</h2>
          {loadingItems ? (
            <p>Loading your items...</p>
          ) : myItems.length ? (
            myItems.map(item => (
              <div key={item._id} className="item-wrapper">
                <ItemCard item={item} />
            <p>
                  <strong>Submitted on</strong> {new Date(item.createdAt).toLocaleDateString()}
                </p>
                <div className="item-controls">
                  <Link to={`/items/${item._id}/edit`} className="btn edit-btn">
                    Edit
                  </Link>
                  <button onClick={() => handleDeleteItem(item._id)} className="btn delete-btn">
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>You haven’t posted any items yet.</p>
          )}
        </section>

        <section className="claims-section">
          <h2>My Claim Requests</h2>
          {loadingClaims ? (
            <p>Loading your claim requests...</p>
          ) : myClaims.length ? (
            myClaims.map(claim => (
              <div key={claim._id} className="claim-request-card">
                <div className="claim-text-container">
                  <p>
                    <strong>Item Name: </strong>{' '}
                    {claim.item ? (
                      <Link to={`/items/${claim.item._id}`} className="claim-item-link">
                        {claim.item.name}
                      </Link>
                    ) : (
                      'N/A'
                    )}
                  </p>
                 <p>
                <strong>Message: </strong> {claim.message}
                  </p>
                  <p>
                    <strong>Status: </strong> {claim.status}
                  </p>
                  {claim.item?.picture && (
                    <a
                      href={claim.item.picture}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="support-doc-link"
                    >
                      Supporting Document
                    </a>
                  )}
                </div>
                <p className="submitted-on">
                  <strong>Submitted On: </strong> {new Date(claim.createdAt).toLocaleDateString()}
                </p>
                <div className="claim-controls">
                  <button onClick={() => handleEditClaim(claim._id)} className="btn edit-btn">
                    Edit
                  </button>
                  <button onClick={() => handleDeleteClaim(claim._id)} className="btn delete-btn">
                    Delete
             </button>
                </div>
              </div>
            ))
          ) : (
            <p>No claim requests submitted yet.</p>
          )}
        </section>
      </div>
    </div>
  )
}

export default Dashboard
