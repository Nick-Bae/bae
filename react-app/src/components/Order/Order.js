import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import { deleteOneCart } from '../../store/cart';
import { deleteOneOrder } from '../../store/order';
import { createOrder } from '../../store/order';
import './Order.css'
import OrderQuantity from './OrderQuantity';

const Order = () => {
  const dispatch = useDispatch();
  const carts = Object.values(useSelector(state => state.cart));
  const location = useLocation();
  const orders= location.state?.item;
  const history = useHistory();
  const user = useSelector(state => state.session.user)
  let cartTotal = 0
console.log(carts)
    // useEffect(() => {
    //     dispatch(getUserOrder(user?.id))
    // }, [dispatch, quantity]);


    const orderDelete = (cartId) => {
    dispatch(deleteOneCart(cartId))
    }

    const order =()=>{
        const orderInfo ={
            "userId": user.id,
            "status": "processing",
            "items": carts
        }

        dispatch(createOrder(orderInfo))
        for (let i=0; i < carts.length; i++){
            dispatch(deleteOneCart(carts[i].cartId))
        }
        history.push('/order-complete');
    }

  return (
    <div className='Order'>
         <h2 className='shoppingCartLabel'>Checkout</h2>
        <div className="orderList">
            <div className='orderList-content'>
                {carts?.map(cart => (
                <>
                    <div className="orderIndividual" key={cart.id}>
                        <NavLink to={`/items/${cart.id}`}>
                            <div className='cartviewImage'>
                                <img className="cartImage" src={cart.image} alt=""/>
                            </div>
                        </NavLink>
                        <NavLink to={`/items/${cart.id}`}>
                            <div className='cartviewTitle'>
                                <p>{cart.name}</p>
                            </div>
                        </NavLink>

                        <p className='cartviewPrice'>${parseFloat(cart.price).toFixed(2)}</p>
                        <div className='cartViewQty'>
                            {/* <p>Qty:{cart.quantity}</p> */}
                            <OrderQuantity item={cart} />
                        </div>
                        <div hidden={true}>{cartTotal += cart.price * cart.quantity}</div>
                        <div className='cartDeleteBt'>
                            <button className="orderDeleteBt" onClick={() => orderDelete(cart.cartId)}>
                                <i className="fa-solid fa-trash" ></i>
                            </button>
                        </div>
                    </div>
                </>
                ))}
                <div className='cartTotal'>
                    <p>Total: &nbsp;</p>
                    <p>${parseFloat(cartTotal).toFixed(2)} </p>
                </div>
                <div className='placeAnOrder'>
                    <button className="placeOrderBt" onClick={order}>Place an Order</button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Order;