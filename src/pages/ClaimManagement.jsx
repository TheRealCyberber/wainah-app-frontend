import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GetClaimsForItem, UpdateClaimStatus } from '../services/claimRequest'

const ClaimManagement = ({ user }) => {
  const { id } = useParams()
  const [claims, setClaims] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const data = await GetClaimsForItem(id)
        setClaims(data)
      } catch (err) {
        setError('Failed to load claims or not authorized')
      } finally {
        setLoading(false)
      }
    }
    fetchClaims()
  }, [id])

  const handleStatusChange = async (claimId, status) => {
    try {
      await UpdateClaimStatus(claimId, status)
      setClaims((prevClaims) =>
    prevClaims.map((claim) =>
          claim._id === claimId ? { ...claim, status } : claim
        )
      )
    } catch (err) {
      setError('Failed to update claim status')
    }
  }

  if (loading) return <p>Loading claims...</p>
  if (error) return <p className="error">{error}</p>
  if (!claims.length) return <p>No claims for this item yet.</p>

  return (
    <div className='lf-form'>
      <h2>Claims for Item</h2>
      <ul>
      {claims.map((claim) => {
  const pic = claim.picture || claim.item?.picture || null

  return (
    <li key={claim._id} className={`claim ${claim.status}`}>
      <p>
        <strong>Username: {claim.requester?.name}</strong> ({claim.requester?.email})
      </p>
      <p>Message: {claim.message || 'No message provided.'}</p>
      <p>Status: {claim.status}</p>

      {pic && (
        <p>
          📎{' '}
          <a
            href={pic}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'blue', textDecoration: 'underline' }}
          >
            View Supporting Document
          </a>
        </p>
    )}

      {claim.status === 'pending' && (
        <>
          <button onClick={() => handleStatusChange(claim._id, 'approved')}>
            Approve
          </button>
          <button onClick={() => handleStatusChange(claim._id, 'rejected')}>
            Reject
          </button>
        </>
      )}
    </li>
  )
})}

      </ul>
    </div>
  )
}

export default ClaimManagement
