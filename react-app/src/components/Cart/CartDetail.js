import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getUserCart } from '../../store/cart';
import { deleteOneCart } from '../../store/cart';
import CartPage from './CartPage';
import './CartDetail.css'
import Order from '../Order/Order';

const CartDetail = () => {
    const dispatch = useDispatch();
    const carts = Object.values(useSelector(state => state.cart));
    const user = useSelector(state => state.session.user)

    let cartTotal = 0
    console.log("carts ###########", carts)

    useEffect(() => {
        dispatch(getUserCart(user?.id))
    }, [dispatch, user.id]);


    const cartDelete = (cartId) => {
        console.log("cart delete is working??")
        dispatch(deleteOneCart(cartId))
    }

    return (

        <div className="cartList">
            <div className='cartNum'>
                <i className="fa fa-thin fa-cart-shopping dropbtn"></i>
                {carts.length>=1 && (
                    <p id="cartNum">{carts.length}</p>
                )}
            </div>

            {/* <button class="dropbtn"></button> */}
            <div className='cartList-content'>
                {carts.map(cart => (
                    <div key={cart.id}>
                        <NavLink to={`/items/${cart.id}`}>
                            <div className='cartInside'>
                                <img className="cartImage" src={cart.image} />
                                <div>
                                    <p>{cart.name}</p>
                                    <p>${parseFloat(cart.price).toFixed(2)}</p>
                                </div>
                            </div>
                        </NavLink>
                        <div className='qtyAndDelete'>
                            <p>Qty:{cart.quantity}</p>
                            <button onClick={() => cartDelete(cart.cartId)}>
                                <i className="fa-solid fa-trash" ></i>
                            </button>
                        </div>
                        <div hidden={true}>{cartTotal += cart.price * cart.quantity}</div>
                    </div>
                ))}
                <div className='cartTotal'>
                    <p>Total:</p>
                    <p>${parseFloat(cartTotal).toFixed(2)} </p>
                </div>
                <div>
                    {/* <p><Order carts={carts} /></p> */}
                    <NavLink to={{
                        pathname:`/order`,
                        state: {carts: carts}}} >Check out
                    </NavLink>
                    <NavLink to={`/cart`}>View Cart</NavLink>
                </div>
            </div>
        </div>

    );
};

export default CartDetail;