import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import './NavBar.css'
import Profile from './Profile';

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user);
  let sessionLinks;

  if (sessionUser) {
    sessionLinks = (
      <div className="nav_profile">
        <Profile user={sessionUser} />
      </div>
    );
  } else {
    sessionLinks = (
      <div className='navMenu'>
        <ul className='navMenu_home'>
          <li>
            <NavLink to='/' exact={true} activeClassName='active'>
              Home
            </NavLink>
          </li>
        </ul>
        <ul className='navMenu_login'>

          <li className='nav_login'>
            <NavLink to='/login' exact={true} activeClassName='active'>
              Login
            </NavLink>
          </li>
          <li className='nav_singup'>
            <NavLink to='/sign-up' exact={true} activeClassName='active'>
              Sign Up
            </NavLink>
          </li>
          <li>
            <NavLink to='/users' exact={true} activeClassName='active'>
              Users
            </NavLink>
          </li>
          <li>
            {sessionUser && <LogoutButton />}
          </li>
        </ul>
      </div>
    );
  }




  return (
    <div>
      {sessionLinks}
    </div>
  );
}

export default NavBar;
