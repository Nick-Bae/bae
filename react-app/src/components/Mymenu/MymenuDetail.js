import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getAllImages } from '../../store/image';
import { getUserItem } from '../../store/items';
import { getUserOrder } from '../../store/order';
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
    const orderHistory = (useSelector(state => state.orders))
    const orders = orderHistory?.order
    console.log(orders)
    const item = orders?.map(order=> {
        return order?.items
    })
    console.log("items",item)
    useEffect(() => {
        dispatch(userWishlist(sessionUser.id))
        dispatch(getAllImages())
        dispatch(getUserItem(sessionUser.id))
        dispatch(getUserOrder(sessionUser.id))
    }, [dispatch,sessionUser.id])

    const wishImages = wishlists.map(list => (
        images.find(image => image?.product_id === list?.id)
    ))
    const sellingImages = items.map(item => (
        images.find(image => image?.product_id === item?.id)
    ))

    if (!sessionUser) {
        return null;
    }
    let eachTotal=0
    let totalPrice=0
    return (
        <>
            <div className='meMenuDetail'>
                {!menu && (
                    <div className="menu-details">
                        <p className="menu-info">My Bae</p>
                        <p className="menu-info">Welcome to personal profile page</p>
                        <p className="menu-info">Please select a menu to view its details.</p>
                    </div>
                )}

                {selectedMenu === 'wishlist' && (
                    <div className='wishlistDetail_container'> 
                    <p id="myBaeMenu">Wishlist</p>
                        {wishlists.map(item => (
                            <div key={item?.id} className='wishlistDetail'>
                                <NavLink key={item?.id} to={{ pathname: `/items/${item?.id}`, state: { item: item } }}>
                                    <div className='wishdetailContainer'>
                                        <img className="wishImage" src={item?.image[0]} alt="" />
                                        <div className='wishTitle'>
                                            {item?.name}
                                        </div>
                                    </div>
                                </NavLink>
                            </div>
                        ))}
                    </div>
                )}

                {selectedMenu === 'selling' && (
                    <div className='wishlistDetail_container'>
                        <p id="myBaeMenu">Selling</p>
                        {sellingImages.map(item => (
                            <div key={item?.id} className='sellinglistDetail'>
                                <NavLink key={item?.id} to={{ pathname: `/items/${item?.product_id}`, state: { item: item } }}>
                                    <div className='wishdetailContainer'>
                                        <img className="wishImage" src={item?.url} alt=""/>
                                        <div className='wishTitle'>
                                            {item?.Product.name}
                                        </div>
                                    </div>
                                </NavLink>
                            </div>
                        ))}
                    </div>
                )}

                {selectedMenu === 'order' && (
                    <div className='wishlistDetail_container'>
                        <p id="myBaeMenu">Order History</p>
                        {orderHistory?.order?.map(orders => (
                            // <div className='sellinglistDetail'>
                            //     {console.log("orders", orders)}
                            //     <div>
                            //         {orders.items.map(singleItem=>(
                            //             <div>
                            //            {console.log("items",singleItem.item.name)}

                                            
                            //             </div>
                            //         ))}
                            //     </div>
                            <>
                            <div className='orderDate'>
                            Order Date: &nbsp;
                            {
                                <>
                                {(()=> {
                                    let data = orders.date.split(' ')
                                    let date = (data.splice(1,3).join(' '))
                                    return date
                                })()}
                                </>
                            }
                            </div>
                                 <div>
                                    {orders?.items.map(singleItem=>(
                                       
                                            <>
                                           
                                    <NavLink key={singleItem?.id} 
                                        to={{ pathname: `/items/${singleItem?.item?.id}`, state: { item: singleItem?.item } }}>
                                        <div className='wishdetailContainer'>
                                            <img className="wishImage" src={singleItem.item?.image[0]} alt=""/>
                                            
                                            <div className='wishTitle'>
                                                {singleItem.item?.name}
                                            </div>
                                        </div>
                                        <div className='totalOrderPrice'>
                                                $ {eachTotal = singleItem.item?.price*singleItem.item.quantity}
                                        </div>
                                    </NavLink>
                                            <div hidden={true} className='totalOrderPrice'>
                                                $ {totalPrice += eachTotal}
                                            </div>
                                            </>
                                    ))}
                                    ${totalPrice}
                            </div>
                            </>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
export default MymenuDetail;


