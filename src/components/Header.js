import React from 'react'
import NavLink from './NavLink';

import Logo from '../assets/planet.png';

const Header = () => {
  return (
    <div id='header-container'>
      <div className='header-col'>
        <img src={Logo} alt='logo' />
        <h1>Space Travelers' Hub</h1>
      </div>
      <NavLink />
    </div>
  )
}

export default Header