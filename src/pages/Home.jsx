import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { GetItems } from '../services/item'
import ItemCard from '../components/ItemCard'

const Home = ({ user }) => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await GetItems()
        setItems(data)
      } catch (err) {
        console.error('Error fetching items', err)
      } finally {
        setLoading(false)
      }
    }
    fetchItems()
  }, [])

  const lostItems = items.filter(item => item.status === 'lost')
  const foundItems = items.filter(item => item.status === 'found')

  return (
    <div className="home">
      <div className="welcome-box">
        <h1>Home</h1>
        <p>Here you can see all lost & found items posted by everyone.</p>
        {!user ? (
          <p>
            <Link to="/signin" className="link">Sign in</Link> or{' '}
            <Link to="/register" className="link">Register</Link> to get started
          </p>
        ) : (
          <h2>Hey {user.name}, nice to see you again.</h2>
        )}
      </div>

      {loading ? (
        <p>Loading items...</p>
      ) : items.length ? (
        <div className="item-list-container">
          <section className="lost-items">
            <h2>Lost Items</h2>
            {lostItems.length ? (
              lostItems.map(item => (
                <div key={item._id} className="item-wrapper">
                  <ItemCard item={item} />
                  
                  <p className="item-meta">
                    Submitted on {new Date(item.createdAt).toLocaleDateString()} by{' '}
                    {item.userId ? (
                      <Link to={`/users/${item.userId._id}`} className="link">{item.userId.name}</Link>
                    ) : 'Unknown'}
                  </p>
                </div>
              ))
            ) : (
              <p>No lost items posted yet</p>
            )}
          </section>

          <section className="found-items">
            <h2>Found Items</h2>
            {foundItems.length ? (
              foundItems.map(item => (
                <div key={item._id} className="item-wrapper">
                  <ItemCard item={item} />
                 
                  <p className="item-meta">
                    Submitted on {new Date(item.createdAt).toLocaleDateString()} by{' '}
                    {item.userId ? (
                      <Link to={`/users/${item.userId._id}`} className="link">{item.userId.name}</Link>
                    ) : 'Unknown'}
                  </p>
                </div>
              ))
            ) : (
              <p>No found items posted yet</p>
            )}
          </section>
        </div>
      ) : (
        <p>No items posted yet</p>
      )}
    </div>
  )
}

export default Home
