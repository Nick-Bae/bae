import React from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import './LogoutButton.css'
const LogoutButton = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogout = async (e) => {
    await dispatch(logout());
    history.push('/')
  };

  return <button className="logoutBt" onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
