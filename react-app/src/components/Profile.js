import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from "react-router-dom";
import './Profile.css'
import { userWishlist } from '../store/wishlist';
import LogoutButton from './auth/LogoutButton';
function Profile() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(userWishlist(sessionUser.id))
    }, [dispatch, sessionUser.id])

    if (!sessionUser) {
        return null;
    }

    return (
        <>
            <div className='loginName'>
                Hi!{sessionUser.username}
            </div>
            <div>
                <NavLink className="sellNewItem" to={`/new-item`}>Sell</NavLink>

                <NavLink className="myBae" to='/mymenu'>My Bae</NavLink>

                <LogoutButton />
            </div>
        </>
    );
}
export default Profile;
