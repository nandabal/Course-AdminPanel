import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='nav'>
      <ul>
        <li><Link to='/'>Dashboard</Link></li>
        <li><Link to='/feedback'>Add feedback</Link></li>
      </ul>
    </div>
  )
}

export default Navbar
