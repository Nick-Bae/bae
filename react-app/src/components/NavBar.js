import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import LoginFormModal from './LoginFormModal';
import SignupModal from './SignupFormPage';
import './NavBar.css'
import Profile from './Profile';
import SearchBar from './SearchBar';

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
      <div>
        <ul className='navMenu_login'>
          <li className='nav_login'>
            {/* <NavLink to='/login' exact={true} activeClassName='active'>
              Login
            </NavLink> */}
            <LoginFormModal />
          </li>
          <li className='nav_singup'>
            {/* <NavLink to='/sign-up' exact={true} activeClassName='active'>
              Sign Up
            </NavLink> */}
            <SignupModal />
          </li>
          {/* <li>
            <NavLink to='/users' exact={true} activeClassName='active'>
              Users
            </NavLink>
          </li> */}
          
          <li>
            {sessionUser && <LogoutButton />}
          </li>
        </ul>
      </div>
    );
  }

  return (
    <div  className='navMenu'>
      <ul className='navMenu_home'>
          <li>
            <NavLink to='/' exact={true} activeClassName='active'>
              <img className="logoHome" src="https://nbae.s3.amazonaws.com/logo.png" alt="Home"/>
             
            </NavLink>
          </li>
      </ul>
      {/* <div className='searchBarInNav'> */}
      <div >
        {/* <SearchBar className="searchBarDisplay" placeholder="search for product" /> */}
        <SearchBar />
      </div>
      {sessionLinks}
    </div>
  );
}

export default NavBar;
