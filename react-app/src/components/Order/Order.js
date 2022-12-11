import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import { getUserCart, deleteOneCart } from '../../store/cart';
import { createOrder } from '../../store/order';

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

        console.log("orderInfo ???????????",orderInfo)
        dispatch(createOrder(orderInfo))

        history.push('/order-complete');
    }

  return (
    
    <div className="orderList">
            <div className='orderList-content'>
                {carts.map(cart => (
                    <div key={cart.id}>
                        <NavLink to={`/items/${cart.id}`}>
                            <div className='orderInside'>
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
                    <button onClick={order}>Place an Order</button>
                </div>
            </div>
        </div>
  );
};

export default Order;