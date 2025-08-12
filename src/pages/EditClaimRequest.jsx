import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { GetClaimById, EditClaimRequest } from '../services/claimRequest'

const EditClaim = () => {
  const { claimId } = useParams()
  const navigate = useNavigate()

  const [message, setMessage] = useState('')
  const [picture, setPicture] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchClaim() {
      try {
        const claim = await GetClaimById(claimId)
        setMessage(claim.message || '')
        setPicture(claim.picture || '')
      } catch (err) {
        console.error('Error fetching claim:', err)
        setError('Failed to load claim data.')
      } finally {
        setLoading(false)
      }
    }
    fetchClaim()
  }, [claimId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const payload = { message, picture }
      await EditClaimRequest(claimId, payload)
      setSuccess('Claim updated successfully!')
      setTimeout(() => navigate('/dashboard'), 1500)
    } catch (err) {
      console.error('Update failed:', err)
      setError('Failed to update claim request.')
    }
  }

  if (loading) return <p>Loading claim data...</p>

  return (
    <div className="lf-form">
      <h2>Edit Claim Request</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="message">Message</label>
 <textarea
          id="message"
          rows="4"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        ></textarea>

        <label htmlFor="picture">Supporting Document</label>
        <input
          id="picture"
          type="url"
          placeholder="https://example.com/image.jpg"
     value={picture}
          onChange={(e) => setPicture(e.target.value)}
          required
             />

        <button disabled={!message}>Save Changes</button>
    </form>

      {success && <p className="success">{success}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  )
}

export default EditClaim
