import React from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'

export const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='logo-container'>
        <img className='logo' src={assets.logo} alt="" />
        <p>Admin Panel...</p>
      </div>
      <img className='profile' src={assets.profile_image} alt="" />
    </div>
  )
}

