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
    const items = Object.values(useSelector(state => state.item));
    const orderHistory = (useSelector(state => state.orders))
    const orders = orderHistory?.order

    console.log("orders",orders)
    const item = orders?.map(order=> {
        return order?.items
    })
    useEffect(() => {
        dispatch(userWishlist(sessionUser.id))
        dispatch(getAllImages())
        dispatch(getUserItem(sessionUser.id))
        dispatch(getUserOrder(sessionUser.id))
    }, [dispatch,sessionUser.id])

    // const wishImages = wishlists.map(list => (
    //     images.find(image => image?.product_id === list?.id)
    // ))
    // const sellingImages = items.map(item => (
    //     images.find(image => image?.product_id === item?.id)
    // ))
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
                            <div key={item} className='wishlistDetail'>
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
                        {items.map(item => (
                            <div key={item} className='sellinglistDetail'>
                                <NavLink key={item?.id} to={{ pathname: `/items/${item?.id}`, state: { item: item } }}>
                                    <div className='wishdetailContainer'>
                                        <img className="wishImage" src={item?.image[0]} alt=""/>
                                        <div className='wishTitle'>
                                            {item?.name}
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
                            
                            <>
                            <div key={orders} className='orderHtableHead'>
                                <div className='orderDate'>
                                    <p className='orderDateLabel'>
                                        Order Date: &nbsp;
                                    </p>
                                    {
                                    <p className='orderDateData'>
                                        {(()=> {
                                            let data = orders.date.split(' ')
                                            let date = (data.splice(1,3).join(' '))
                                            return date
                                        })()}
                                    </p>
                                    }
                                </div>
                                
                                <div className='orderTotalLabel'>
                                    <p>Item Price</p>
                                </div>
                            </div>
                                 <div>
                                    {orders?.items.map(singleItem=>(
                                       
                                            <div key={singleItem}>
                                           
                                    <NavLink key={singleItem} 
                                        to={{ pathname: `/items/${singleItem?.item?.id}`, state: { item: singleItem?.item } }}>
                                        <div className='orderHistoryContainer'>
                                            <div className='orderHImgName'>
                                                <div className='orderHimg'>
                                                  <img className="ordherHImage" src={singleItem.item?.image[0]} alt=""/>
                                                </div>
                                                
                                                <div className='wishTitle'>
                                                    {singleItem.item?.name}
                                                </div>
                                            </div>
                                            <div className='totalOrderHistoryPrice'>
                                                <p className='orderHistoryTotalLabel'>
                                                    {/* Order Total */}
                                                </p>
                                                <p className='orderHtotal'>
                                                    $ {eachTotal = (singleItem.item?.price*singleItem.quantity).toFixed(2)}
                                                </p>
                                            </div>
                                        </div>
                                    </NavLink>
                                            <div hidden={true} className='totalOrderPrice'>
                                                $ {(totalPrice += parseFloat(eachTotal))}
                                            </div>
                                            </div>
                                    ))}
                                    <p className='orderHTotal'>
                                    Order Total: ${totalPrice.toFixed(2)}
                                    </p>
                                    <p hidden={true}>{totalPrice=0}</p>
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


