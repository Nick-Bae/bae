import React,  { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import LoginFormModal from './LoginFormModal';
import SignupModal from './SignupFormPage';
import './NavBar.css'
import Profile from './Profile';
import AutoComplete from './AutoComplete';
import { getItems } from '../store/items';

const NavBar = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  let sessionLinks;
  const autoCompleteData = Object.values(useSelector(state => state.items));
  console.log("all items is",autoCompleteData)

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

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
      <AutoComplete data={autoCompleteData} />
      {sessionLinks}
    </div>
  );
}

export default NavBar;
