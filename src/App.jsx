import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import ClaimManagement from './pages/ClaimManagement'
import Home from './pages/Home'
import Register from './pages/Register'
import SignIn from './pages/SignIn'
import Dashboard from './pages/Dashboard'
import ItemDetails from './pages/ItemDetails'
import ClaimForm from './pages/ClaimForm'
import NewItem from './pages/NewItem'
import EditItem from './pages/EditItem'
import EditClaimRequest from './pages/EditClaimRequest'
import UserProfile from './pages/UserProfile'
import './App.css'
import { CheckSession } from './services/auth'
import NavBar from './components/NavBar' 
import LandingPage from './pages/LandingPage'
import AboutUs from './pages/AboutUs'
import ContactUs from './pages/ContactUs'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const verifySession = async () => {
      try {
        const currentUser = await CheckSession()
        setUser(currentUser)
      } catch {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    verifySession()
  }, [])

  if (loading) return <p>Loading...</p>

  return (
    <Router>
      <NavBar user={user} setUser={setUser} /> 
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home user={user} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/signin" element={<SignIn setUser={setUser} />} />
        <Route path="/dashboard" element={<Dashboard user={user} />} />
        <Route path="/items/:id" element={<ItemDetails user={user} />} />
        <Route path="/items/:id/claim" element={<ClaimForm user={user} />} />
        <Route path="/new-item" element={<NewItem user={user} />} />
        <Route path="/items/:id/edit" element={<EditItem user={user} />} />
        <Route path="/items/:id/claims" element={<ClaimManagement user={user} />} />
        <Route path="/claims/:claimId/edit" element={<EditClaimRequest />} />
        <Route path="/users/:userId" element={<UserProfile />} />
      </Routes>
    </Router>
  )
}

export default App
