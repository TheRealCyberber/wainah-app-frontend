import ItemCard from './ItemCard'

const ItemList = ({ items }) => {
  const lostItems = items.filter(item => item.status === 'lost')
  const foundItems = items.filter(item => item.status === 'found')

  const renderItem = (item) => (
    <div key={item._id} className="item-wrapper">
      <ItemCard item={item} />
      <p className="item-meta">
        Submitted on {new Date(item.createdAt).toLocaleDateString()} by{' '}
        {item.userId ? (
          <Link to={`/users/${item.userId._id}`} className="link">{item.userId.name}</Link>
        ) : 'Unknown'}
      </p>
    </div>
  )

  return (
    <div className="item-list-container">
      <section className="lost-items">
        <h2>Lost Items</h2>
        {lostItems.length ? lostItems.map(renderItem) : <p>No lost items posted yet</p>}
      </section>

      <section className="found-items">
        <h2>Found Items</h2>
        {foundItems.length ? foundItems.map(renderItem) : <p>No found items posted yet</p>}
      </section>
    </div>
  )
}

export default ItemList
