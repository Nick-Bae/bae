import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userWishlist } from '../../store/wishlist';
import MymenuDetail from './MymenuDetail';
import './Mymenu.css'

function Mymenu() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [selectedMenu, setSelectedMenu] = useState("")

    useEffect(() => {
        dispatch(userWishlist(sessionUser.id))
    }, [dispatch, sessionUser.id])

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
                    <div className='myMenubar'>
                        <div className="mymenuWishlist" 
                            onClick={()=>setSelectedMenu("wishlist")}>Wishlist
                        </div>
                        <div className="mymenu_sellinglist" 
                            onClick={()=>setSelectedMenu("selling")}>Selling
                        </div>
                        <div className="mymenu_orderlist" 
                            onClick={()=>setSelectedMenu("order")}>Orders
                        </div>
                    </div>
                </div>
                <MymenuDetail menu={selectedMenu} />
            </div>

        </div>
    );
}
export default Mymenu;
