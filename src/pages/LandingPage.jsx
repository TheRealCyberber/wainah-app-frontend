import React from 'react'
import { Link } from 'react-router-dom'


const LandingPage = () => {
  return (
    <div className='landing-container'>
      <h1>Wainah?</h1>
      <h2>Where lost stuff gets reunited with their humans.</h2>
      <p>
        Post lost or found items, browse listings, and help your community get back what’s theirs.<br />
        Simple. Fast. Reliable.
        </p>
        <Link to="/home">
        See Lost & Found Items →
        </Link>
 
    </div>
  )
}

export default LandingPage