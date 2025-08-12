import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GetUserById } from '../services/auth'

const UserProfile = () => {
  const { userId } = useParams()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await GetUserById(userId)
        setUser(data)
      } catch (err) {
        console.error('Error fetching user profile:', err)
      } finally {
        setLoading(false)
      }
    };
    fetchUser()
  }, [userId])

  if (loading) return <p>Loading user profile...</p>
  if (!user) return <p>User not found.</p>

  return (
    <div className="lf-form">
      <p><strong>Username: {user.name}</strong></p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
    </div>
  )
}

export default UserProfile
