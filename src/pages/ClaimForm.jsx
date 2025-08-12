import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { CreateClaimRequest } from '../services/claimRequest'

const ClaimForm = ({ user }) => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [message, setMessage] = useState('')
  const [picture, setPicture] = useState('') 
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const payload = {
        itemId: id,
        message,
        picture 
        }

    await CreateClaimRequest(payload)

      setSuccess('Claim request submitted!')
      setMessage('')
      setPicture('')

      setTimeout(() => navigate('/dashboard'), 2000)
    } catch (err) {
      console.error(err)
      setError('Failed to send claim request.')
    }
  }

  return (
    <div className="lf-form">
    <h2>Claim This Item</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="message">Message</label>
     <textarea
          id="message"
          rows="4"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        ></textarea>

        <label htmlFor="picture">Supporing Document</label>
        <input
          id="picture"
          type="url"
          placeholder="https://example.com/image.jpg"
          value={picture}
          onChange={(e) => setPicture(e.target.value)}
          required
        />

        <button disabled={!message}>Submit</button>
            </form>

      {success && <p className="success">{success}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  )
}

export default ClaimForm
