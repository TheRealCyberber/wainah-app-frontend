import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CreateItem } from '../services/item'
import ItemLocationPicker from '../components/ItemLocationPicker' 

const NewItem = ({ user }) => {
  const navigate = useNavigate()

  const categories = [
    'Electronics',
    'Clothing',
    'Bags',
    'Keys',
    'Documents',
    'Jewelry',
    'Pets',
    'Other'
  ]

const initialState = {
    name: '',
    description: '',
    category: '',
    date: '',
    status: 'lost', // default
    picture: ''
  }

  const [formValues, setFormValues] = useState(initialState)
  const [location, setLocation] = useState(null) 
  const [error, setError] = useState('')

     const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

        if (!location) {
      setError('Please select a location on the map')
      return
    }

    const payload = {
      ...formValues,
      userId: user?._id,
      location: {
             type: 'Point',
        coordinates: location
      }
    }

        console.log('Creating item with payload:', payload)

    try {
      await CreateItem(payload) 
      setFormValues(initialState)
      setLocation(null)
      navigate('/dashboard')
    } catch (err) {
        console.error('Item Creation Error:', err.response?.data?.msg || err.message)
      setError(err.response?.data?.msg || 'Failed to create item.')
    }
  }

  return (
    <div className="lf-form">
      <h1>Report an Item</h1>
      <form onSubmit={handleSubmit} className="col">
        <div className="input-wrapper">
          <label htmlFor="name">Item Name</label>
          <input
            id="name"
            type="text"
            value={formValues.name}
            onChange={handleChange}
            required
         />
        </div>

        <div className="input-wrapper">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={formValues.description}
            onChange={handleChange}
            required
            />
        </div>

        <div className="input-wrapper">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={formValues.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="input-wrapper">
          <label>Pick Location Lost/Found</label>
            <ItemLocationPicker onLocationChange={setLocation} />
          {error && <p className="error">{error}</p>}
        </div>

        <div className="input-wrapper">
          <label htmlFor="date">Date (Lost/Found)</label>
          <input
            id="date"
            type="date"
            value={formValues.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-wrapper">
          <label htmlFor="status">Lost or Found</label>
          <select id="status" value={formValues.status} onChange={handleChange}>
            <option value="lost">Lost</option>
            <option value="found">Found</option>
          </select>
        </div>

        <div className="input-wrapper">
          <label htmlFor="picture">Image</label>
          <input
            id="picture"
            type="url"
            value={formValues.picture}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default NewItem
