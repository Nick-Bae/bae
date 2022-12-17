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
                {carts.length >= 1 && (
                    <p id="cartNum">{carts.length}</p>
                )}
            </div>

            {/* <button class="dropbtn"></button> */}
            <div className='cartList-content'>
                {carts.map(cart => (
                    <div className='cartDetailContainer' key={cart.id}>
                        <NavLink to={`/items/${cart.id}`}>
                            <div className='cartInside'>
                                <img className="cartImage" src={cart.image} />
                            </div>
                        </NavLink>
                        <div className='cartDetailInfoinCart'>
                            <NavLink to={`/items/${cart.id}`}>
                                <div>
                                 <p className='titleInCart'>{cart.name}</p>
                                </div>
                            </NavLink>
                            <p>${parseFloat(cart.price).toFixed(2)}</p>
                            <p>Qty:{cart.quantity}</p>
                            <button className="cartDeleteCartView" onClick={() => cartDelete(cart.cartId)}>
                                <i className="fa-solid fa-trash " ></i>
                            </button>
                        </div>
                        <div hidden={true}>{cartTotal += cart.price * cart.quantity}</div>
                    </div>
                ))}
                <div className='cartTotalInCart'>
                    <p>Total:</p>
                    <p style={{fontWeight:"bold"}}>${parseFloat(cartTotal).toFixed(2)} </p>
                </div>
                <div className='checkOutAndViewCart'>
                    {/* <p><Order carts={carts} /></p> */}
                    <div className="checkOutInCart">
                        <NavLink  to={{
                            pathname: `/order`,
                            state: { carts: carts }
                        }} >Check out
                        </NavLink>
                    </div>
                    <div className='viewCartInCart'>
                        <NavLink to={`/cart`}>View Cart</NavLink>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default CartDetail;