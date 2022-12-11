import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { getUserCart, deleteOneCart } from '../../store/cart';
import { createOrder } from '../../store/order';

const OrderComplete = () => {
  const dispatch = useDispatch();
//   const location = useLocation();
//   const { carts } = location.state;
  const user = useSelector(state => state.session.user)
  // const items = Object.values(useSelector(state => state.items));
//   let cartTotal = 0
//     useEffect(() => {
//         dispatch(getUserCart(user?.id))
//     }, [dispatch, user.id]);


//     const cartDelete = (cartId) => {
//     dispatch(deleteOneCart(cartId))
//     }

//     const order =()=>{
//         const orderInfo ={
//             "userId": user.id,
//             "status": "processing",
//             "items": carts
//         }

//         console.log("orderInfo ???????????",orderInfo)
//         dispatch(createOrder(orderInfo))
//     }

  return (
    
    <div className="orderComplte">
           <p>Thank you for your order!</p>
           <p>The order will be shipped as soon!</p>
    </div>
  );
};

export default OrderComplete;