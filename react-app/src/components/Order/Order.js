import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import { getUserCart, deleteOneCart } from '../../store/cart';
import { createOrder } from '../../store/order';
import './Order.css'

const Order = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { carts } = location.state;
  const history = useHistory();
  const user = useSelector(state => state.session.user)
  // const items = Object.values(useSelector(state => state.items));
  let cartTotal = 0

    useEffect(() => {
        dispatch(getUserCart(user?.id))
    }, [dispatch, user.id]);


    const cartDelete = (cartId) => {
    dispatch(deleteOneCart(cartId))
    }

    const order =()=>{
        const orderInfo ={
            "userId": user.id,
            "status": "processing",
            "items": carts
        }

        dispatch(createOrder(orderInfo))

        history.push('/order-complete');
    }

  return (
    
    <div className="orderList">
            <div className='orderList-content'>
                {carts.map(cart => (
                    <div className="orderIndividual" key={cart.id}>
                        <NavLink to={`/items/${cart.id}`}>
                            <div className='cartviewImage'>
                                <img className="cartImage" src={cart.image} />
                            </div>
                        </NavLink>
                        <NavLink to={`/items/${cart.id}`}>
                            <div className='cartviewTitle'>
                                <p>{cart.name}</p>
                            </div>
                        </NavLink>

                        <p>${parseFloat(cart.price).toFixed(2)}</p>
                        <div className='cartViewQty'>
                            <p>Qty:{cart.quantity}</p>
                        </div>
                        <div hidden={true}>{cartTotal += cart.price * cart.quantity}</div>
                        <div className='cartDeleteBt'>
                            <button className="orderDeleteBt" onClick={() => cartDelete(cart.cartId)}>
                                <i className="fa-solid fa-trash" ></i>
                            </button>
                        </div>
                    </div>
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
  );
};

export default Order;