import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { GetItemById, UpdateItem } from '../services/item'
import ItemLocationPicker from '../components/ItemLocationPicker'

const EditItem = () => {
  const { id } = useParams()
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

  const [formValues, setFormValues] = useState(null)

  const [location, setLocation] = useState(null)

  const [error, setError] = useState('')

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const item = await GetItemById(id)

        const coords = item.location?.coordinates || null

        setFormValues({
          name: item.name || '',
          description: item.description || '',
          category: item.category || '',
          date: item.date ? item.date.split('T')[0] : '', 
          status: item.status || 'lost',
          picture: item.picture || ''
        })

        setLocation(coords)
      } catch (err) {
     console.error('Failed to load item:', err)
            setError('Could not load item details.')
      }
    }
    fetchItem()
  }, [id])

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
      location: {
           type: 'Point',
        coordinates: location
      }
    }

    try {
      await UpdateItem(id, payload)
      navigate('/dashboard')
    } catch (err) {
      console.error('Update failed:', err)
      setError(err.response?.data?.msg || 'Failed to update item.')
    }
  }

  if (!formValues) return <p>Loading...</p>

  return (
    <div className="lf-form">
      <h1>Edit Item</h1>
      <form className="col" onSubmit={handleSubmit}>
 <div className="input-wrapper">
          <label htmlFor="name">Item Name</label>
          <input
            id="name"
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
          <ItemLocationPicker
            initialLocation={location}
            onLocationChange={setLocation}
          />
          {error && <p className="error">{error}</p>}
        </div>

        <div className="input-wrapper">
          <label htmlFor="date">Date</label>
          <input
            id="date"
            type="date"
            value={formValues.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-wrapper">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            value={formValues.status}
            onChange={handleChange}
          >
            <option value="lost">Lost</option>
            <option value="found">Found</option>
          </select>
        </div>

        <div className="input-wrapper">
          <label htmlFor="picture">Picture URL</label>
          <input
            type="url"
            id="picture"
            value={formValues.picture}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Update</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  )
}

export default EditItem
