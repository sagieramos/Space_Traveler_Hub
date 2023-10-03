import React from 'react'
import { NavLink } from 'react-router-dom';

import Logo from '../assets/planet.png';

const Header = () => {
  return (
    <div>
      <div>
        <img src={Logo} alt='logo' />
        <h1>Space Travelers' Hub</h1>
      </div>
      <ul>
        <li>
          <NavLink to=''>Rockets</NavLink>
          <NavLink to=''>Missions</NavLink>
        </li>
        <li>
          <NavLink to=''>My Profile</NavLink>
        </li>
      </ul>
    </div>
  )
}

export default Header