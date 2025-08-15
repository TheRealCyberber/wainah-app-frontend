import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const NavBar = ({ user, setUser }) => {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleSignOut = () => {
    localStorage.removeItem('token')
    setUser(null)
    navigate('/')
  }

  return (
    <>
      <nav className="navbar">
        <div className="nav-left">
          <Link to="/home" className="nav-logo">
            <img
              className="logo"
              src="https://i.imgur.com/2Z9ismj.png"
              alt="logo"
            />
          </Link>
        </div>

        {/* Nav links */}
        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <Link to="/home">Home</Link>
          <Link to="/aboutus">About us</Link>
          <Link to="/contactus">Contact us</Link>

          {user && (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/new-item">Add Item</Link>
            </>
          )}

          {!user && (
            <>
              <Link to="/register">Register</Link>
              <Link to="/signin">Sign In</Link>
            </>
          )}

          {user && (
            <>
              <span className="greeting">Hi, {user.name}</span>
              <button onClick={handleSignOut} className="signout-btn">
                Sign Out
              </button>
            </>
          )}
        </div>

        {/* Mobile toggle button */}
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </nav>
    </>
  )
}

export default NavBar
