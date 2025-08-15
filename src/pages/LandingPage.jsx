import React from 'react'
import { Link } from 'react-router-dom'


const LandingPage = () => {
  return (
    <div className='landing-container'>
         <img
            className="logo"
            src="https://i.imgur.com/2Z9ismj.png"
            alt="logo"
          />
      <h1>Welcome to Wainah lost & found platform</h1>
      <h2>Where lost stuff gets reunited with their humans.</h2>
      <p>
        Post lost or found items, browse listings, and help your community get back what’s theirs.<br />
        </p>
        <Link to="/home">
        See Lost & Found Items →
        </Link>
 
    </div>
  )
}

export default LandingPage