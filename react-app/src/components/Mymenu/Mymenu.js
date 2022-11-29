import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { userWishlist } from '../../store/wishlist';
import LogoutButton from '../auth/LogoutButton';
import MymenuDetail from './MymenuDetail';
import './Mymenu.css'

function Mymenu() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const wishlist = useSelector(state => state.wishlist);
    const [selectedMenu, setSelectedMenu] = useState("")
    console.log("wishlist ????????", wishlist)

    useEffect(() => {
        dispatch(userWishlist(sessionUser.id))
    }, [dispatch])

    if (!sessionUser) {
        return null;
    }
    const wishDetail ={

    }

    return (
        <>
            <div className='myMenuTop'>
                <h1>  My bae</h1>
            </div>
            <div className='myMenuBody'>
                <div className='myMenuBar'>
                    <ul>
                        <li onClick={()=>setSelectedMenu("wishlist")}>Wishlist</li>
                        <li onClick={()=>setSelectedMenu("selling")}>Selling</li>
                    </ul>
                </div>
                <MymenuDetail menu={selectedMenu} />
            </div>

        </>
    );
}
export default Mymenu;
