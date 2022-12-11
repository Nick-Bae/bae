import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getUserCart, updateCart } from '../../store/cart';
import './CartPage.css'
import CartQuantity from './CartQuantity';

const CartPage = () => {
    const dispatch = useDispatch();
    const carts = Object.values(useSelector(state => state.cart));
    const user = useSelector(state => state.session.user)

    const [quantity, setQuantity] = useState('1');

    useEffect(() => {
        dispatch(getUserCart(user?.id))
    }, [dispatch, user.id, carts.length]);
    // const isItemInCart = cart.find(item=> parseInt(item.id) === parseInt(itemId))

    
    return (

        <>
            {carts.map(item => (
                <div className='cartView'>
                    <NavLink key={item?.id} to={`/items/${item?.id}`}>

                        <div key={item?.id} className='imageContainer'>
                            <img key={item?.id} className="itemImage" src={item?.image} alt="" />
                        </div>
                    </NavLink>
                    <div>
                        {item?.name}
                    </div>
                    <div>
                        Qty
                        {/* <form id="cartForm" onSubmit={cartUpdate}>
                            <div id="quantityInput">
                                <label id="quantityLabel" htmlFor='quantity'>Quantity</label>
                                <input
                                    id='quantity'
                                    type='number'
                                    onChange={e => setQuantity(e.target.value)}
                                    value={quantity}
                                    required
                                    min="1"
                                    max="1000"
                                />
                                <div className='availableQty'>
                                    <div style={{color:"red"}} id="availableQty"> 
                                    {itemQ.quantity < quantity ? <p>only available {item.quantity}</p> : ""} 
                                    
                                    </div> 
                                </div>
                            </div>
                        </form> */}
                        <CartQuantity item={item} />
                        {/* <button type="submit" className="cartUpdate" onClick={()=>cartUpdate(item.cartId)} >update</button> */}
                    </div>
                    <div>total: $</div> <div>{item.quantity*item.price}</div>
                </div>
            ))}
        </>

    );
};

export default CartPage;