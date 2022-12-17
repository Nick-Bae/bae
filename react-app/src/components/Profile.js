import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from "react-router-dom";
import './Profile.css'
import { userWishlist } from '../store/wishlist';
import LogoutButton from './auth/LogoutButton';
import CartDetail from './Cart/CartDetail';

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
        <div className='navLeft'>
            <div className='navInfo'>
                <div className='loginName'>
                    Hi!  {sessionUser.username}
                </div>
                <NavLink className="sellNewItem" to={`/new-item`}>Sell</NavLink>

                <NavLink className="myBae" to='/mymenu'>My Bae</NavLink>

                <div>
                {/* <NavLink to={`/users/${userId}/cart`}> */}
                    {/* <i class="fa fa-thin fa-cart-shopping"><CartDetail /></i> */}
                {/* </NavLink> */}
                </div>
                <LogoutButton />
                <CartDetail />
            </div>
        </div>
    );
}
export default Profile;
