import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userWishlist } from '../../store/wishlist';
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
   
    return (
        <div className='myMenudetail_Container'>
            <div className='myMenuTop'>
                <h1 id="myBae_title">  My bae</h1>
            </div>
            <div className='myMenuBody'>
                <div className='myMenuBars'>
                    <ul className='myMenubar'>
                        <li className="mymenu_wishlist" onClick={()=>setSelectedMenu("wishlist")}>Wishlist</li>
                        <li onClick={()=>setSelectedMenu("selling")}>Selling</li>
                    </ul>
                </div>
                <MymenuDetail menu={selectedMenu} />
            </div>

        </div>
    );
}
export default Mymenu;
