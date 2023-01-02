// import { useDispatch, useSelector } from 'react-redux';
// import { useState } from 'react';
// import { NavLink, useLocation, useHistory } from 'react-router-dom';
// import { deleteOneOrder } from '../../store/order';
// import { createOrder } from '../../store/order';
// import './Order.css'
// import OrderQuantity from './OrderQuantity';

// const BuyNow = ({ item }) => {
//     const dispatch = useDispatch();
//     const history = useHistory();
//     const user = useSelector(state => state.session.user)
//     const [quantity, setQuantity] = useState('1');
//     let cartTotal = 0

//     // useEffect(() => {
//     //     dispatch(getUserOrder(user?.id))
//     // }, [dispatch, user.id]);


    

//     const buyNow = () => {
//         if (item.quantity >= quantity) {
//             dispatch()
//         }
//         const orderInfo = {
//             "userId": user.id,
//             "status": "processing",
//             "items": item
//         }

//         dispatch(createOrder(orderInfo))
//         history.push('/order');
//     }

//     return (
//         <div className='Order'>

//             <button className="buyNowBt" onClick={buyNow}>Buy Now</button>

//             <form id="buyNowForm" onSubmit={buyNow}>
//                 <div id="quantityInput">
//                     <label id="quantityLabel" htmlFor='quantity'>Quantity</label>
//                     <input
//                         id='quantity'
//                         type='number'
//                         onChange={e => setQuantity(e.target.value)}
//                         value={quantity}
//                         required
//                         min="1"
//                         max="1000"
//                     />
//                     <div className='availableQty'>
//                         <div id="availableQty"> {item.quantity} </div> <div>available</div>
//                     </div>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default BuyNow;