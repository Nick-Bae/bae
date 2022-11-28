import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './Profile.css'
import { userWishlist } from '../store/wishlist';
import LogoutButton from './auth/LogoutButton';
function Profile() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const wishlist = useSelector(state => state.wishlist);

    console.log("wishlist ????????",wishlist)

    useEffect(()=>{
        dispatch(userWishlist(sessionUser.id))
    },[dispatch])

    if (!sessionUser) {
        return null;
    }

    return (
        <div className='loginName'>
         Hi!{sessionUser.username}
        <LogoutButton />    
        </div>
    );
}
export default Profile;
