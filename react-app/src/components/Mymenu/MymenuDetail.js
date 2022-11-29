import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getAllImages } from '../../store/image';
import { getUserItem } from '../../store/items';
import { userWishlist } from '../../store/wishlist';
import './MymenuDetail.css'

function MymenuDetail({ menu }) {
    const dispatch = useDispatch();
    // const {menu}=menu
    const selectedMenu = menu
    const sessionUser = useSelector(state => state.session.user);
    const images = Object.values(useSelector(state => state.images));
    const wishlists = Object.values(useSelector(state => state.wishlist));
    const items = Object.values(useSelector(state => state.items));

    console.log("items  ??????", items)
    useEffect(() => {
        dispatch(userWishlist(sessionUser.id))
        dispatch(getAllImages())
        dispatch(getUserItem(sessionUser.id))
    }, [dispatch])

    const wishImages = wishlists.map(list => (
        images.find(image => image?.product_id === list?.id)
    ))
    const sellingImages = items.map(item => (
        images.find(image => image?.product_id === item?.id)
    ))

    if (!sessionUser) {
        return null;
    }

    return (
        <>
            <div className='meMenuDetail'>
                {!menu && (
                    <div className="menu-details">
                        <p className="menu-info">My bAe</p>
                        <p>Welcome to personal profile page</p>
                        <p>Please select a menu to view its details.</p>
                    </div>
                )}

                {selectedMenu === 'wishlist' && (
                    <div>
                        {wishImages.map(item => (
                            <div className='wishlistDetail'>
                                <NavLink key={item?.id} to={{ pathname: `/items/${item?.product_id}`, state: { item: item } }}>
                                    <div className='wishdetailContainer'>
                                        <img className="wishImage" src={item?.url} />
                                        <div className='wishTitle'>
                                            {item?.Product.name}
                                        </div>
                                    </div>
                                </NavLink>
                            </div>
                        ))}
                    </div>
                )}

                {selectedMenu === 'selling' && (
                    <div>
                        {sellingImages.map(item => (
                            <div className='sellinglistDetail'>
                                <NavLink key={item?.id} to={{ pathname: `/items/${item?.product_id}`, state: { item: item } }}>
                                    <div className='wishdetailContainer'>
                                        <img className="wishImage" src={item?.url} />
                                        <div className='wishTitle'>
                                            {item?.Product.name}
                                        </div>
                                    </div>
                                </NavLink>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
export default MymenuDetail;


