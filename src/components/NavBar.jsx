import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const NavBar = ({ user, setUser }) => {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleSignOut = () => {
    localStorage.removeItem('token')
    setUser(null)
    navigate('/')
    setMenuOpen(false)
  }

  const closeMenu = () => {
    setMenuOpen(false)
  }

  return (
    <>
      <nav className="navbar">
        <div className="nav-left">
          <Link to="/home" className="nav-logo" onClick={closeMenu}>
            <img
              className="logo"
              src="https://i.imgur.com/2Z9ismj.png"
              alt="logo"
            />
          </Link>
        </div>

        {/* Nav links */}
        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <Link to="/home" onClick={closeMenu}>Home</Link>
          <Link to="/aboutus" onClick={closeMenu}>About us</Link>
          <Link to="/contactus" onClick={closeMenu}>Contact us</Link>

          {user && (
            <>
              <Link to="/dashboard" onClick={closeMenu}>Dashboard</Link>
              <Link to="/new-item" onClick={closeMenu}>Add Item</Link>
            </>
          )}

          {!user && (
            <>
              <Link to="/register" onClick={closeMenu}>Register</Link>
              <Link to="/signin" onClick={closeMenu}>Sign In</Link>
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